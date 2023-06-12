import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
    Grid,
    Card,
  CardContent,
  Select,
  IconButton,
  FormHelperText,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState, useRef } from "react";
import Education from "./Education";
import SkillSets from "./SkillSets";
import Company from "./Company";
import { useNavigate } from "react-router-dom";
import {
  editResumeById,
  resumeSave,
} from "../../services/resumemaker-services";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  setMultiNotificationData,
  setMultiNotificationVariant,
} from "../../reduxToolkit/Notification/notificationSlice";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required')
  .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Invalid Full name')
  .min(2, 'Full name must be at least 2 characters')
  .max(50, 'Full name must not exceed 50 characters'),
  email: yup.string().matches(/^(?!\s+$).+$/, 'Only spaces are not allowed.').email("Invalid email").required("Email is required"),
  mainDesignation: yup.string().matches(/^(?!^\s+$)[a-zA-Z.\- ]*$/, 'Enter valid Title').required("Title is required"),
  mobileNo: yup.string()
  .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
  .required('Mobile number is required'),
  address: yup.string().matches(/^(?!\s*$).+/, 'Only spaces are not allowed.').required("Address is required"),
  gender: yup.string().required("Gender is required"),
  maritalStatus: yup.string().ensure().required("Marital Status is required"),
  degree: yup.string().matches(/^(?!\s*$).+/, 'Only spaces are not allowed.').required("Higher qualification is required"),
  university: yup.string().matches(/^(?!\s*$).+/, 'Only spaces are not allowed.').required("University name is required"),
  passingYear: yup
    .number()
    .typeError("Please enter a valid year")
    .integer("Please enter a valid year")
    .min(1980, "Year should be greater than or equal to 1980")
    .max(
      new Date().getFullYear(),
      "Year should be less than or equal to the current year"
    )
    .required("Passing Year is required"),
});

function Resume({ item, isEdit = false, id }) {
  const dispatch = useDispatch();
  const [summary, setSummary] = useState("");
  const [summaryList, setSummaryList] = useState(
    isEdit ? item.professionalSummary.summaryDetails : []
  );
  const [summaryError, setSummaryError] = useState(null);
  const [married, setMarried] = useState(
    isEdit ? item.personalDetails.maritalStatus : ""
  );
  const [genderValue, setGenderValue] = useState(
    isEdit ? item.personalDetails.gender : ""
  );
  const [fields, setFields] = useState(isEdit ? item.skillSet.othersSkillSet: []);

  const handleFieldsChange = (updatedFields) => {
    setFields(updatedFields);
  };

  const navigate = useNavigate();

  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };

  const handleAddSummaryClick = () => {
    const trimmedsummary = summary.trim();

    if (trimmedsummary !== "") {
      if (summaryList.length === 0 && trimmedsummary.length < 100) {
        setSummaryError("The first summary must be at least 100 characters long.");
        return;
      }
      setSummaryList([...summaryList, trimmedsummary]);
      setSummary("");
      setSummaryError(null);
    } else {
      setSummaryError("Please enter professional summary.");
    }
  };

  const handleSummaryKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddSummaryClick();
    }
  };

  const handleEditSummary = (index, editedSummary) => {
    const updatedsummaryList = [...summaryList];
    updatedsummaryList[index] = editedSummary;
    setSummaryList(updatedsummaryList);
  };

  const handleDeleteSummary = (index) => {
    const updatedsummaryList = [...summaryList];
    updatedsummaryList.splice(index, 1);
    setSummaryList(updatedsummaryList);
  };

  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");

  const handleEditInputChange = (event) => {
    setEditText(event.target.value);
  };

  const handleEditSubmit = (index) => {
    handleEditSummary(index, editText);
    setEditIndex(-1);
    setEditText("");
  };
  const handleChangeStatus = (e) => {
    setMarried(e.target.value);
  };

  const handleChangeGender = (e) => {
    setGenderValue(e.target.value);
  };

  const [workExperience, setWorkExperience] = useState(
    isEdit ? item.workExperience : []
  );

  const handleCompanyDataChange = (newCompanyData) => {
    setWorkExperience(newCompanyData);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const submit = async (data) => {
    const form = document.getElementById("myForm");
    const str = [];
    summaryList.forEach((ele) => {
      str.push(ele);
    });

    const personalDetails = {
      personalDetails: {
        empName: form.elements.fullName.value,
        email: form.elements.email.value,
        designation: form.elements.mainDesignation.value,
        mobileNo: form.elements.mobileNo.value,
        address: form.elements.address.value,
        gender: genderValue,
        maritalStatus: married,
        linkedinURL: form.elements.linkedin.value,
      },
      skillSet: {
        technologies: form.elements.technologies.value,
        languages: form.elements.languages.value,
        tools: form.elements.tools.value,
        databaseUsed: form.elements.databaseUsed.value,
        operatingSystems: form.elements.operatingSystems.value,
        ideUsed: form.elements.ideUsed.value,
        webServer: form.elements.webServer.value,
        othersSkillSet: fields,
      },
      professionalSummary: {
        summaryDetails: str,
      },
      educationDetails: {
        degree: form.elements.degree.value,
        university: form.elements.university.value,
        passingYear: form.elements.passingYear.value,
      },
      workExperience,
    };
    const dataJson = JSON.stringify(personalDetails);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    let res;
    if (isEdit) {
      res = await editResumeById(id, config, dataJson);
    } else {
      res = await resumeSave(config, dataJson);
    }

    if (res.code === "200") {
      dispatch(setMultiNotificationVariant("success"));
      const errorArray = [
        {
          propertyValue: "Resume submitted successfully.",
        },
      ];
      dispatch(setMultiNotificationData(errorArray));
      navigate("/resumemakerui/dashboard");
    } else {
      dispatch(setMultiNotificationVariant("error"));
      const errorArray = [
        {
          propertyValue: "Something went wrong",
        },
      ];
      dispatch(setMultiNotificationData(errorArray));
    }
  };

  const inputRefs = useRef([]);

  const handleKeyDown = (e, currentIndex) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentIndex < inputRefs.current.length - 1) {
        inputRefs.current[currentIndex + 1].focus();
      } else if (
        currentIndex === inputRefs.current.length - 1 &&
        summary !== ""
      ) {
        // If last input field and summary is not empty, add the summary
        handleAddSummaryClick();
      } else {
      }
    }
  };

  return (
    <>
      <form id="myForm">
        <div className="containerResume">
          <div className="main">
            <div>
              <h1>Resume</h1>
            </div>

            <div className="detail subContainer">
              <div className="row">

            <Grid container spacing={1}>
            <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  Name
                  id="outlined-required"
                  label="Name"
                  defaultValue={isEdit ? item.personalDetails.empName : ""}
                  placeholder="Enter Your Name"
                  required
                  autoFocus
                  name="fullName"
                  inputRef={(el) => (inputRefs.current[0] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 0)}
                  {...register("fullName")}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  Email
                  id="outlined-required"
                  label="Email"
                  defaultValue={isEdit ? item.personalDetails.email : ""}
                  placeholder="Enter Your Email"
                  required
                  fullWidth
                  name="email"
                  type="email"
                  inputRef={(el) => (inputRefs.current[1] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 1)}
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
            </Grid>
              {/*</div>*/}
              <Grid item xs={12} sm={6} lg={6}>
              {/*<div className="row">*/}
                <TextField
                  Title
                  id="outlined-required"
                  label="Title"
                  defaultValue={isEdit ? item.personalDetails.designation : ""}
                  placeholder="Enter Your Designation"
                  required
                  fullWidth
                  name="mainDesignation"
                  inputRef={(el) => (inputRefs.current[2] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 2)}
                  {...register("mainDesignation")}
                  error={!!errors.mainDesignation}
                  helperText={errors.mainDesignation?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  Enter
                  Mobile
                  No
                  id="outlined-required"
                  label="Mobile No"
                  defaultValue={isEdit ? item.personalDetails.mobileNo : ""}
                  placeholder="Enter Your Mobile Number"
                  required
                  fullWidth
                  name="mobileNo"
                  inputRef={(el) => (inputRefs.current[3] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 3)}
                  type="tel"
                  inputProps={{
                    pattern: "\\d{0,10}", // Regex pattern to allow up to 10 digits
                    maxLength: 10, // Maximum length of 10
                  }}
                  {...register("mobileNo")}
                  error={!!errors.mobileNo}
                  helperText={errors.mobileNo?.message}
                />
              {/*</div>*/}
              </Grid>
              {/*<div className="row" style={{ textAlign: "left" }}>*/}
            <Grid item xs={12} sm={6}  lg={6}>
                <TextField
                  LinkedIn
                  id="outlined-required"
                  label="LinkedIn URL"
                  placeholder="Enter Your Linkedin Profile URL"
                  defaultValue={isEdit ? item.personalDetails.linkedinURL : ""}
                  name="linkedin"
                  fullWidth
                  inputRef={(el) => (inputRefs.current[4] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 4)}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  Address
                  id="outlined-required"
                  label="Address"
                  placeholder="Enter Your Address"
                  defaultValue={isEdit ? item.personalDetails.address : ""}
                  required
                  fullWidth
                  name="address"
                  inputRef={(el) => (inputRefs.current[5] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 5)}
                  {...register("address")}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
            </Grid>
              {/*</div>*/}
            <Grid item xs={12} sm={6} lg={6}>
              {/*<div className="row" style={{ textAlign: "left" }}>*/}
                <FormControl error={!!errors.gender} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Gender *
                  </InputLabel>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "Please select a gender" }}
                    defaultValue={isEdit ? item.personalDetails.gender : ''}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Gender *"
                        value={genderValue}
                        onChange={(e) => {
                          field.onChange(e);
                          setGenderValue(e.target.value);
                        }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                          name: "gender",
                          ref: (el) => (inputRefs.current[6] = el),
                          onKeyDown: (e) => handleKeyDown(e, 6),
                        }}
                      >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.gender && (
                    <FormHelperText>{errors.gender.message}</FormHelperText>
                  )}
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <FormControl error={!!errors.maritalStatus} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Marital Status *
                  </InputLabel>
                  <Controller
                    name="maritalStatus"
                    control={control}
                    rules={{ required: "Please select a Marital Status" }}
                    defaultValue={isEdit ? item.personalDetails.maritalStatus : ''}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Marital Status *"
                        value={married}
                        onChange={(e) => {
                          field.onChange(e);
                          setMarried(e.target.value);
                        }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                          name: "maritalStatus",
                          ref: (el) => (inputRefs.current[7] = el),
                          onKeyDown: (e) => handleKeyDown(e, 7),
                        }}
                      >
                        <MenuItem value={"Married"}>Married</MenuItem>
                        <MenuItem value={"Unmarried"}>Unmarried</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.maritalStatus && (
                    <FormHelperText>
                      {errors.maritalStatus.message}
                    </FormHelperText>
                  )}
                </FormControl>
            </Grid>
            </Grid>
              </div>
            </div>
            <div>
              <h2
                style={{
                  border: "0.1px solid #239ce2",
                  backgroundColor: "rgb(33, 80, 162)",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Professional Summary
              </h2>
            </div>
            <div className="detail subContainer">
              {summaryList.map((summary, index) => (
                <div key={index}>
                  {editIndex === index ? (
                    <div>
                      <TextField
                        type="text"
                        label="Summary"
                        placeholder="Press Enter Key To Add Summary"
                        value={editText}
                        onChange={handleEditInputChange}
                        fullWidth
                        required
                        style={{
                          width: "780px",
                          marginRight: "10px",
                          height: "auto",
                          wordWrap: "unwrap",
                        }}
                      />
                      <Button
                        style={{
                          border: "1px solid blue",
                          height: "55px",
                          width: "40px",
                          minWidth: 0,
                          marginRight: "10px",
                        }}
                        onClick={() => handleEditSubmit(index)}
                      >
                        <IconButton>
                          <SaveIcon color="primary" />
                        </IconButton>
                      </Button>
                      <Button
                        style={{
                          border: "1px solid blue",
                          height: "55px",
                          width: "40px",
                          minWidth: 0,
                        }}
                        onClick={() => setEditIndex(-1)}
                      >
                        <IconButton>
                          <CancelOutlinedIcon color="error" />
                        </IconButton>
                      </Button>
                    </div>
                  ) : (
                    <ui
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <li>
                        {summary}
                        <Button
                          style={{
                            border: "1px solid blue",
                            height: "25px",
                            width: "40px",
                            minWidth: 0,
                            marginRight: "10px",
                          }}
                          onClick={() => {
                            setEditIndex(index);
                            setEditText(summary);
                          }}
                        >
                          <IconButton>
                            <EditOutlinedIcon size="small" color="primary" />
                          </IconButton>
                        </Button>
                        <Button
                          style={{
                            border: "1px solid blue",
                            height: "25px",
                            width: "40px",
                            minWidth: 0,
                          }}
                          onClick={() => handleDeleteSummary(index)}
                        >
                          <IconButton size="small" color="error">
                            <DeleteRoundedIcon />
                          </IconButton>
                        </Button>
                      </li>
                      <div style={{ display: "flex" }}></div>
                    </ui>
                  )}
                </div>
              ))}
              <Grid container spacing={1}>
                <Grid  item xs={9} sm={11} lg={11}>
                <TextField
                  type="text"
                  label="Professional Summary"
                  placeholder="Press Enter Key To Add Summary"
                  value={summary}
                  onChange={handleSummaryChange}
                  onKeyDown={handleSummaryKeyDown}
                  autoFocus
                  required
                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "20px",
                    marginRight: "10px",
                  }}
                />
                </Grid>
                <Grid item xs={1} sm={1} lg={1}>
                <Button
                  style={{ border: "1px solid blue", }}
                  onClick={handleAddSummaryClick}
                >
                  <IconButton>
                    <AddIcon color="primary" />
                  </IconButton>
                </Button>
              </Grid>
                {summaryError && <p style={{ color: "red" }}>{summaryError}</p>}
              </Grid>
            </div>

            <SkillSets fields={fields} setFields={handleFieldsChange} item={item} isEdit={isEdit} />

            <Education
              item={item}
              isEdit={isEdit}
              register={register}
              errors={errors}
              validationSchema={schema}
            />
            <div>
              <h2
                style={{
                  border: "0.1px solid #239ce2",
                  backgroundColor: "rgb(33, 80, 162)",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Work Experience
              </h2>
            </div>

            <Company
              item={item}
              isEdit={isEdit}
              onCompanyDataChange={handleCompanyDataChange}
            />

            {isEdit ? (
              <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "20px",
              }}>
              <Button
                xs={{width : '50%'}}
                style={{
                  width: "25%",
                  padding: "10px",
                  fontSize: "15px",
                  fontWeight: "bolder",
                  margin: "25px auto",
                  backgroundColor: "rgb(33, 80, 162)",
                }}
                variant="contained"
                //onClick={handleSubmit}
                onClick={handleSubmit(submit)}
              >
                Update Data
              </Button>
              </Grid>
            ) : (
              <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "20px",
              }}>

              <Button
                style={{
                  width: "25%",
                  padding: "10px",
                  fontSize: "15px",
                  fontWeight: "bolder",
                  margin: "25px auto",
                  backgroundColor: "rgb(33, 80, 162)",
                }}
                variant="contained"
                onClick={handleSubmit(submit)}
              >
                Submit Data
              </Button>
              </Grid>

            )}
          </div>
        </div>
      </form>
    </>
  );
}
export default Resume;
