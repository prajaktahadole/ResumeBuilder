import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { isTokenValid } from "../utils/validToken";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../reduxToolkit/Account/accountSlice";

const Redirect = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch() 
  useEffect(() => {
    if (isTokenValid()) {
       dispatch(setIsLogin(true));
       if (localStorage.getItem("redirect") !== null) {
        const redirect = localStorage.getItem("redirect");
        if (redirect.startsWith("/resumemakerui")) {
          navigate(redirect);
        } else {
          navigate("/resumemakerui/dashboard");
        }
        localStorage.removeItem("redirect");
      } else {
        navigate("/resumemakerui/dashboard");
      }
    } else {
      dispatch(setIsLogin(false));
      navigate("/resumemakerui/login");
    }
  }, []);
  return <div></div>;
};

export default Redirect;
