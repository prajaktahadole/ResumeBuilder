import { axiosMethod } from "./helper";

export const findSkills = (config) => {
  return axiosMethod
    .get("/skill/findall", config)
    .then((response) => response.data)
    .catch((err) => { });
};

export const findSoftSkills = (config) => {
  return axiosMethod
    .get("/skill/softskill", config)
    .then((response) => response.data)
    .catch((err) => { });
};

export const getFeedbackAllData = (config) => {
  return axiosMethod.get('/feedback/allformsdata', config)
    .then((response) => response.data)
    .catch(error => {
    })
}

export const getFeedbackAllDataByEmail = (email,config) => {
  return axiosMethod.get(`/feedback/allformdatabyemail/${email}`, config)
    .then((response) => response.data)
    .catch(error => {
    })
}

// export const submitForm = (config) => {
//   return axiosMethod
//     .post("/form", config)
//     .then((response) => {})
//     .catch((err) => {});
// };

export const deleteFeedbackFormById = async (formId, config) => {
  return await axiosMethod.put(`/feedback/deletebyid/${formId}`, {}, config)

}

export const getFeedbackForm = (data) => {
  return axiosMethod.get(`/feedback/review/${data.id}`,data.config)
  .then((response) => response.data)
  .catch(error => {
   })
}