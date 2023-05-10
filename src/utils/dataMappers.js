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
    obj["candidate"] = ele.candidateName;
    obj["interviewType"] = ele.interviewType;
    obj["interviewRound"] = ele.interviewRound;
    obj["interviewer"] = ele.interviewerName;
    obj["status"] = ele.result;
    obj["submittedDate"] = format(parseISO(ele.createdDate),'dd/MM/yyyy');
    obj["formId"] = ele.formId;
    return obj;
  });
  return temparray;
};

