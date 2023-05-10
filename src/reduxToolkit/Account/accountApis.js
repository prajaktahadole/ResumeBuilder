import { ajaxHandler } from "../../services/ajaxHandler";

export const logIn = async (payload) => {
  const response = await ajaxHandler("post", `login`, payload);
  return response;
};

//SignUp

export const SignUp = async (payload) => {
  const response = await ajaxHandler("post", `account/register`, payload);
  return response;
};
