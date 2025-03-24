import "../App.css"
import { useNavigate } from "react-router";
import { useState } from 'react';
import googleLogin from "../pictures/googleLogin.jpg"
import fbLogin from "../pictures/facebooklogin.jpg";
import { BASE_URL } from "../constant-data/env";
import axios from "axios";
import {Formik,Form, Field,ErrorMessage} from "formik";
import * as Yup from "yup";

export function Register() {
    const navigate = useNavigate();
    
    const initialValues={
        email:"",
        password:"",
    }
    const validationSchema=Yup.object().shape({
        email:Yup.string().min(6).max(25).required().email(),
        password:Yup.string().min(4).max(25).required()
    })

    
    const onSubmit = (data) => {
       
       axios.post(`${BASE_URL}/loginregistration`,{data})
       .then(navigate("/login"))

    }
   
    return (
        <div className="loginContainer" style={{marginLeft:"35%"}}>
            <div className="loginData">
 
            
            <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema} >
                <Form>
                    <div style={{textAlign:"center"}}>
                    <label >Имейл:</label>
                    <Field autocomplete="on" id="" name="email"placeholder="Вашият email"/>
                    <ErrorMessage name="email"style={{color:"red",fontWeight:"bold"}}component="span"/>
                    <br/>
                    <label>Парола:</label>
                    <Field autocomplete="on" id="" name="password" placeholder="Вашата парола"/>
                    <ErrorMessage name="password" style={{color:"red",fontWeight:"bold"}} component="span" />
                    </div>
                <button type="submit" style={{cursor:"pointer"}}>Регистрация</button>
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