import { axiosMethod } from "./helper";

export const signUp = (user) => {
    return axiosMethod.post('/thor/account/register', user)
    .then((response) => response.data)
    .catch(error => {
             console.log(error);
     })
}

export const getResumeAllData = (config) => {
    return axiosMethod.get('/thor/resume/getallresume',config)
    .then((response) => response.data)
    .catch(error => {
             console.log(error);
     })
}

export const getResumeData = (config, id) => {
    return axiosMethod.get(`/thor/resume/getresume/${id}`,config)
    .then((response) => response.data)
    .catch(error => {
             console.log(error);
     })
}