
import { axiosMethod } from "./helper";

export const signUp = (user) => {
  return axiosMethod.post('/account/register', user)
    .then((response) => response.data)
    .catch(error => {
    })
}

export const getResumeAllData = (config) => {
  return axiosMethod.get('/resume/getallresume', config)
    .then((response) => response.data)
    .catch(error => {
    })
}

export const getResumeAllDataByEmail = (email,config) => {
  return axiosMethod.get(`/resume/getresumebyemail/${email}`, config)
    .then((response) => response.data)
    .catch(error => {
    })
}

export const getUsersAllData = (config) => {
  return axiosMethod.get('/account/getallusers', config)
    .then((response) => response.data)
    .catch(error => {
    })
}

export const getResumeData = (config) => {
  return axiosMethod.get(`/resume/getresume/${config.id}`, config.config)
   
}


export const downloadResumeById = async (resumeUUID, config) => {
  try {
    const response = await axiosMethod.get(`/resume/downloadresume/${resumeUUID}`, config);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to download resume.');
  }
}

export const deleteUserById = async (userUUID, config) => {
  return await axiosMethod.put(`/account/deletebyid/${userUUID}`, {}, config)

}

export const resumeSave = (config, data) => {
  return axiosMethod.post('/resume/saveresume', data, config)
    .then((response) => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export const checkEmail = (emailId) => {
  return axiosMethod.post(`/account/checkemail/${emailId.email}`, emailId.header)
    .then((response) => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export const editResumeById = async (resumeUUID, config, item) => {
  return await axiosMethod.put(`/resume/updateresume/${resumeUUID}`, item, config)
  .then((response) => response.data)
  .catch(error => {
    console.error(error);
    throw error;
  });
}

export const deleteResumeById = async (resumeUUID, config) => {
  return await axiosMethod.put(`/resume/deleteresume/${resumeUUID}`, {}, config)

}

export const getUserByUUID = (userid) => {
  return axiosMethod.get(`/account/user/${userid.userUUID}`, userid.headers)
  .then((response) => response.data)
  .catch(error => {
    console.error(error);
    throw error;
  });
}

export const getUserByID = (userid) => {
  return axiosMethod.get(`/account/user/${userid.id}`, userid.headers)
  .then((response) => response.data)
  .catch(error => {
    console.error(error);
    throw error;
  });
}


export const resetPassword = async (data,config) => {
  return await axiosMethod.post(`/account/password-reset`,data,config)
  .then((response) => response.data)
  .catch(error => {
    console.error(error);
    throw error;
  });
}

export const updateUser = async (id,data,config) => {
   return await axiosMethod.put(`/account/user/update/${id}`,data,config)
  .then((response) => response.data)
  .catch(error => {
    console.error(error);
    throw error;
  });
}