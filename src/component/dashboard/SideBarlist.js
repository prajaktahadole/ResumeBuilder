import { ListItemButton, ListItemIcon, ListItemText, List } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {GroupAddRounded} from "@mui/icons-material";
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EventNoteIcon from '@mui/icons-material/EventNote';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SchoolIcon from '@mui/icons-material/School';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import '../../styles/sidebar.css'


const SideBarlist = () => {
  const [openList, setOpenList] = useState(false);
  const [openMasterList, setOpenMasterList] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleArrowClick = () => {
    setOpenList(!openList);
  };

  const handleMasterArrowClick = () => {
    setOpenMasterList(!openMasterList);
  };

  const companyCheck = () => {
    return localStorage.getItem("role") === "PARTNER";
  };

  const InterviewerCheck = () => {
    return localStorage.getItem("role") === "INTERVIEWER";
  };

  const InternalCheck = () => {
    return localStorage.getItem("role") === "INTERNAL";
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? "active" : "";
  };

  return (
    <React.Fragment>
      {companyCheck() ? null : (
        <List className={`inside-content ${isActive("/resumemakerui/interview-details")}`}>
           <ListItemButton
            onClick={() => navigate("/resumemakerui/interview-details")}
            className={isActive("/resumemakerui/interview-details") ? "active" : ""}
           >
            <ListItemIcon>
              <LaptopMacIcon />
            </ListItemIcon>
            <ListItemText primary="Interview" />
            <KeyboardArrowDownIcon
              className={openList ? "upButton active" : "downButton"}
              onClick={handleArrowClick}
            />
         </ListItemButton>

         
           {openList && (
          <div>
            <List>
              <ListItemButton
                onClick={() => navigate("/resumemakerui/feedback")}
                className={isActive("/resumemakerui/feedback") ? "active" : ""}
              >
                <ListItemIcon>
                  <FeedbackIcon></FeedbackIcon>
                </ListItemIcon>
                <ListItemText primary="Feedback" />
              </ListItemButton>

              <ListItemButton
                onClick={() => navigate("/resumemakerui/schedule-interview")}
                className={isActive("/resumemakerui/schedule-interview") ? "active" : ""}
              >
                <ListItemIcon>
                  <EventNoteIcon></EventNoteIcon>
                </ListItemIcon>
                <ListItemText primary="Schedule Interview" />
              </ListItemButton>
            </List>
          </div>
         )}
        </List>
      )}


{companyCheck() || InterviewerCheck() || InternalCheck() ? null : (
      
      <List className={`inside-content ${isActive("/resumemakerui/master")}`}>
      <ListItemButton  
       onClick={() => navigate("/resumemakerui/master")}
      className={isActive("/resumemakerui/master") ? "active" : ""}>
      <ListItemIcon>
        <SettingsIcon/>
      </ListItemIcon>
      <ListItemText primary="Master" />
      <KeyboardArrowDownIcon
        className={openMasterList ? "upButton active" : "downButton"}
        onClick={handleMasterArrowClick}
      />
      </ListItemButton>

            
    {openMasterList && (
      <div>
        <List>
          <ListItemButton
              onClick={() => navigate("/resumemakerui/users")}
            className={isActive("/resumemakerui/users") ? "active" : ""}
          >
            <ListItemIcon>
            <GroupAddRounded />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>

          <ListItemButton
              onClick={() => navigate("/resumemakerui/tech-stacks")}
            className={isActive("/resumemakerui/tech-stacks") ? "active" : ""}
          >
            <ListItemIcon>
            <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Tech Stack" />
          </ListItemButton>
        </List>
      </div>
      )}
      </List>

      
    )}

      {InterviewerCheck() ? null : (
        <List className={`inside-content resume ${isActive("/resumemakerui/dashboard")}`}>
          <ListItemButton
            onClick={() => navigate("/resumemakerui/dashboard")}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Resume" />
          </ListItemButton>
        </List>
      )}

    
    </React.Fragment>
  );
};

export default SideBarlist;
