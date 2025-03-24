import Logo from "../pictures/top1logo.jpg"
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { MyProfile } from "./myProfile";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useState } from "react";

export function Navbar() {
    let navigate = useNavigate();
    const {authState,setAuthState}=useContext(AuthContext)
    
    return (

        <div className="navBar">
            <div className="searchForm">
                <img width="140px" src={Logo} style={{ borderRadius: '10px' }} onClick={() => { navigate('/') }} />
                <div className="inputAndSearch">
                    <input placeholder="ключова дума, номер на обява, телефонен номер, населено място" />
                    <SearchIcon id='SearchIcon' onClick={() => { navigate('/') }} />

                </div>
                {authState.status && (

                    <div className="add" >
                        <div>
                            <a onClick={() => { navigate("/addPoster") }}>
                                <div style={{ "margin-left": "-20px" }}><AddIcon />
                                Публикувай обява,{authState.email.replace(/@(.*)/,'')}</div>
              
                            </a>
                           
                        </div>
                    </div>

                )
                } 

            </div>
            <MyProfile />

        </div>

    )
}