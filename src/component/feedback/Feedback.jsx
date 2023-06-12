import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import NestedGrid from "./NestedGrid.jsx";
import { findSkills, findSoftSkills } from "../../services/feedback-service.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BASE_URL } from "../../services/helper.js";
import axios from "axios";
import AutoCompleteCustome from "./AutoCompleteCustome.jsx";
import ImageUploadPreviewComponent from "./ImageUploadPreviewComponent.jsx";
import { useNavigate } from "react-router-dom";
import Spinner from "../../utils/Spinner.js";
import {
  setMultiNotificationData,
  setMultiNotificationVariant,
} from "../../reduxToolkit/Notification/notificationSlice";
import { useDispatch } from "react-redux";

const schema = yup.object().shape({
  // technologyRating: yup
  //   .array()
  //   .of(
  //     yup.object().shape({
  //       techName: yup.string().required(),
  //       techSkills: yup
  //         .array()
  //         .of(
  //           yup.object().shape({
  //             skillName: yup.string().required(),
  //             rating: yup.number().integer().max(5).required("Need to Rate 0-5")
  //           })
  //         )
  //     })
  //   )
  //   .required('At least one technology rating is required'),
  candidateName: yup.string().required('Candidate name is required')
  .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Invalid Candidate name')
  .min(2, 'Full name must be at least 2 characters')
  .max(50, 'Full name must not exceed 50 characters'),
  candidateId: yup.string().matches(/^(?!\s*$).+/, 'Only spaces are not allowed.').required("Candidate id is required"),
  experience: yup.string().required("Total experience is required"),
  interviewRound: yup.string().required("Please select interview round"),
  interviewType: yup.string().required("Please select interview type"),
  result: yup.string().required("Need to mention result"),
  goodAt: yup.string().matches(/^(?!\s*$).+/, 'Only spaces are not allowed.').required("Need to specify good at technologies"),
  improvmentAreas: yup.string().matches(/^(?!\s*$).+/, 'Only spaces are not allowed.').required("Need to specify improvement areas"),
  comments: yup.string().matches(/^(?!\s*$).+/, 'Only spaces are not allowed.').required("Remarks are compulsory"),
  softSkillRatings: yup
    .array()
    .of(
      yup.object().shape({
        skillName: yup.string().required(),
        rating: yup.number().integer().min(0).max(5).required(),
      })
    )
    .required("At least one soft skill rating is required"),
  interviewDate: yup
    .string()
    .required('Interview date is compulsory'),
});

const Feedback = ({ feedbackform, id, isFeedbackEdit }) => {
  const [technoList, setTechnoList] = useState([]);
  const [softSkill, setSoftSkill] = useState([]);
  const [totalExperience, setTotalExperience] = useState(
    isFeedbackEdit ? feedbackform.experience : ""
  );
  const [interviewType, setInterviewType] = useState(
    isFeedbackEdit ? feedbackform.interviewType : ""
  );
  const [interviewRound, setInterviewRound] = useState(
    isFeedbackEdit ? feedbackform.interviewRound : ""
  );
  const [result, setResult] = useState(
    isFeedbackEdit ? feedbackform.result : ""
  );
  const [softSkillRatings, setSoftSkillRatings] = useState(
    isFeedbackEdit
      ? feedbackform.softSkillRatings.map((ele) => {
          return { val: ele };
        })
      : []
  );
  const [technologyRating, setTechnologyRating] = useState(
    isFeedbackEdit
      ? feedbackform.technologyRating.map((ele) => {
          return { val: ele };
        })
      : []
  );
  const [files, setFiles] = useState(
    isFeedbackEdit ? feedbackform.attachments : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFiles = (files) => {
    setFiles(files);
  };

  const handleSoftSkillRatingsChange = (ratings) => {
    const updateRating = ratings.map((rating) => {
      delete rating.softSkillId;
      return rating;
    });
    setSoftSkillRatings(updateRating);
  };

  const handleTechRatingsChange = (ratings) => {
    const updateTechRating = ratings.map((rating) => {
      delete rating.techId;
      delete rating.isSelected;
      rating.techSkills.map((skill) => {
        delete skill.techSkillId;
        return skill;
      });
      return rating;
    });

    setTechnologyRating(updateTechRating);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      softSkillRatings: [],
      technologyRating: [],
    },
  });

  const submitFormdata = (data) => {
    //if (files.length !== 0) {
      setIsLoading(true);
      const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const feedbackForm = JSON.stringify(data);
      let formData = new FormData();

      formData.append("form", feedbackForm);
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          formData.append("file", files[i]);
        }
      }
    
      axiosInstance
      .post("/feedback/form", formData)
      .then((res) => {
        if (res?.status === 200) {
          dispatch(setMultiNotificationVariant("success"));
          const errorArray = [
            {
              propertyValue: "Feedback submitted successfully.",
            },
          ];
          dispatch(setMultiNotificationData(errorArray));
          navigate("/resumemakerui/feedback");
        } else {
          dispatch(setMultiNotificationVariant("error"));
          const errorArray = [
            {
              propertyValue: "Something went wrong",
            },
          ];
          dispatch(setMultiNotificationData(errorArray));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  // } else {
  //   dispatch(setMultiNotificationVariant("error"));
  //   const errorArray = [
  //     {
  //       propertyValue: "Please Upload atleast one Image",
  //     },
  //   ];
  //   dispatch(setMultiNotificationData(errorArray));
  // }
  
  };

  useEffect(() => {
    async function fetchdata() {
      const res = await findSkills({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setTechnoList(res);
      const resp = await findSoftSkills({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setSoftSkill(resp);
    }
    fetchdata();
  }, []);

  const [date, setDate] = useState("");
  const currentDate = new Date().toISOString().split('T')[0];
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  useEffect(() => {
    setDate(currentDate);
  }, [currentDate]);

  return (
    <div>
      <React.Fragment>
        {isLoading ? (
          <Spinner />
        ) : (
          <form>
            <Card
              style={{
                maxWidth: "95%",
                margin: "10px auto",
                padding: "25px",
                boxShadow:
                  "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                background: "rgb(245,245,245)",
              }}
            >
              <Typography
                variant="h5"
                style={{
                  maxWidth: "95%",
                  margin: "10px  auto",
                  padding: "5px 5x",
                }}
              >
                Feedback Form
              </Typography>
              <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid xs={12} sm={6} lg={6} item>
                      <TextField
                        label="Candidate Id"
                        placeholder="Candidate Id"
                        variant="outlined"
                        name="candidateId"
                        {...register("candidateId")}
                        fullWidth
                        required
                        defaultValue={
                          isFeedbackEdit ? feedbackform.candidateId : ""
                        }
                        error={!!errors.candidateId}
                      ></TextField>
                      {errors.candidateId && (
                        <p style={{ fontSize: 14, color: "red" }}>
                          {errors.candidateId?.message}
                        </p>
                      )}
                    </Grid>
                    <Grid xs={12} sm={6} lg={6} item>
                      <TextField
                        label="Candidate Name"
                        placeholder="FirstName LastName"
                        variant="outlined"
                        name="candidateName"
                        {...register("candidateName")}
                        fullWidth
                        required
                        defaultValue={
                          isFeedbackEdit ? feedbackform.candidateName : ""
                        }
                        error={!!errors.candidateName}
                      ></TextField>
                      {errors.candidateName && (
                        <p style={{ fontSize: 14, color: "red" }}>
                          {errors.candidateName?.message}
                        </p>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              {/*"interviewType interview round"*/}
              <Card style={{ maxWidth: "95%", margin: "10px auto" }}>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid xs={12} sm={4} lg={4} item>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Interview Type *
                        </InputLabel>
                        <Select
                          value={interviewType}
                          label="Interview Type"
                          name="interviewType"
                          {...register("interviewType")}
                          onChange={(e) => setInterviewType(e.target.value)}
                          required
                        >
                          <MenuItem value={"The_Converge"}>
                            The Converge
                          </MenuItem>
                          <MenuItem value={"Humancloud_Internal"}>
                            Humancloud Internal
                          </MenuItem>
                        </Select>
                        {!interviewType && errors.interviewType && (
                          <p style={{ fontSize: 14, color: "red" }}>
                            {errors.interviewType?.message}
                          </p>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={4} lg={4} item>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Interview Round *
                        </InputLabel>
                        <Select
                          value={interviewRound}
                          label="Interview Round"
                          name="interviewRound"
                          {...register("interviewRound")}
                          onChange={(e) => setInterviewRound(e.target.value)}
                          required
                        >
                          <MenuItem value={"L1"}>Level 1</MenuItem>
                          <MenuItem value={"L2"}>Level 2</MenuItem>
                          <MenuItem value={"L3"}>Level 3</MenuItem>
                        </Select>
                        {!interviewRound && errors.interviewRound && (
                          <p style={{ fontSize: 14, color: "red" }}>
                            {errors.interviewRound?.message}
                          </p>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={4} lg={4} item>
                      <FormControl fullWidth>
                        <TextField
                          style={{ width: "100%" }}
                          type="date"
                          id="outlined-required"
                          label="Interview Date"
                          name="interviewDate"
                          {...register("interviewDate")}
                          defaultValue={currentDate}
                          onChange={handleDateChange}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            max: currentDate,
                            required: true,
                          }}
                        />
                        {errors.interviewDate && (
                          <p style={{ fontSize: 14, color: "red" }}>
                            {errors.interviewDate?.message}
                          </p>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
          
              <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{
                      maxWidth: "95%",
                      padding: "5px",
                      textAlign: "left",
                    }}
                  >
                    Technical Skills
                  </Typography>

                  <Grid container spacing={1}>
                    <Grid xs={12} sm={6} lg={6} item>
                      <AutoCompleteCustome
                        setTechnoList={setTechnoList}
                        technoList={technoList}
                      />{" "}
                    </Grid>
                    <Grid xs={12} sm={6} lg={6} item>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Total Experience *
                        </InputLabel>
                        <Select
                          value={totalExperience}
                          label="Total Experience"
                          name="experience"
                          {...register("experience")}
                          onChange={(e) => setTotalExperience(e.target.value)}
                          required
                        >
                          <MenuItem value={"0-2"}>0-2</MenuItem>
                          <MenuItem value={"2-5"}>2-5</MenuItem>
                          <MenuItem value={"5-8"}>5-8</MenuItem>
                          <MenuItem value={"8-10"}>8-10</MenuItem>
                          <MenuItem value={"10-12"}>10-12</MenuItem>
                          <MenuItem value={"12-15"}>12-15</MenuItem>
                        </Select>
                        {!totalExperience && errors.experience && (
                          <p style={{ fontSize: 14, color: "red" }}>
                            {errors.experience?.message}
                          </p>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid mt="10px" item>
                    {
                      <NestedGrid
                        setValue={setValue}
                        name="technologyRating"
                        technologyList={technoList}
                        setTechnologyList={setTechnoList}
                        {...register("technologyRating")}
                        handleTechRatingsChange={handleTechRatingsChange}
                      />
                    }
                  
                  </Grid>
                </CardContent>
              </Card>
              {/* Soft Skills*/}
              <Card
                style={{
                  maxWidth: "95%",
                  margin: "20px auto",
                  padding: "20px 5x",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{
                      maxWidth: "95%",
                      marginBottom: "5px",
                      padding: "5px",
                      textAlign: "left",
                    }}
                  >
                    Soft Skills
                  </Typography>

                  <Grid container spacing={1}>
                    <NestedGrid
                      setValue={setValue}
                      name="softSkillRatings"
                      technologyList={softSkill}
                      isSoftskill={true}
                      setTechnologyList={setSoftSkill}
                      {...register("softSkillRatings")}
                      handleSoftSkillRatingsChange={
                        handleSoftSkillRatingsChange
                      }
                    />
                  </Grid>
                </CardContent>
              </Card>
              <Card style={{ maxWidth: "95%", margin: "10px auto" }}>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid xs={12} sm={6} lg={4} item>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Interview Result *
                        </InputLabel>
                        <Select
                          value={result}
                          label="Interview Result"
                          name="result"
                          {...register("result")}
                          onChange={(e) => setResult(e.target.value)}
                          required
                        >
                          <MenuItem value={"SELECTED"}>Selected</MenuItem>
                          <MenuItem value={"REJECTED"}>Rejected</MenuItem>
                          <MenuItem value={"HOLD"}>Hold</MenuItem>
                        </Select>
                        {!result && errors.result && (
                          <p style={{ fontSize: 14, color: "red" }}>
                            {errors.result?.message}
                          </p>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid xs={12} sm={12} lg={12} item>
                      <TextField
                        label="Good At"
                        name="goodAt"
                        {...register("goodAt")}
                        multiline
                        placeholder="Type Good At"
                        variant="outlined"
                        rows={2}
                        fullWidth
                        required
                        defaultValue={isFeedbackEdit ? feedbackform.goodAt : ""}
                        error={!!errors.goodAt}
                      ></TextField>
                      {errors.goodAt && (
                        <p style={{ fontSize: 14, color: "red" }}>
                          {errors.goodAt?.message}
                        </p>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid xs={12} sm={12} lg={12} item>
                      <TextField
                        label="Improvement Areas"
                        name="improvmentAreas"
                        {...register("improvmentAreas")}
                        multiline
                        placeholder="Type improvement Areas"
                        variant="outlined"
                        rows={2}
                        fullWidth
                        required
                        defaultValue={
                          isFeedbackEdit ? feedbackform.improvmentAreas : ""
                        }
                        error={!!errors.improvmentAreas}
                      ></TextField>
                      {errors.improvmentAreas && (
                        <p style={{ fontSize: 14, color: "red" }}>
                          {errors.improvmentAreas?.message}
                        </p>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid xs={12} sm={12} lg={12} item>
                      <TextField
                        label="Remark"
                        name="comments"
                        {...register("comments")}
                        multiline
                        placeholder="Type your message"
                        variant="outlined"
                        rows={2}
                        fullWidth
                        required
                        error={!!errors.comments}
                        defaultValue={
                          isFeedbackEdit ? feedbackform.comments : ""
                        }
                      ></TextField>
                      {errors.comments && (
                        <p style={{ fontSize: 14, color: "red" }}>
                          {errors.comments?.message}
                        </p>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid xs={12} sm={12} lg={12} item>
                      <ImageUploadPreviewComponent handleFiles={handleFiles} />
                       {/* {files.length === 0 ? (
                        <p
                          style={{
                            fontSize: 12,
                            color: "red",
                            marginTop: "10px",
                          }}
                        >
                          Note: Please upload at least one screenshot in .png or
                          .jpeg format.
                        </p>
                      ) : null} */}
                      <p
                        style={{
                          fontSize: 12,
                          color: "black",
                          marginTop: "10px",
                        }}
                      >
                         Note: Please upload images in PNG and JPEG format only and Multiple images can be added with a size limit of
                        5 MB for all images.
                      </p>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid xs={12} sm={12} lg={12} item>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        id="submit"
                        style={{ backgroundColor: "rgb(33, 80, 162)" }}
                        onClick={handleSubmit(submitFormdata)}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Card>
          </form>
        )}
      </React.Fragment>
    </div>
  );
};

export default Feedback;
