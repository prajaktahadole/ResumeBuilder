import React, { useEffect, useState } from "react";
import {
  REfindSkills,
  REfindSoftSkills,
  REgetFeedbackForm,
} from "../../services/feedback-service";
import { useDispatch, useSelector } from "react-redux";
import {
  setGetFeedbackform,
  setGetSoftskillApi,
  setGetTechnologyApi,
  setNewLangToSkill,
  setSoftSkillList,
  setTechId,
  setTechNameId,
  setTechnologyList,
  setlanguageListArray,
  setlanguagetoSkill,
  setselectedMultipleLang,
} from "../../reduxToolkit/Resume/resumeSlice";
import Spinner from "../../utils/Spinner";
import FeedbackPage from "./FeedbackPage";

const FeedbackformWrapper = ({ id }) => {
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [feedbackResponse, setFeedbackResponse] = useState(false);
  const [softSkills, setSoftSkills] = useState(false);
  const [technologySkills, setTechnologySkills] = useState(false);

  const {
    feedbackFormData,
    technologyApi,
    currentSoftSkillList,
    softSkillApi,
    selectedMultipleLang,
    languageListArray,
  } = useSelector((state) => state.resume);

  useEffect(() => {
    getFeedbackData();
    getSoftSkillApi();
    getTechnologyApi();
  }, []);

  useEffect(() => {
    if (feedbackResponse && softSkills && technologySkills) {
      mapRatingData();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [feedbackResponse, technologySkills, softSkills]);

  const mapRatingData = () => {
    let obj = {};
    let techName = [];
    let tempSelectedObj = [];
    if (softSkillApi && softSkillApi.length) {
      softSkillApi.forEach((ele) => {
        obj[ele.skillName] = 0;
      });
    }
    dispatch(setGetSoftskillApi(feedbackFormData.softSkillRatings));
    if (
      feedbackFormData.softSkillRatings &&
      feedbackFormData.softSkillRatings.length
    ) {
      Array.isArray(feedbackFormData.softSkillRatings) &&
        feedbackFormData.softSkillRatings.map((softSkills) => {
          obj[softSkills.skillName] = softSkills.rating;
          // obj["softSkillId"] = softSkills.softSkillId;
        });
      dispatch(setSoftSkillList(obj));
    }
    obj = {};
    let langToSkill = {};
    //new
    let techNameIDsTemp = {};
    let tempNewLangToSkill = {};

    technologyApi.forEach((ele) => {
      // techNameIDsTemp[ele.techName] = ele.techId;
      let temparray = ele.techSkills.map((item) => {
        let tempObj = { ...item };
        tempObj["rating"] = 0;
        tempObj["techName"] = ele.techName;
        // delete tempObj["techSkillId"];
        return tempObj;
      });
      tempNewLangToSkill[ele.techName] = temparray;
    });
    let techIdTemp = {};
    if (
      feedbackFormData.technologyRating &&
      feedbackFormData.technologyRating.length
    ) {
      feedbackFormData.technologyRating.forEach((ele) => {
        let tempArray = [...tempNewLangToSkill[ele.techName]];
        let tempAPIData = {};
        // if (techNameIDsTemp[ele.techName]) {
        //   techNameIDsTemp[ele.techName] = ele.techId;
        // }
        techNameIDsTemp[ele.techName] = ele.techId;

        ele.techSkills.forEach((item) => {
          tempAPIData[item.skillName] = item.rating;
          techIdTemp[item.skillName] = item.skillId;
        });
        tempArray = tempArray.map((nom) => {
          let tempSkillObj = { ...nom };
          tempSkillObj.rating = tempAPIData[tempSkillObj.skillName];
          return tempSkillObj;
        });
        tempNewLangToSkill[ele.techName] = tempArray;
      });
    }
    dispatch(setTechNameId(techNameIDsTemp));

    dispatch(setTechId(techIdTemp));
    dispatch(setNewLangToSkill(tempNewLangToSkill));

    ///close new
    technologyApi.map((item) => {
      langToSkill[item.techName] = item.techSkills.map((ele) => {
        return ele.skillName;
      });
      item.techSkills.map((ele) => {
        obj[ele.skillName] = {
          rating: 0,
        };
      });
    });
    dispatch(setlanguagetoSkill(langToSkill));
    if (
      feedbackFormData.technologyRating &&
      feedbackFormData.technologyRating.length
    ) {
      feedbackFormData.technologyRating.forEach((ele) => {
        techName = [...techName, ...ele.techSkills];
        tempSelectedObj.push(ele.techName);
        // dispatch(setselectedMultipleLang(ele.techName));
      });
    }

    dispatch(setselectedMultipleLang(tempSelectedObj));
    techName.length &&
      techName.map((item) => {
        obj[item.skillName] = {
          rating: item.rating,
        };
      });

    dispatch(setTechnologyList(obj));
  };

  const getFeedbackData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await REgetFeedbackForm({ id, config });
    if (response.status === 200) {
      dispatch(setGetFeedbackform(response.data));
      setFeedbackResponse(true);
    }
  };
  const getTechnologyApi = async () => {
    const res = await REfindSkills({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      dispatch(
        setlanguageListArray(
          res.data.map((ele) => {
            return ele.techName;
          })
        )
      );
      dispatch(setGetTechnologyApi(res.data));
      setTechnologySkills(true);
    }
  };
  const getSoftSkillApi = async () => {
    const resp = await REfindSoftSkills({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (resp.status === 200) {
      dispatch(setGetSoftskillApi(resp.data));
      setSoftSkills(true);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <FeedbackPage feedbackform={feedbackFormData} isFeedbackEdit={true} />
      )}
    </>
  );
};
export default FeedbackformWrapper;
