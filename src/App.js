import "./App.css";
import { useLocation, useNavigate } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import MiniDrawer from "./component/dashboard/Drawer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "./reduxToolkit/Account/accountSlice";
import { isTokenValid } from "./utils/validToken";
import MultiNotification from "./component/NotificationSnackbar/MultipleNotification";
import { header } from "react-dom-factories";

function App() {
  const { isLogin } = useSelector((state) => state.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [redirectTo, setRedirectTo] = useState(location.state?.from || "/resumemakerui/dashboard");
  
  useEffect(() => {
    if(location.pathname !== "/resumemakerui/login" && location.pathname !== "/resumemakerui/dashboard") {
      localStorage.setItem("redirect", location.pathname)
    }
    else
    {
      localStorage.setItem("redirect", redirectTo)
    }
  }, []);
  
  header('Access-Control-Allow-Origin:  *');
  header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
  header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');

  useEffect(() => {
    if (isTokenValid()) {
      dispatch(setIsLogin(true));
      //navigate("/resumemakerui/dashboard");
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
    }
  }, []);

  return (
    <div>
      <MultiNotification />
      {isLogin ? (
        <>
          <MiniDrawer />
        </>
      ) : (
        <AppRoutes />
      )}
    </div>
  );
}

export default App;
