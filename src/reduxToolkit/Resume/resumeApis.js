import { ajaxHandler } from "../../services/ajaxHandler";

export const getAllResume = async (payload) => {
  const response = await ajaxHandler("get", `resume/getallresume`);
  return response;
};
