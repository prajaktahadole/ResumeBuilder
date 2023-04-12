import { useRoutes } from "react-router-dom"
import Dashboard from "./component/dashboard/Dashboard"
import Feedback from "./component/feedback/Feedback"
import Login from "./component/Login"
import Resume from "./component/Resume/Resume"
import SignUp from "./component/SignUp"
import ResumePreview from "./component/Resume/ResumePreview"
import ResumeDetails from "./component/Resume/ResumeDetails"
import { useState } from "react"

const AppRoutes = ({ handleLoginStatus }) => {


    const testRoutes = [
        { path: '*', element: <Login handleLoginStatus={handleLoginStatus} /> },
        { path: '/resumemakerui/login', element: <Login handleLoginStatus={handleLoginStatus} /> },
        { path: '/resumemakerui/dashboard', element: <Dashboard /> },
        { path: '/resumemakerui/feedback', element: <Feedback /> },
        { path: '/resumemakerui/signup', element: <SignUp /> },
        { path: '/resumemakerui/resume', element: <Resume /> },
        { path: '/resumemakerui/resume/:id', element: <ResumeDetails /> },
        { path: '/resumemakerui/preview', element: <ResumePreview /> }
    ]
    const routes = useRoutes(testRoutes)
    return routes
}

export default AppRoutes;