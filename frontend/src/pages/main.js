import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Box, Grid, Container, Typography } from "@mui/material";
import { BASE_URL } from "../constant-data/env";
import { LeftSideBarCategories } from "../components/LeftSideBarCategories";
import { Minipostermain } from "../components/miniPosterMain";

export function Main() {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [mainRoutes, setMainRoutes] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const navAlready = localStorage.getItem("navigation");

    const processNavigation = (data) => {
      setRoutes(data);
      const filtered = data.filter((item) => item.parentId === null);
      setMainRoutes(filtered);
    };

    if (!navAlready) {
      axios.get(`${BASE_URL}/navigation`).then((response) => {
        processNavigation(response.data);
        localStorage.setItem("navigation", JSON.stringify(response.data));
      });
    } else {
      processNavigation(JSON.parse(navAlready));
    }

    axios.get(`${BASE_URL}/posts`).then((response) => setPosts(response.data));
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fbfbfb" }}>
      {/* SIDEBAR - Fixed width */}
      <LeftSideBarCategories categories={mainRoutes} />

      {/* MAIN CONTENT AREA */}
      <Container
        maxWidth="lg"
        sx={{
          mt: 2,
          // Pushes content to the right to make room for the fixed sidebar
          ml: { xs: 0, md: "270px" },
          flexGrow: 1,
          pb: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, ml: 1 }}>
          Най-нови обяви
        </Typography>

        <Grid container spacing={2}>
          {posts &&
            posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Box
                  onClick={() => {
                    const category = routes.find(
                      (item) => item.id == post.categoryId,
                    );
                    navigate(
                      `/category/${category?.slug || post.categoryId}/${post.id}`,
                    );
                  }}
                  sx={{
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    borderRadius: "12px",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Minipostermain
                    info1={post.title}
                    info2={post.description}
                    // You can pass more props here if Minipostermain supports them
                  />
                </Box>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
}
