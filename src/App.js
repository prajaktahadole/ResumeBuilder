import './App.css';
import Resume from './component/Resume/Resume';
import Login from './component/Login';
import SignUp from './component/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './component/dashboard/Drawer';
import AppRoutes from './AppRoutes';
import MiniDrawer from './component/dashboard/Drawer';


function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Login />}></Route>
    //     <Route path="/signup" element={<SignUp />}></Route>
    //     <Route path="/resume" element={<Resume />}></Route>
    //     <Route path="/dashboard" element={<Dashboard />}></Route>
    //   </Routes>
    // </BrowserRouter>
    <BrowserRouter>
    <div>
   {
        true ? (<>
          <MiniDrawer />
        </>) : (<AppRoutes />)
      }
    </div>

      </BrowserRouter>
  );
}

export default App;
