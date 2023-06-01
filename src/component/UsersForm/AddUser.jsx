import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { InputTextfield } from "../theme";
import styles from "../../styles/signUp.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SignUpThunk } from "../../reduxToolkit/Account/accountSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  setMultiNotificationData,
  setMultiNotificationVariant,
} from "../../reduxToolkit/Notification/notificationSlice";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { updateUser } from "../../services/resumemaker-services";
import Spinner from "../../utils/Spinner";

function checkForSpecialCharNumber(data) {
  var char = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\s [a-zA-Z]*$]/;
  var number = "[0-9]";
  if (data?.match(char) || data?.match(number)) {
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

  //email: yup.string().email("Please enter a valid email address"),
  //email: yup.string().email('Invalid email').required('Email is required'),
  email: yup.string().when("isDisabled", {
    is: false,
    then: yup.string().email("Invalid email").required("Email is required"),
  }),

  userRole: yup.string().required("Need to select atleast one user role"),

  company: yup.string().when("isDisabled", {
    is: false,
    then: yup.string().required("Company name is required"),
  }),
  // company: yup.string().required("Please Enter Partner Company Name"),
});

function AddUser({ formData, user, name, id, isUserEdit }) {
  const dispatch = useDispatch();
  const [userRole, setuserRole] = useState(
    isUserEdit && user?.roles[0]?.name ? user.roles[0].name : ""
  );
  const [cName, setCName] = useState(
    isUserEdit ? user.company : userRole === "PARTNER" ? "" : "Humancloud"
  );
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
    setValue,
  } = useForm({
    // defaultValues: formData.user,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  let navigate = useNavigate();

  const handleChangeUserRole = (event) => {
    setuserRole(event.target.value);
    // setValue('company','Humancloud')
    setCName(event.target.value === "PARTNER" ? "" : "Humancloud");
  };

  const submit = async (data) => {
    setIsLoading(true);
    if (isUserEdit === true) {
      const updatedata = {
        fullName: data.firstName + " " + data.lastName,
        role: userRole,
        company: data.company,
      };
      try {
        const res = await updateUser(id, updatedata, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (res.code === "200") {
          dispatch(setMultiNotificationVariant("success"));
          const errorArray = [
            {
              propertyValue: res.message || "User Added successfully",
            },
          ];
          dispatch(setMultiNotificationData(errorArray));
          isUserEdit = false; // Exit edit mode
          navigate("/resumemakerui/users");
        } else {
          dispatch(setMultiNotificationVariant("error"));
          const errorArray = [
            {
              propertyValue: res.message || "Something went wrong",
            },
          ];
          dispatch(setMultiNotificationData(errorArray));
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      const singupdata = {
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        password: "123456",
        role: userRole,
        activeStatus: "N",
        company:
          userRole === "PARTNER" ? data.company : "Humancloud Technologies",
      };

      //console.log("signup dataa", singupdata)

      const result = await dispatch(SignUpThunk(singupdata));
      const response = unwrapResult(result);
      if (response.status === 200) {
        dispatch(setMultiNotificationVariant("success"));
        const errorArray = [
          {
            propertyValue: response?.data?.message || "User Added successfully",
          },
        ];
        dispatch(setMultiNotificationData(errorArray));
        //resetForm();
        navigate("/resumemakerui/users");
      } else {
        dispatch(setMultiNotificationVariant("error"));
        const errorArray = [
          {
            propertyValue: response?.data?.message || "Something went wrong",
          },
        ];
        dispatch(setMultiNotificationData(errorArray));
      }
    }
  };
  const handleCNameChnage = (data) => {
    setValue("company", data);
    setCName(data);
  };
  const handleBackClick = () => {
    navigate("/resumemakerui/users/");
  };

  return (
    <div>
      <React.Fragment>
        {isLoading ? (
          <Spinner />
        ) : (
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={12} md={12} lg={6}>
          <form>
            <Grid item xs={12} sm={12} md={12} lg={12}>
               <Box style={{
                width: "100%",
                margin: "auto",
                padding: "50px",
                marginTop: "50px",
                boxShadow:
                    "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
              }}>
                {isUserEdit ? <h3>Update User</h3> : <h3>Add New User</h3>}

                <FormControl sx={{ py: 1 }}>
                  <Grid container rowSpacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <InputTextfield
                          fullWidth
                          label="First Name"
                          required
                          {...register("firstName")}
                          defaultValue={isUserEdit ? name[0] : ""}
                      />
                      {errors.firstName && (
                          <p className={styles.error}>
                            {errors.firstName?.message}
                          </p>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <InputTextfield
                          fullWidth
                          label="Last Name"
                          required
                          {...register("lastName")}
                          defaultValue={isUserEdit ? name[1] : ""}
                      />
                      {errors.lastName && (
                          <p className={styles.error}>
                            {errors.lastName?.message}
                          </p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      {isUserEdit ? (
                          <InputTextfield
                              fullWidth
                              type="email"
                              label="Company email"
                              disabled={isUserEdit}
                              defaultValue={isUserEdit ? user.email : ""}
                          />
                      ) : (
                          <InputTextfield
                              fullWidth
                              type="email"
                              label="Email"
                              required
                              {...register("email")}
                          />
                      )}
                      {errors.email && (
                          <p className={styles.error}>{errors.email?.message}</p>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          User Role
                        </InputLabel>

                        <Select
                            sx={{ width: "100%" }}
                            value={userRole}
                            label="userRole"
                            {...register("userRole")}
                            onChange={handleChangeUserRole}
                            required
                        >
                          <MenuItem value={"PARTNER"}>PARTNER</MenuItem>
                          <MenuItem value={"INTERNAL"}>INTERNAL</MenuItem>
                          <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                          <MenuItem value={"INTERVIEWER"}>INTERVIEWER</MenuItem>
                        </Select>
                      </FormControl>
                      {!userRole && errors.userRole && (
                          <p className={styles.error}>
                            {errors.userRole?.message}
                          </p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <InputTextfield
                          fullWidth
                          label="Company Name"
                          required
                          name="company"
                          value={cName}
                          disabled={userRole === "PARTNER" ? false : true}
                          onChange={(e) => handleCNameChnage(e.target.value)}
                      />
                      {errors.company && (
                          <p className={styles.error}>
                            {errors.company?.message}
                          </p>
                      )}
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        sx={{ display: "flex", justifyContent: "space-Between" }}
                    >
                      {isUserEdit ? (
                          <Button
                              id="signUPButton"
                              sx={{ width: "150px" }}
                              variant="contained"
                              fullWidth
                              onClick={handleSubmit(submit)}
                              type="submit"
                              style={{ backgroundColor: "rgb(33, 80, 162)" }}
                          >
                            Update User
                          </Button>
                      ) : (
                          <Button
                              id="signUPButton"
                              sx={{ width: "100px" }}
                              variant="contained"
                              fullWidth
                              style={{ backgroundColor: "rgb(33, 80, 162)" }}
                              onClick={handleSubmit(submit)}
                              type="submit"
                          >
                            Save
                          </Button>
                      )}

                      {isUserEdit ? (
                          <Button
                              style={{
                                margin: "5px",
                                width: "2%",
                                height: "40px",
                                fontSize: "15px",
                                fontWeight: "bolder",
                                backgroundColor: "rgb(33, 80, 162)",
                              }}
                              type="submit"
                              variant="contained"
                              color="primary"
                              onClick={handleBackClick}
                          >
                            <IconButton
                                type="button"
                                sx={{ p: "30px", color: "white" }}
                                aria-label="search"
                            >
                              <ArrowBackOutlinedIcon />
                            </IconButton>
                          </Button>
                      ) : (
                          <Button
                              id="ResetButton"
                              sx={{ width: "100px" }}
                              variant="contained"
                              fullWidth
                              style={{ backgroundColor: "rgb(33, 80, 162)" }}
                              // onClick={handleSubmit(submit)}
                              type="reset"
                          >
                            Reset
                          </Button>
                      )}
                    </Grid>
                  </Grid>
                </FormControl>
              </Box>
             </Grid>

          </form>
              </Grid>
            </Grid>
        )}
      </React.Fragment>
    </div>
  );
}
export default AddUser;
