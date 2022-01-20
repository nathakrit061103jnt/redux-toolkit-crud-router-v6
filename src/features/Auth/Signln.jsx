import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../components/Copyright";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { signIn, signOut } from "./authSlice";

import { useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function SignIn() {
  useEffect(async () => {
    dispatch(signOut());
  }, []);

  const validationSchema = Yup.object().shape({
    u_email: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    u_password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 6 characters")
      .max(50, "Password must not exceed 50 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      await dispatch(signIn(data)).unwrap();
      await navigate(from, { replace: true });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              id="u_email"
              label="Email Address"
              name="u_email"
              autoComplete="current-email"
              autoFocus
              {...register("u_email")}
              error={errors.u_email ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.u_email?.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="u_password"
              label="Password"
              type="password"
              id="u_password"
              autoComplete="current-password"
              {...register("u_password")}
              error={errors.u_password ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.u_password?.message}
            </Typography>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link to="/signUp"> Don't have an account? Sign Up</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
