import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Divider,
  Stack,
  Alert,
} from "@mui/material";

import { AuthContext } from "../components/AuthContext";
import { BASE_URL } from "../constant-data/env";
import googleLogin from "../pictures/googleLogin.jpg";
import fbLogin from "../pictures/facebooklogin.jpg";

export function Login() {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(6)
      .max(25)
      .required("Имейлът е задължителен")
      .email("Невалиден имейл"),
    password: Yup.string().min(4).max(25).required("Паролата е задължителна"),
  });

  const login = (data) => {
    axios
      .post(`${BASE_URL}/loginregistration/login`, { data })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            status: true,
          });
          navigate("/");
        }
      });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: "100%",
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Вход в TOP1
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Добре дошли отново!
          </Typography>

          <Formik
            initialValues={initialValues}
            onSubmit={login}
            validationSchema={validationSchema}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Имейл"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    fullWidth
                    name="password"
                    label="Парола"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: "black",
                      color: "white",
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: "1rem",
                      "&:hover": { bgcolor: "#333" },
                    }}
                  >
                    Влез
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>

          <Divider sx={{ my: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Или продължи с
            </Typography>
          </Divider>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Box
              component="img"
              src={fbLogin}
              alt="Facebook Login"
              sx={{
                width: 150,
                height: "auto",
                cursor: "pointer",
                borderRadius: "8px",
                transition: "0.2s",
                "&:hover": { opacity: 0.8 },
              }}
            />
            <Box
              component="img"
              src={googleLogin}
              alt="Google Login"
              sx={{
                width: 150,
                height: "auto",
                cursor: "pointer",
                borderRadius: "8px",
                transition: "0.2s",
                "&:hover": { opacity: 0.8 },
              }}
            />
          </Stack>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2">
              Нямате акаунт?{" "}
              <Button
                onClick={() => navigate("/register")}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Регистрирайте се
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
