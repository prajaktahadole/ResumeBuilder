import { axiosMethod } from "./helper";

export const getNotificationAllData =  (email,config) => {
    return  axiosMethod.get(`/notification/getnotificationbyemail/${email}`, config)
      .then((response) => response.data)
      .catch(error => {
      })
  }
  export const updateNotificationStatus = async (notificationId, readStatus ,config) => {
    return await axiosMethod.put(`/notification/updatereadstatus/${notificationId}`,null, {
        ...config,
        params: {
            readStatus: readStatus
        },
      })
  }

  export const updateMarkAsReadAll = async (email, config) => {
    return await axiosMethod.put(`/notification/readall/${email}`,"",config)
        .then((response) => response.data)
        .catch(error => { })
  }