import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { LeftSideBarCategories } from "../components/LeftSideBarCategories";
import { LeftSideBarFilters } from "../components/LeftSideBarFilters";
import { Minipostermain } from "../components/miniPosterMain";
import { BASE_URL } from "../constant-data/env";

export const CategoryPage = ({ categories }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Текуща категория по slug от URL-а
  const currentCategory = categories.find((c) => c.slug === slug);

  // Деца (подкатегории)
  const children = categories.filter(
    (c) => c.parentId === currentCategory?.id
  );

  // Лист-категория = без деца → показваме филтри
  const isLeafCategory = currentCategory && children.length === 0;

  // Зареждаме обявите при смяна на категория
  useEffect(() => {
    if (!currentCategory?.id) return;

    setLoading(true);
    axios
      .get(`${BASE_URL}/posts/${currentCategory.id}`)
      .then((response) => {
        setPosts(response.data);
        setFilteredPosts(response.data);
      })
      .catch((err) => console.error("Error fetching posts:", err))
      .finally(() => setLoading(false));
  }, [currentCategory?.id]);

  // Клиентско филтриране по избраните атрибути
  const handleApplyFilters = (filters) => {
    // Изчистваме празните стойности
    const activeFilters = Object.entries(filters).filter(([, val]) =>
      Array.isArray(val)
        ? val.length > 0
        : val !== "" && val !== undefined && val !== null
    );

    if (activeFilters.length === 0) {
      setFilteredPosts(posts);
      return;
    }

    const result = posts.filter((post) => {
      const attrValues = post.PostAttributes || [];

      return activeFilters.every(([attrId, filterVal]) => {
        const attrIdNum = Number(attrId);

        // checkbox (масив) – трябва да съдържа всички избрани
        if (Array.isArray(filterVal)) {
          return filterVal.every((slugVal) =>
            attrValues.some(
              (v) =>
                v.attributeId === attrIdNum &&
                v.value?.split(",").includes(slugVal)
            )
          );
        }

        // select / text / number – точно съвпадение
        return attrValues.some(
          (v) => v.attributeId === attrIdNum && v.value === filterVal
        );
      });
    });

    setFilteredPosts(result);
  };

  // Навигация към конкретна обява
  const goToPost = (post) => {
    const cat = categories.find((c) => c.id === post.categoryId);
    navigate(`/category/${cat?.slug || post.categoryId}/${post.id}`);
  };

  // Ако категорията не съществува
  if (!currentCategory) {
    return (
      <Box sx={{ pt: 10, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Категорията не е намерена
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fbfbfb" }}>
      {/* Лява странична лента:
          - ако е лист-категория → филтри
          - иначе → подкатегории */}
      {isLeafCategory ? (
        <LeftSideBarFilters
          categoryId={currentCategory.id}
          onApply={handleApplyFilters}
        />
      ) : (
        <LeftSideBarCategories categories={children} />
      )}

      {/* Основно съдържание – отместваме заради fixed sidebar */}
      <Container
        maxWidth="lg"
        sx={{
          mt: 2,
          ml: { xs: 0, md: "276px" },
          flexGrow: 1,
          pb: 4,
        }}
      >
        {/* Заглавие на категорията */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          {currentCategory.name}
        </Typography>

        {/* Състояния: зареждане / празно / обяви */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : filteredPosts.length === 0 ? (
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Няма намерени обяви.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Box
                  onClick={() => goToPost(post)}
                  sx={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-4px)" },
                  }}
                >
                  <Minipostermain
                    info1={post.title}
                    info2={post.description}
                    image={post.image}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};