import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
export const ajaxHandler = async (method, url, request, header) => {
  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use((config) => {
    config.method = method;
    config.url = `${baseUrl}${url}`;
    config.data = request;
    if (header !== undefined && header !== null && header.length > 0) {
      config.headers = header;
    }
    if (localStorage.getItem("token")) {
      config.headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
    }
    return config;
  });

  try {
    const res = await axiosInstance();
    return res;
  } catch (err) {
    return err.response;
  }
};
