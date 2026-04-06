import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./components/AuthContext";
import "./App.css";
import { Navbar } from "./components/navbar";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { useEffect } from "react";
import { useState } from "react";
import { DropDownMenu } from "./postersAddAd/dropDownMenu";
import { SinglePost } from "./pages/SinglePost";
import { Main } from "./pages/main";
import axios from "axios";
import { BASE_URL } from "./constant-data/env";
import { CategoryPage } from "./pages/CategoryPage";

function App() {
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    status: false,
  });
  const [routes, setRoutes] = useState([]);
  const [mapper, setMapper] = useState(new Map());

  useEffect(() => {
    axios
      .get(`${BASE_URL}/loginregistration/auth`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            status: true,
          });
        }
      });

    const nav = localStorage.getItem("navigation");
    if (nav) {
      const parsed = JSON.parse(nav);
      setRoutes(parsed);

      const map = new Map();

      parsed.forEach((item) => {
        map.set(item.id, { ...item, children: [] });
      });

      parsed.forEach((item) => {
        if (item.parentId !== null) {
          const parent = map.get(item.parentId);
          if (parent) {
            parent.children.push(map.get(item.id));
          }
        }
      });

      setMapper(map);
    }
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/addPoster" element={<DropDownMenu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Main />} />
            <Route
              path="/category/:slug"
              element={<CategoryPage categories={routes} />}
            />
            <Route path="/category/:slug/:id" element={<SinglePost />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
