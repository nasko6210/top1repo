import "../App.css"
import googleLogin from "../pictures/googleLogin.jpg"
import fbLogin from "../pictures/facebooklogin.jpg";
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { BASE_URL } from "../constant-data/env";
import {Formik,Form,Field,ErrorMessage} from "formik";
import * as Yup from "yup";


export function Login() {
;

    const navigate = useNavigate()
   
    const initialValues={email:"",password:""};
    const validationSchema=Yup.object().shape({
        email:Yup.string().min(6).max(25).required().email(),
        password:Yup.string().min(4).max(25).required()
    })
    const { authState, setAuthState } = useContext(AuthContext);
    const login = (data) => {
       
        axios.post(`${BASE_URL}/loginregistration/login`, {data})
        .then((response) => {
       if(response.data.error){
           alert(response.data.error)
        }else{
            
         localStorage.setItem("accessToken",response.data.token)
          setAuthState({email:response.data.email,id:response.data.id,status:true})
                      navigate("/")
        }
        })
 

    }
    return (<div className="loginContainer" style={{marginLeft:"35%"}}>
        <div className="loginData">

        
        <Formik initialValues={initialValues} onSubmit={login} validationSchema={validationSchema}>
        <Form>
            <div style={{textAlign:"center"}}>

            <label>Имейл:</label>
            <Field autocomplete="on"  name="email" placeholder="Въведете Имейл"/>
            <ErrorMessage name="email" style={{color:"red",fontWeight:"bold"}} component="span"/>
            <br/>
            <label>Парола:</label>
            <Field autocomplete="on"  name="password" placeholder="Въведете парола"/>
            <ErrorMessage name="password" style={{color:"red",fontWeight:"bold"}} component="span" />
            </div>
            <button type="submit" style={{cursor:"pointer"}}>Влез</button>
        </Form>
        </Formik>
        <img src={fbLogin} width="160px" height="30px" style={{
                cursor:"pointer",
                float: "left",
                marginLeft: "-70px",
                marginTop: "30px", borderRadius: "10px"
            }} />
            <img src={googleLogin} width="160px" height="30px"
                style={{cursor:"pointer", marginRight: "-70px", marginTop: "30px", borderRadius: "10px", float: "right" }}
            />
    </div>

    </div>
    

    )
}