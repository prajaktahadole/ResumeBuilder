import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { InputTextfield } from "../component/theme";
import styles from "../styles/signUp.module.css";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/resumemaker-services";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { useDispatch } from "react-redux";
import { SignUpThunk } from "../reduxToolkit/Account/accountSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  setMultiNotificationData,
  setMultiNotificationVariant,
} from "../reduxToolkit/Notification/notificationSlice";

function checkForSpecialCharNumber(data) {
  var char = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\s [a-zA-Z]*$]/;
  var number = "[0-9]";
  if (data?.match(char) || data?.match(number)) {
    return false;
  }
  return true;
}

function checkLength(data) {
  if (data.toString().length !== 10) {
    return false;
  }
  return true;
}

const schema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    // .pattern="^[a-zA-Z0-9\s]+$"
    .test(
      "Check for special",
      "First name can only have alphabets",
      checkForSpecialCharNumber
    ),
  lastName: yup
    .string()
    .required("Last name is required")
    .test(
      "Check for special",
      "Last name can only have alphabets",
      checkForSpecialCharNumber
    ),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Company email is required"),

  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Your passwords must match"),
});

function SignUp(formData) {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConf, setIsVisibleConf] = useState(false);
  const [lower, setLower] = useState(false);
  const [upper, setUpper] = useState(false);
  const [number, setNumber] = useState(false);
  const [special, setSpecial] = useState(false);
  const [min, setMin] = useState(false);
  const [viewValidation, setViewValidation] = useState(false);
  const [passWordChange, setPassWordChange] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData.user,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  let navigate = useNavigate();
  const handleOpenLogin = () => {
    let path = `/resumemakerui/login`;
    navigate(path);
  };
  const submit = async (data) => {
    const singupdata = {
      fullName: data.firstName + " " + data.lastName,
      email: data.email,
      password: data.password,
      role: "PARTNER",
      activeStatus: "Y",
    };
    const result = await dispatch(SignUpThunk(singupdata));
    const response = unwrapResult(result);
    if (response.status === 200) {
      dispatch(setMultiNotificationVariant("success"));
      const errorArray = [
        {
          propertyValue: response?.data?.message || "Sign up successfull",
        },
      ];
      dispatch(setMultiNotificationData(errorArray));
      navigate("/resumemakerui/login");
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
  const handlePassWordChnage = (e) => {
    const { value } = e.target;
    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;
    let special = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    value.match(lowerCaseLetters) ? setLower(true) : setLower(false);
    value.match(upperCaseLetters) ? setUpper(true) : setUpper(false);
    value.match(numbers) ? setNumber(true) : setNumber(false);
    value.match(special) ? setSpecial(true) : setSpecial(false);
    value.length >= 8 ? setMin(true) : setMin(false);
    setPassWordChange(value);
  };

  return (
    <Grid
      tabIndex="0"
      container
      width={"80%"}
      className={styles.mainpaperContainer}
    >
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Paper square className={styles.paperContainer}></Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Box className={styles.box}>
          <p style={{ fontSize: 48, fontWeight: 'normal' }}>Welcome!</p>
          <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ py: 1, cursor: "pointer" }}
                >
                  Already have an account?
        
                  <Button style={{ fontWeight: 'bold', color: 'navy', textTransform: 'none'}} onClick={handleOpenLogin}>Login</Button>
                  {/* </Link> */}
                </Typography>
          <FormControl sx={{ py: 2 }}>
            <Grid container rowSpacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={10}>
                <InputTextfield
                  fullWidth
                  label="First Name"
                  required
                  {...register("firstName")}
                />
                <p className={styles.error}>{errors.firstName?.message}</p>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={10}>
                <InputTextfield
                  fullWidth
                  label="Last Name"
                  required
                  {...register("lastName")}
                />

                <p className={styles.error}>{errors.lastName?.message}</p>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={10}>
                <InputTextfield
                  fullWidth
                  type="email"
                  label="Company email"
                  required
                  {...register("email")}
                />

                <p className={styles.error}>{errors.email?.message}</p>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={10}>
                <InputTextfield
                  fullWidth
                  label="Create Password"
                  required
                  type={isVisible ? "text" : "password"}
                  value={passWordChange}
                  onFocus={() => setViewValidation(true)}
                  onBlur={() => setViewValidation(false)}
                  onChange={(e) => handlePassWordChnage(e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setIsVisible(!isVisible)}
                        sx={{ ":hover": { cursor: "pointer" } }}
                        position="end"
                      >
                        {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </InputAdornment>
                    ),
                  }}
                  {...register("password", {
                    onChange: (e) => handlePassWordChnage(e),
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={10}>
                {viewValidation ? (
                  <Stack>
                    {passWordChange === "" && errors.password?.message ? (
                      <p style={{ color: "red" }}>Password is Required</p>
                    ) : (
                      <Stack
                        paddingLeft={2}
                        flexWrap={"wrap"}
                        direction={"column"}
                        columnGap={5}
                      >
                        <div>
                          <p style={{ color: "black", marginBottom: "0px" }}>
                            Your password must fulfill the following criteria:
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          {" "}
                          <p style={{ color: "black", marginBottom: "0px" }}>
                            1. Minimum 8 characters
                          </p>
                          <div
                            style={{ paddingTop: "16px", marginLeft: "5px" }}
                          >
                            {min ? (
                              <CheckIcon sx={{ color: "green" }} />
                            ) : (
                              <CloseIcon sx={{ color: "red" }} />
                            )}
                          </div>
                        </div>
                        <div
                          style={{ display: "flex", alignContent: "center" }}
                        >
                          <p style={{ color: "black", marginBottom: "0px" }}>
                            2. At least 1 lowercase character
                          </p>
                          <div
                            style={{ paddingTop: "16px", marginLeft: "5px" }}
                          >
                            {lower ? (
                              <CheckIcon sx={{ color: "green" }} />
                            ) : (
                              <CloseIcon sx={{ color: "red" }} />
                            )}
                          </div>
                        </div>
                        <div
                          style={{ display: "flex", alignContent: "center" }}
                        >
                          <p style={{ color: "black", marginBottom: "0px" }}>
                            3. At least 1 uppercase character
                          </p>
                          <div
                            style={{ paddingTop: "16px", marginLeft: "5px" }}
                          >
                            {upper ? (
                              <CheckIcon sx={{ color: "green" }} />
                            ) : (
                              <CloseIcon sx={{ color: "red" }} />
                            )}
                          </div>
                        </div>

                        <div
                          style={{ display: "flex", alignContent: "center" }}
                        >
                          {" "}
                          <p style={{ color: "black", marginBottom: "0px" }}>
                            4. At least 1 number
                          </p>
                          <div
                            style={{ paddingTop: "16px", marginLeft: "5px" }}
                          >
                            {number ? (
                              <CheckIcon sx={{ color: "green" }} />
                            ) : (
                              <CloseIcon sx={{ color: "red" }} />
                            )}
                          </div>
                        </div>

                        <div
                          style={{ display: "flex", alignContent: "center" }}
                        >
                          {" "}
                          <p style={{ color: "black", marginBottom: "0px" }}>
                            5. At least 1 special character (!@#$%^&*?)
                          </p>
                          <div
                            style={{ paddingTop: "16px", marginLeft: "5px" }}
                          >
                            {special ? (
                              <CheckIcon sx={{ color: "green" }} />
                            ) : (
                              <CloseIcon sx={{ color: "red" }} />
                            )}
                          </div>
                        </div>
                      </Stack>
                    )}
                  </Stack>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={10}>
                <InputTextfield
                  onClick={() => setViewValidation(false)}
                  onFocus={() => setViewValidation(false)}
                  fullWidth
                  label="Confirm Password"
                  required
                  type={isVisibleConf ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setIsVisibleConf(!isVisibleConf)}
                        sx={{ ":hover": { cursor: "pointer" } }}
                        position="end"
                      >
                        {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </InputAdornment>
                    ),
                  }}
                  {...register("confirmPassword")}
                />

                <p className={styles.error}>
                  {errors.confirmPassword?.message}
                </p>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={349}
                sx={{ display: "flex", justifyContent: "space-Between" }}
              >
                <Button
                  id="signUPButton"
                  sx={{ width: "100px" }}
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit(submit)}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}
export default SignUp;
