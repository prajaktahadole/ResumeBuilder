import { useRoutes } from "react-router-dom"
import Dashboard from "./component/dashboard/Dashboard"
import Feedback from "./component/feedback/Feedback"
import Login from "./component/Login"
import Resume from "./component/Resume/Resume"
import SignUp from "./component/SignUp"

const AppRoutes = () => {
    const testRoutes = [
        { path: '/', element: <Login /> },
        { path: '/login', element: <Login /> },
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/feedback', element: <Feedback /> },
        { path: '/signup', element: <SignUp /> },
        { path: '/resume', element: <Resume /> }
    ]
    const routes = useRoutes(testRoutes)
    return routes
}

export default AppRoutes;