import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./components/AuthContext";
import "./App.css"
import { Navbar } from "./pages/navbar";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { useEffect } from "react";
import { useState } from "react";
import { Poster } from "./posters/poster";
import { SinglePost } from "./pages/SinglePost";

import axios from "axios";
import { BASE_URL } from "./constant-data/env";

function App() {

  const [authState, setAuthState] = useState({email:"",id:0,status:false})
  useEffect(() => {
    axios.get(`${BASE_URL}/loginregistration/auth`,{
      headers:{
        accessToken:localStorage.getItem("accessToken"),
      },
    }).then((response)=>{
      if(response.data.error){
       setAuthState({...authState,status:false})
      }else{
      setAuthState({email:response.data.email, id:response.data.id,status:true})
      }
    })
  }, []
  )

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/addPoster" element={<Poster />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<SinglePost />} />
            
           
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>

    </div>
  );
}

export default App;
