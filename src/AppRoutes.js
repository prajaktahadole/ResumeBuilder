import { useRoutes } from "react-router-dom";
import Dashboard from "./component/dashboard/Dashboard";
import Login from "./component/Login";
import Resume from "./component/Resume/Resume";
import SignUp from "./component/SignUp";
import ResumePreview from "./component/Resume/ResumePreview";
import ResumeDetails from "./component/Resume/ResumeDetails";
import { isTokenValid } from "./utils/validToken";
import { useSelector } from "react-redux";
import Redirect from "./component/Redirect";
import UserDashboard from "./component/UsersForm/UserDashboard";
import AddUser from "./component/UsersForm/AddUser";
import FeedbackDashboard from "./component/feedback/FeedbackDashboard";
import PasswordReset from "./component/ForgotPass";
import FeedBackFormReview from "./component/feedback/FeedBackFormReview";
import { UserPreview } from "./component/UsersForm/UserPreview";
import LoginInternal from "./component/LoginInternal";
import ScheduleInterview from "./component/ScheduleInterview/ScheduleInterview"
import InterviewDetails from "./component/Interview/Interview";
import ChangePassword from "./component/changePass";
import Feedback from "./component/feedback/Feedback";
import TechStack from "./component/Master/TechStack";
import Master from "./component/Master/Master";
import Notification from "./component/Notifications/Notification";
import Filter from "./component/Filter/Filter";

const AppRoutes = () => {
  const { isLogin } = useSelector((state) => state.account);
  const isUserAuthentic = () => isLogin && isTokenValid();

  const testRoutes = [
    { path: "*", element: <Redirect /> },
    { path: "/resumemakerui/login", element: <Login /> },
    { path: "/resumemakerui/internal/login", element: <LoginInternal /> },
    {
      path: "/resumemakerui/dashboard",
      element: isUserAuthentic() ? <Dashboard /> : <Redirect />,
    },
    {
      path: "/resumemakerui/addfeedback",
      element: isUserAuthentic() ? <Feedback /> : <Redirect />,
    },
    {
      path: "/resumemakerui/feedback/:id",
      element: isUserAuthentic() ? <FeedBackFormReview /> : <Redirect />,
    },
    { path: "/resumemakerui/signup", element: <SignUp /> },
    {
      path: "/resumemakerui/resume",
      element: isUserAuthentic() ? <Resume isEdit={false} /> : <Redirect />,
    },
    {
      path: "/resumemakerui/resume/:id",
      element: isUserAuthentic() ? <ResumeDetails /> : <Redirect />,
    },
    {
      path: "/resumemakerui/preview",
      element: isUserAuthentic() ? <ResumePreview /> : <Redirect />,
    },
    {
      path: "/resumemakerui/users",
      element: isUserAuthentic() ? <UserDashboard /> : <Redirect />,
    },
    {
      path: "/resumemakerui/users/:id",
      element: isUserAuthentic() ? <UserPreview /> : <Redirect />,
    },
    {
      path: "/resumemakerui/master",
      element: isUserAuthentic() ? <Master/> : <Redirect />,
    },
    {
      path: "/resumemakerui/tech-stacks",
      element: isUserAuthentic() ? <TechStack /> : <Redirect />,
    },
    {
      path: "/resumemakerui/adduser",
      element: isUserAuthentic() ? <AddUser /> : <Redirect />,
    },
    {
      path: "/resumemakerui/feedback",
      element: isUserAuthentic() ? <FeedbackDashboard /> : <Redirect />,
    },
    { path: "/resumemakerui/passwordreset", element: <PasswordReset /> },
    { path: "/resumemakerui/changepassword", element: <ChangePassword  /> },

    { path: "/resumemakerui/schedule-interview",
     element: isUserAuthentic() ? <ScheduleInterview /> : <Redirect />  },

    { path: "/resumemakerui/interview-details", 
    element: isUserAuthentic() ? <InterviewDetails />: <Redirect /> 
    },
    {
      path: "/resumemakerui/notification",
      element: isUserAuthentic() ? <Notification /> : <Redirect />,
    },
    {
      path: "/resumemakerui/filter",
      element: isUserAuthentic() ? <Filter /> : <Redirect />,
    },


  ];
  const routes = useRoutes(testRoutes);
  return routes;
};

export default AppRoutes;
