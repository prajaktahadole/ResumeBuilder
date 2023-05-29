import React, { useEffect, useState } from "react";
import Spinner from "../../utils/Spinner";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BASE_URL } from "../../services/helper.js";

import CandidateIDnName from "./CandidateID";
import InterviewRoundnType from "./InterviewRoundnType";
import TechnicalSkillsnExp from "./TechnicalSkillsnExp";
import SoftSkills from "./SoftSkills";
import InterviewResult from "./InterviewResult";
import GoodAt from "./GoodAt";
import ImprovementAreas from "./ImprovementAreas";
import Remarks from "./Remarks";
import UploadImage from "./UploadImage";
import Submit from "./Submit";
import axios from "axios";
import {
  setMultiNotificationData,
  setMultiNotificationVariant,
} from "../../reduxToolkit/Notification/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { putFeedBackDataMapper } from "../../utils/dataMappers";

const FeedbackPage = ({ feedbackform, isFeedbackEdit = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    currentSoftSkillList,
    newLangToSkill,
    techNameId,
    softSkillApi,
    currentTechnologyList,
    selectedMultipleLang,
    techId,
    feedbackFormData,
  } = useSelector((state) => state.resume);
  const [interviewType, setInterviewType] = useState(
    isFeedbackEdit ? feedbackform.interviewType : ""
  );
  const [interviewRound, setInterviewRound] = useState(
    isFeedbackEdit ? feedbackform.interviewRound : ""
  );
  const [totalExperience, setTotalExperience] = useState(
    isFeedbackEdit ? feedbackform.experience : ""
  );
  const [result, setResult] = useState(
    isFeedbackEdit ? feedbackform.result : ""
  );
  const [files, setFiles] = useState(
    isFeedbackEdit ? feedbackform.attachments : []
  );

  const handleFiles = (files) => {
    setFiles(files);
  };

  const schema = yup.object().shape({
    candidateName: yup.string().required("Candidate name is required"),
    candidateId: yup.string().required("Candidate id is required"),
    experience: yup.string().required("Total experience is required"),
    interviewRound: yup.string().required("Please select interview round"),
    interviewType: yup.string().required("Please select interview type"),
    result: yup
      .string()
      .required("Need to specify the result of the candidate"),
    goodAt: yup
      .string()
      .required("Need to specify some technologies candidate good at"),
    improvementAreas: yup
      .string()
      .required(
        "Need to specify improvement areas, candidate needs to work on"
      ),
    comments: yup.string().required("Remarks are mandatory"),
  });

  const handleChange = () => {};

  const isError = () => {
    console.log(errors);
  };

  const submitFormdata = (data) => {
    setIsLoading(true);
    let variableTech = [];
    let variableSoft = [];
    if (selectedMultipleLang && selectedMultipleLang.length) {
      selectedMultipleLang.map((item) => {
        let obj = {};
        obj["techName"] = item;
        obj["techSkills"] = newLangToSkill[item];
        variableTech.push(obj);
      });
    }
    if (currentSoftSkillList && Object.keys(currentSoftSkillList).length) {
      Object.keys(currentSoftSkillList).map((item, idx) => {
        let obj = {};
        obj["skillName"] = item;
        obj["rating"] = currentSoftSkillList[item];
        variableSoft.push(obj);
      });
    }
    setValue("technologyRating", variableTech);
    setValue("softSkillRatings", variableSoft);

    const axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    const feedbackForm = JSON.stringify(data);
    console.log(feedbackForm, "feedbackForm", typeof feedbackForm);
    let formData = new FormData();

    formData.append("form", JSON.stringify(feedbackForm));
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }
    }

    axiosInstance
      .put("/feedback/editform/`${formId}`", formData, feedbackform.formId)
      .then((res) => {
        if (res?.status === 200) {
          dispatch(setMultiNotificationVariant("success"));
          const errorArray = [
            {
              propertyValue: "Feedback updated successfully.",
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
  };

  useEffect(() => {
    if (isFeedbackEdit) {
      setValue("improvementAreas", feedbackform.improvmentAreas);
    }
  }, []);

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
                  <CandidateIDnName
                    isFeedbackEdit={isFeedbackEdit}
                    feedbackform={feedbackform}
                    errors={errors}
                    register={register}
                  />
                </CardContent>
              </Card>
              <Card style={{ maxWidth: "95%", margin: "10px auto" }}>
                <CardContent>
                  <InterviewRoundnType
                    setInterviewType={setInterviewType}
                    interviewType={interviewType}
                    setInterviewRound={setInterviewRound}
                    interviewRound={interviewRound}
                    errors={errors}
                    register={register}
                  />
                </CardContent>
              </Card>
              <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
                <CardContent>
                  <TechnicalSkillsnExp
                    handleChange={handleChange}
                    setTotalExperience={setTotalExperience}
                    totalExperience={totalExperience}
                    errors={errors}
                    register={register}
                  />
                </CardContent>
              </Card>
              <Card
                style={{
                  maxWidth: "95%",
                  margin: "20px auto",
                  padding: "20px 5px",
                }}
              >
                <CardContent>
                  <SoftSkills />
                </CardContent>
              </Card>
              <Card style={{ maxWidth: "95%", margin: "10px auto" }}>
                <CardContent>
                  <InterviewResult
                    result={result}
                    setResult={setResult}
                    errors={errors}
                    register={register}
                  />
                </CardContent>
              </Card>
              <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
                <CardContent>
                  <GoodAt
                    isFeedbackEdit={isFeedbackEdit}
                    feedbackform={feedbackform}
                    errors={errors}
                    register={register}
                  />
                </CardContent>
              </Card>
              <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
                <CardContent>
                  <ImprovementAreas
                    isFeedbackEdit={isFeedbackEdit}
                    feedbackform={feedbackform}
                    errors={errors}
                    register={register}
                  />
                </CardContent>
              </Card>
              <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
                <CardContent>
                  <Remarks
                    isFeedbackEdit={isFeedbackEdit}
                    feedbackform={feedbackform}
                    errors={errors}
                    register={register}
                  />
                </CardContent>
              </Card>
              <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
                <CardContent>
                  <UploadImage files={files} handleFiles={handleFiles} />
                </CardContent>
              </Card>
              <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
                <CardContent>
                  {/* <Submit
                    handleSubmit={handleSubmit}
                    submitFormdata={submitFormdata}
                  /> */}
                  <Grid container spacing={1}>
                    <Grid xs={12} item>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        id="submit"
                        style={{ backgroundColor: "rgb(33, 80, 162)" }}
                        onClick={handleSubmit(submitFormdata, isError)}
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
export default FeedbackPage;
