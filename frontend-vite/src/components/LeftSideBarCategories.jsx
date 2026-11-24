import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  ListItemIcon,
  Button,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const LeftSideBarCategories = ({ categories }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we have categories to display
  const hasCategories = categories && categories.length > 0;

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
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "5px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#e0e0e0",
            borderRadius: "10px",
          },
        }}
      >
        <List sx={{ p: 1 }}>
          {/* RENDER CATEGORIES IF THEY EXIST */}
          {hasCategories ? (
            categories.map((item) => (
              <ListItemButton
                key={item.id}
                onClick={() => navigate(`/category/${item.slug}`)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  "&:hover": {
                    "& .chevron": { transform: "translateX(3px)" },
                  },
                }}
              >
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: "0.9rem",
                    color: "text.secondary",
                  }}
                />
                <ChevronRightIcon
                  className="chevron"
                  sx={{
                    fontSize: "1rem",
                    color: "text.disabled",
                    transition: "0.2s",
                  }}
                />
              </ListItemButton>
            ))
          ) : (
            /* EMPTY STATE / BACK FUNCTIONALITY */
            <Box sx={{ p: 2, textAlign: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Няма намерени категории
              </Typography>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)} // Standard "Back" functionality
                fullWidth
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  color: "black",
                  borderColor: "#ddd",
                  "&:hover": { borderColor: "black", bgcolor: "transparent" },
                }}
              >
                Назад
              </Button>
            </Box>
          )}
        </List>
      </Paper>
    </Box>
  );
};
