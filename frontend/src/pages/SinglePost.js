import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  CircularProgress,
  Divider,
  Stack,
} from "@mui/material";
import { BASE_URL } from "../constant-data/env";

export function SinglePost() {
  const [attributes, setAttributes] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const navigation = JSON.parse(localStorage.getItem("navigation") || "[]");
    const category = navigation.find((item) => item.slug === params.slug);

    axios
      .get(`${BASE_URL}/posts/${category?.id}/${params.id}`)
      .then((res) => {
        setAttributes(res.data.attributes || []);
        setPost(res.data.post);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [params.id, params.slug]);

  const renderAttribute = (attr) => {
    const fieldType = attr?.Type?.field;

    if (fieldType === "checkbox") {
      return (
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {(attr.values || []).length ? (
            attr.values.map((v, i) => (
              <Chip
                key={i}
                label={v}
                size="small"
                variant="filled"
                sx={{ bgcolor: "#eee" }}
              />
            ))
          ) : (
            <Typography variant="body2" color="text.disabled">
              -
            </Typography>
          )}
        </Stack>
      );
    }

    return (
      <Typography variant="body2" color="text.primary" fontWeight="500">
        {attr.value || "Не е посочено"}
      </Typography>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  if (!post) {
    return (
      <Typography align="center" sx={{ mt: 10 }}>
        Няма данни
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* HEADER */}
      <Paper
        elevation={0}
        sx={{ p: 4, mb: 3, borderRadius: 4, border: "1px solid #f0f0f0" }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          {post.title}
        </Typography>
        <Stack
          direction="row"
          spacing={3}
          flexWrap="wrap"
          useFlexGap
          color="text.secondary"
        >
          <Typography variant="body2">📍 {post.location}</Typography>
          <Typography variant="body2">👁 {post.views} гледания</Typography>
          <Typography
            variant="body2"
            sx={{ color: "black", fontWeight: "bold" }}
          >
            💰 {post.price} лв.
          </Typography>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        {/* LEFT COLUMN */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={3}>
            {/* DESCRIPTION */}
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 4, border: "1px solid #f0f0f0" }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Описание
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", lineHeight: 1.7 }}
              >
                {post.description}
              </Typography>
            </Paper>

            {/* ATTRIBUTES */}
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 4, border: "1px solid #f0f0f0" }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Детайли
              </Typography>
              <Grid container spacing={2}>
                {attributes.map((attr) => (
                  <Grid item xs={12} sm={6} key={attr.id}>
                    <Box
                      sx={{
                        p: 2,
                        border: "1px solid #eee",
                        borderRadius: 3,
                        "&:hover": { boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
                        transition: "0.2s",
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        {attr.name}
                      </Typography>
                      {renderAttribute(attr)}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Stack>
        </Grid>

        {/* RIGHT SIDEBAR */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* PRICE CARD */}
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 4, border: "1px solid #f0f0f0" }}
            >
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                {post.price} лв.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#333" },
                }}
              >
                Свържи се
              </Button>
            </Paper>

            {/* INFO CARD */}
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 4, border: "1px solid #f0f0f0" }}
            >
              <Stack spacing={1.5} color="text.secondary">
                <Typography variant="body2">📍 {post.location}</Typography>
                <Typography variant="body2">
                  👁 {post.views} гледания
                </Typography>
                <Typography variant="body2">
                  📅 {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
