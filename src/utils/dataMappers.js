import { format, parseISO } from "date-fns";

export const resumedatamapper = (data) => {
  let temparray = data.map((ele) => {
    let obj = {};
    obj["name"] = ele.personalDetails.empName;
    obj["resumeUUID"] = ele.id;
    obj["email"] = ele.personalDetails.email;
   // obj["designation"] = ele.workExperience[0].jobRole;
    obj["designation"] = ele.personalDetails.designation;
    obj["skills"] = ele.skillSet.languages;
    return obj;
  });
  return temparray;
};

export const usersdatamapper = (userData) => {
  let temparray = userData.map((ele) => {
    let obj = {};
    obj["name"] = ele.fullName;
    obj["userUUID"] = ele.userId;
    obj["email"] = ele.email;
    obj["role"] = ele.roles && ele.roles.length > 0 ? ele.roles[0].name : "";
    obj["status"] = ele.activeStatus==="Y" ? "Active" : "New" ;
    return obj;
  });
  return temparray;
};

export const feedbackdatamapper = (userData) => {
  let temparray = userData.map((ele) => {
    let obj = {};
    obj["candidateId"] = ele.candidateId;
    obj["candidate"] = ele.candidateName;
    obj["interviewType"] = ele.interviewType;
    obj["interviewRound"] = ele.interviewRound === 'L1' ? "Level 1" : ele.interviewRound === 'L2' ? "Level 2" : "Level 3" ;
    obj["interviewer"] = ele.interviewerName;
    obj["status"] = ele.result;
    obj["submittedDate"] = format(parseISO(ele.createdDate),'dd/MM/yyyy');
    obj["formId"] = ele.formId;
    return obj;
  });
  return temparray;
};

// export const feedbackKpidatamapper = (inData) => {
//   let temparray = inData.map((ele) => {
//     let obj = {};
//     console.log("ele-->",ele)
//     obj["interviewer"] = ele.interviewerName;
//     obj["internalSe"] = ele.interviewType === "Humancloud_Internal" ? ele.Selected : 0;
//     obj["convergeSe"] = ele.interviewType === "The_Converge" ? ele.Selected : 0;
//     obj["internalRe"] = ele.interviewType === "Humancloud_Internal" ? ele.Rejected : 0;
//     obj["convergeRe"] = ele.interviewType === "The_Converge" ? ele.Rejected : 0;
//     obj["internalHo"] = ele.interviewType === "Humancloud_Internal" ? ele.Hold : 0;
//     obj["convergeHo"] = ele.interviewType === "The_Converge" ? ele.Hold : 0;
//     obj["internalTo"] = ele.interviewType === "Humancloud_Internal" ? ele.Total : 0;
//     obj["convergeTo"] = ele.interviewType === "The_Converge" ? ele.Total : 0;
//     // obj["rejected"] = ele.Rejected;
//     // obj["hold"] = ele.Hold;
//     // obj["total"] = ele.Total;
//     return obj;
//   });
//
//   return temparray;
// };

export const feedbackKpidatamapper = (inData) => {
  let temparray = [];

  inData.forEach((ele) => {
    let existingObj = temparray.find(obj => obj.interviewer === ele.interviewerName);

    if (existingObj) {
      // Object for the interviewer already exists, update the values
      if (ele.interviewType === "Humancloud_Internal") {
        existingObj.internalSe = ele.Selected;
        existingObj.internalRe = ele.Rejected;
        existingObj.internalHo = ele.Hold;
        existingObj.internalTo = ele.Total;
      } else if (ele.interviewType === "The_Converge") {
        existingObj.convergeSe = ele.Selected;
        existingObj.convergeRe = ele.Rejected;
        existingObj.convergeHo = ele.Hold;
        existingObj.convergeTo = ele.Total;
      }
    } else {
      // Object for the interviewer doesn't exist, create a new object
      let newObj = {
        interviewer: ele.interviewerName,
        internalSe: ele.interviewType === "Humancloud_Internal" ? ele.Selected : 0,
        convergeSe: ele.interviewType === "The_Converge" ? ele.Selected : 0,
        internalRe: ele.interviewType === "Humancloud_Internal" ? ele.Rejected : 0,
        convergeRe: ele.interviewType === "The_Converge" ? ele.Rejected : 0,
        internalHo: ele.interviewType === "Humancloud_Internal" ? ele.Hold : 0,
        convergeHo: ele.interviewType === "The_Converge" ? ele.Hold : 0,
        internalTo: ele.interviewType === "Humancloud_Internal" ? ele.Total : 0,
        convergeTo: ele.interviewType === "The_Converge" ? ele.Total : 0
      };

      temparray.push(newObj);
    }
  });
  return temparray;
};

export const putFeedBackDataMapper = (
    data,
    softSkillApi,
    currentSoftSkillList,
    techNameId,
    currentTechnologyList,
    techId,
    selectedMultipleLang,
    feedbackFormData
) => {
  let tempData = JSON.parse(JSON.stringify(data));
  tempData.softSkillRatings = softSkillApi.map((ele) => {
    let objRating = { ...ele };
    objRating["rating"] = currentSoftSkillList[ele.skillName]
        ? parseInt(currentSoftSkillList[ele.skillName])
        : 0;

    return objRating;
  });
  let techListWithTechName = {};
  Object.values(currentTechnologyList).forEach((techno) => {
    let tempbTechObj = {};
    tempbTechObj = {
      rating: techno.rating ? parseInt(techno.rating) : 0,
      skillName: techno.skillName,
    };
    if (techId[techno.skillName]) {
      tempbTechObj["skillId"] = techId[techno.skillName];
    }
    if (techListWithTechName[techno.techName]) {
      techListWithTechName[techno.techName] = [
        ...techListWithTechName[techno.techName],
        tempbTechObj,
      ];
    } else {
      techListWithTechName[techno.techName] = [tempbTechObj];
    }
  });

  let tempTechonologyFull = selectedMultipleLang.map((lang) => {
    let tempTechFullObj = {
      techName: lang,
      techSkills: techListWithTechName[lang],
    };
    if (techNameId[lang]) {
      tempTechFullObj["techId"] = techNameId[lang];
    }
    return tempTechFullObj;
  });
  tempData.technologyRating = tempTechonologyFull;
  tempData["createdBy"] = feedbackFormData.createdBy;
  tempData["interviewerName"] = feedbackFormData.interviewerName;
  tempData["createdDate"] = feedbackFormData.createdDate;
  delete tempData["improvementAreas"];
  return tempData;
};




