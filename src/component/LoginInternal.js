import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/login.module.css";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosMethod } from "../services/helper";
import { logInThunk, setIsLogin } from "../reduxToolkit/Account/accountSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  setMultiNotificationData,
  setMultiNotificationVariant,
} from "../reduxToolkit/Notification/notificationSlice";

function LoginInternal() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const routerChange = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    localStorage.setItem("email",loginData.email )
    const result = await dispatch(logInThunk(loginData));
    const response = unwrapResult(result);

    if(response.data.activeStatus === "N"){
      navigate("/resumemakerui/passwordreset");
      localStorage.setItem("activeStatus", response.data.activeStatus )
    }
    else if(response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.userName)
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("activeStatus", response.data.activeStatus)
      dispatch(setIsLogin(true));
     // navigate("/resumemakerui/dashboard");
      //navigate(redirectTo);
      if (localStorage.getItem("redirect") !== null) {
        const redirect = localStorage.getItem("redirect");
        if (redirect === "/resumemakerui/internal/login")
        {
          localStorage.setItem("internal", redirect)
        }
        if (redirect.startsWith("/resumemakerui") && redirect !== "/resumemakerui/internal/login") {
          navigate(redirect);
        } else {
          navigate("/resumemakerui/dashboard");
        }
        localStorage.removeItem("redirect");
      } else {
        navigate("/resumemakerui/dashboard");
      }
    } else {
      dispatch(setMultiNotificationVariant("error"));
      const errorArray = [
        {
          propertyValue: response?.data?.token || "Something went wrong",
        },
      ];
      dispatch(setMultiNotificationData(errorArray));
    }
  };

  const handleSignUpOpen = () => {
    let path = `/resumemakerui/signup`;
    navigate(path);
  };

  const schema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter valid email address"),
    password: yup.string().required("Please enter password"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return (
    <Grid tabIndex="0" container>
      <Grid item xs={12} sm={12} md={5} lg={5}>
        <Paper square className={styles.paperContainer}></Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={7}>
        <Box className={styles.box}>
          <Typography variant="h2" gutterBottom>
            Welcome
          </Typography>
          {/* <Typography
                    variant="subtitle1"
                    gutterBottom
                    component="div"
                    sx={{ py: 1 }}
                  >
                    Don't have an account?
                    <Button style={{ fontWeight: 'bold', color: 'navy', textTransform: 'none' }} onClick={handleSignUpOpen}> Register</Button>
                  </Typography> */}
          <FormControl sx={{ py: 2 }}>
            <Grid container rowSpacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={10}>
                <TextField
                  fullWidth
                  id="logInEmail"
                  label="Company Email"
                  name="email"
                  required
                  type="email"
                  {...register("email")}
                />

                <p style={{ color: "red" }}>{errors.email?.message}</p>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={10}>
                <TextField
                  id="logInPass"
                  fullWidth
                  label="Password"
                  name="password"
                  required
                  type="password"
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit(routerChange)();
                    }
                  }}
                  {...register("password")}
                />

                <p style={{ color: "red" }}>{errors.password?.message}</p>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  {/* <Typography my={2} variant="subtitle2">
                    <Link>
                      <Typography
                        id="logInForgot"
                        onClick={() => navigate('/resumemakerui/passwordreset')}
                        sx={{ ":hover": { cursor: "pointer" } }}
                        variant="h7"
                      >
                        Forgot Password?
                      </Typography>
                    </Link>
                  </Typography> */}
                  <Button style={{ fontWeight: 'bold', color: 'navy', textTransform: 'none'}} onClick={() => navigate('/resumemakerui/passwordreset')}>Forgot Password ?</Button>

                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={10}
                className={styles.griditem}
              >
                <Button
                  id="logInButton"
                  sx={{ width: "100px",textTransform: 'none' }}
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit(routerChange)}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginInternal;
