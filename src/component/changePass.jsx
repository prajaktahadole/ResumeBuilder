import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  FormControl,
  Paper,
  Grid,
  Alert,
  InputAdornment,
} from "@mui/material";
import "../styles/form.css";
import { useNavigate } from "react-router-dom";
import { checkEmail, resetPassword } from "../services/resumemaker-services";
import {
  setMultiNotificationData,
  setMultiNotificationVariant,
} from "../reduxToolkit/Notification/notificationSlice";
import { useDispatch } from "react-redux";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/system";
import { InputTextfield } from "./theme";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [newpass, setNewPass] = useState("");
  const [lower, setLower] = useState(false);
  const [upper, setUpper] = useState(false);
  const [number, setNumber] = useState(false);
  const [special, setSpecial] = useState(false);
  const [min, setMin] = useState(false);
  const [viewValidation, setViewValidation] = useState(false);
  const [passWordChange, setPassWordChange] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConf, setIsVisibleConf] = useState(false);
  const email = localStorage.getItem("email");

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

  const navigate = useNavigate();
 

  const HandleSteps = async (e) => {
    e.preventDefault();

   if (step === 1) {
      if (newpass === "" || newpass.length < 8)
      {
        dispatch(setMultiNotificationVariant("error"));
        const errorArray = [
          {
            propertyValue: "Please Fill Confirm Password",
          },
        ];
        dispatch(setMultiNotificationData(errorArray));
        
      }
      else if (passWordChange === "" || passWordChange.length < 8)
      {
        dispatch(setMultiNotificationVariant("error"));
        const errorArray = [
          {
            propertyValue: "Please Fill New Password",
          },
        ];
        dispatch(setMultiNotificationData(errorArray));
        
      }
      else if (newpass !== passWordChange) 
      {
        dispatch(setMultiNotificationVariant("error"));
        const errorArray = [
          {
            propertyValue: "New Password and Confirm Password is not matched",
          },
        ];
        dispatch(setMultiNotificationData(errorArray));
      }
      else {
        const data = {
          email: email,
          password: passWordChange,
        };

        const resetData = await resetPassword(JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if(resetData.code === '200')
        {
            dispatch(setMultiNotificationVariant("success"));
            const errorArray = [
              {
                propertyValue: resetData.message || "System error",
              },
            ];
            dispatch(setMultiNotificationData(errorArray));
            navigate("resumemakerui/login")
        }
        else
        {
            dispatch(setMultiNotificationVariant("error"));
            const errorArray = [
              {
                propertyValue:  resetData.message || "Something went wrong",
              },
            ];
            dispatch(setMultiNotificationData(errorArray));
        }
      }
    } 
  };
  const renderNextButton = () => {
 if (step === 1) {
      return (
        <Button
          style={{ fontWeight: "bold", color: "navy", textTransform: "none"  , marginBottom : "25px"}}
          onClick={HandleSteps}
          type="button"
        >
           Change Password
        </Button>
      );
    } 
   
    else {
      return undefined;
    }
  };




  return (
    <>
      <div style={{ width : "50%", minHeight: "400px", margin :"40px auto", boxShadow:"rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"}}>

        <div  style={{ width : "70%", margin :"auto" }}>
          <FormControl className="formcontrol">
         
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column" }}>
            
                  <Typography variant="h4" gutterBottom margin={"40px"}> 
                    Reset Password
                  </Typography>
                

                <div className="textmar">
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
                          {isVisible ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <Grid item xs={12} sm={12} md={12} lg={10}>
                  {viewValidation ? (
                    <Stack>
                      {passWordChange === "" ? (
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
                <div className="textmar">
                  <InputTextfield
                    onClick={() => setViewValidation(false)}
                    onFocus={() => setViewValidation(false)}
                    fullWidth
                    label="Confirm Password"
                    required
                    value={newpass}
                    onChange={(e) => setNewPass(e.target.value)}
                    type={isVisibleConf ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setIsVisibleConf(!isVisibleConf)}
                          sx={{ ":hover": { cursor: "pointer" } }}
                          position="end"
                        >
                          {isVisibleConf ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
            )}

<           div className="butt">
              {renderNextButton()}
            </div>

          
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
