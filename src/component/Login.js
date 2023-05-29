import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
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
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const routerChange = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    localStorage.setItem("email",loginData.email )
    const result = await dispatch(logInThunk(loginData));
    const response = unwrapResult(result);
    //console.log("response--->",response)
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
        if (redirect.startsWith("/resumemakerui")) {
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
          propertyValue: response?.data?.message || "Something went wrong",
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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

export default Login;
