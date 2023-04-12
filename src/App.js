import './App.css';
import Resume from './component/Resume/Resume';
import Login from './component/Login';
import SignUp from './component/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './component/dashboard/Drawer';
import AppRoutes from './AppRoutes';
import MiniDrawer from './component/dashboard/Drawer';
import { useState } from 'react';


function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  const handleLoginStatus = (data) => {
    setLoginStatus(data)
  }
  return (
    <BrowserRouter>
      <div>
        {
          loginStatus ? (<>
            <MiniDrawer handleLoginStatus={handleLoginStatus} />
          </>) : (<AppRoutes loginStatus={loginStatus} handleLoginStatus={handleLoginStatus} />)
        }
      </div>

    </BrowserRouter>
  );
}

export default App;
