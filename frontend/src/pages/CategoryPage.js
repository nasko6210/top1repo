import { useEffect, useState } from "react";
import { LeftSideBarCategories } from "../components/LeftSideBarCategories";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router";
import { Minipostermain } from "../components/miniPosterMain";
import axios from "axios";
import { BASE_URL } from "../constant-data/env";

export const CategoryPage = ({ categories }) => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const currentCategory = categories.find((c) => c.slug === slug);

  const children = categories.filter((c) => c.parentId === currentCategory?.id);

  useEffect(() => {
    if (currentCategory) {
      axios
        .get(`${BASE_URL}/posts/${currentCategory?.id}`)
        .then((response) => setPosts(response.data));
    }
  }, [currentCategory]);

  return (
    <div>
      <LeftSideBarCategories categories={children} />
      {posts &&
        posts.map((post) => (
          <div
            onClick={() => {
              console.log("licke");
              const routes = JSON.parse(localStorage.getItem("navigation"));
              const categorySlug = routes.find(
                (item) => item.id == post.categoryId,
              );
              navigate(
                `/category/${categorySlug?.slug || post.categoryId}/${post.id}`,
              );
            }}
          >
            <Minipostermain
              key={post.id}
              id={post.id}
              info1={post.title}
              info2={post.description}
            />
          </div>
        ))}
    </div>
  );
};
