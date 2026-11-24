import React from "react";
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
} from "@mui/material";

import { BASE_URL } from "../constant-data/env";
import googleLogin from "../pictures/googleLogin.jpg";
import fbLogin from "../pictures/facebooklogin.jpg";

export function Register() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "", // Added for better UX
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(6, "Твърде кратък имейл")
      .max(25, "Твърде дълъг имейл")
      .required("Имейлът е задължителен")
      .email("Невалиден имейл формат"),
    password: Yup.string()
      .min(4, "Паролата трябва да е поне 4 символа")
      .max(25, "Паролата е твърде дълга")
      .required("Паролата е задължителна"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Паролите не съвпадат")
      .required("Моля, потвърдете паролата"),
  });

  const onSubmit = (values) => {
    // Sending only email and password to the backend
    const data = { email: values.email, password: values.password };

    axios
      .post(`${BASE_URL}/loginregistration`, { data })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error("Registration error:", err);
        alert("Възникна грешка при регистрацията.");
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
          pb: 5,
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
            Създай акаунт
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Присъедини се към TOP1 общността
          </Typography>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form>
                <Stack spacing={2.5}>
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

                  <TextField
                    fullWidth
                    name="confirmPassword"
                    label="Потвърди парола"
                    type="password"
                    variant="outlined"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
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
                      fontWeight: "bold",
                      "&:hover": { bgcolor: "#333" },
                    }}
                  >
                    Регистрация
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>

          <Divider sx={{ my: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Или се регистрирай с
            </Typography>
          </Divider>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Box
              component="img"
              src={fbLogin}
              sx={{
                width: 150,
                cursor: "pointer",
                borderRadius: "8px",
                "&:hover": { opacity: 0.8 },
              }}
            />
            <Box
              component="img"
              src={googleLogin}
              sx={{
                width: 150,
                cursor: "pointer",
                borderRadius: "8px",
                "&:hover": { opacity: 0.8 },
              }}
            />
          </Stack>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2">
              Вече имате акаунт?{" "}
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Влез тук
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
