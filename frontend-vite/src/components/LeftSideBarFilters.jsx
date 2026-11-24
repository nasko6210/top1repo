import { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Paper,
    Typography,
    Chip,
    TextField,
    Button,
    Stack,
    CircularProgress,
} from "@mui/material";
import { BASE_URL } from "../constant-data/env";

export function LeftSideBarFilters({ categoryId, onApply }) {
    const [attributes, setAttributes] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);

    // Зареждаме атрибутите при смяна на категорията
    useEffect(() => {
        if (!categoryId) return;
        setLoading(true);
        axios
            .get(`${BASE_URL}/attributes/${categoryId}`)
            .then((res) => {
                setAttributes(res.data);
                setFilters({});
            })
            .catch((err) => console.error("Error loading attributes:", err))
            .finally(() => setLoading(false));
    }, [categoryId]);

    // За text/number/textarea/select – единична стойност
    const setValue = (attrId, value) => {
        setFilters((prev) => ({ ...prev, [attrId]: value }));
    };

    // За checkbox – масив от slug-ове, toggle
    const toggleCheckbox = (attrId, slug) => {
        setFilters((prev) => {
            const current = prev[attrId] || [];
            const next = current.includes(slug)
                ? current.filter((s) => s !== slug)
                : [...current, slug];
            return { ...prev, [attrId]: next };
        });
    };

    const handleClear = () => {
        setFilters({});
        onApply({});
    };

    // Рендира поле според типа
    const renderField = (attr) => {
        const fieldType = attr.Type?.field;

        // === ТЕКСТОВИ/ЧИСЛОВИ ПОЛЕТА ===
        if (["text", "number", "textarea"].includes(fieldType)) {
            return (
                <TextField
                    fullWidth
                    size="small"
                    type={fieldType === "number" ? "number" : "text"}
                    multiline={fieldType === "textarea"}
                    minRows={fieldType === "textarea" ? 2 : 1}
                    label={attr.name}
                    value={filters[attr.id] || ""}
                    onChange={(e) => setValue(attr.id, e.target.value)}
                />
            );
        }

        // === SELECT / CHECKBOX – БАЛОНЧЕТА ===
        if (fieldType === "select" || fieldType === "checkbox") {
            const isMulti = fieldType === "checkbox";
            const selected = isMulti
                ? filters[attr.id] || []
                : filters[attr.id]
                    ? [filters[attr.id]]
                    : [];

            return (
                <Box>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontWeight: 600, mb: 0.5, display: "block" }}
                    >
                        {attr.name}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {attr.AttributeOptions?.map((opt) => {
                            const isSelected = selected.includes(opt.slug);
                            return (
                                <Chip
                                    key={opt.id}
                                    label={opt.value}
                                    size="small"
                                    clickable
                                    onClick={() => {
                                        if (isMulti) {
                                            toggleCheckbox(attr.id, opt.slug);
                                        } else {
                                            // при select – повторно кликване изчиства
                                            setValue(
                                                attr.id,
                                                filters[attr.id] === opt.slug ? "" : opt.slug
                                            );
                                        }
                                    }}
                                    sx={{
                                        cursor: "pointer",
                                        bgcolor: isSelected ? "black" : "transparent",
                                        color: isSelected ? "white" : "text.primary",
                                        border: "1px solid",
                                        borderColor: isSelected ? "black" : "#ddd",
                                        borderRadius: "16px",
                                        fontSize: "0.75rem",
                                        height: "24px",
                                        "&:hover": {
                                            bgcolor: isSelected ? "#333" : "#f5f5f5",
                                        },
                                    }}
                                />
                            );
                        })}
                    </Box>
                </Box>
            );
        }

        return null;
    };

    return (
        <Box
            sx={{
                width: 260,
                position: "fixed",
                top: 85,
                left: 16,
                bottom: 16,
                display: { xs: "none", md: "block" },
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    overflow: "hidden",
                }}
            >
                {/* Заглавие */}
                <Box
                    sx={{
                        p: 2,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        flexShrink: 0,
                    }}
                >
                    <Typography variant="subtitle1" fontWeight="bold">
                        Филтри
                    </Typography>
                </Box>

                {/* Скролируема част с полетата */}
                <Box
                    sx={{
                        p: 2,
                        flex: 1,
                        overflowY: "auto",
                        "&::-webkit-scrollbar": { width: "5px" },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#e0e0e0",
                            borderRadius: "10px",
                        },
                    }}
                >
                    {loading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                            <CircularProgress size={24} color="inherit" />
                        </Box>
                    ) : attributes.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                            Няма филтри за тази категория.
                        </Typography>
                    ) : (
                        <Stack spacing={2.5}>
                            {attributes.map((attr) => (
                                <Box key={attr.id}>{renderField(attr)}</Box>
                            ))}
                        </Stack>
                    )}
                </Box>

                {/* Бутони – фиксирани в долната част */}
                <Box
                    sx={{
                        p: 2,
                        borderTop: "1px solid",
                        borderColor: "divider",
                        display: "flex",
                        gap: 1,
                        flexShrink: 0,
                    }}
                >
                    <Button
                        variant="contained"
                        fullWidth
                        size="small"
                        onClick={() => onApply(filters)}
                        sx={{
                            bgcolor: "black",
                            "&:hover": { bgcolor: "#333" },
                            textTransform: "none",
                            borderRadius: 2,
                            fontWeight: 600,
                        }}
                    >
                        Приложи
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleClear}
                        sx={{
                            textTransform: "none",
                            color: "black",
                            borderColor: "#ddd",
                            borderRadius: 2,
                            "&:hover": { borderColor: "black", bgcolor: "transparent" },
                        }}
                    >
                        Изчисти
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}