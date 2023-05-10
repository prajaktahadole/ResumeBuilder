import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";
import { GroupAddOutlined, GroupAddRounded } from "@mui/icons-material";

const SideBarlist = () => {
  const navigate = useNavigate();
  const companyCheck = () => {
    if (localStorage.getItem("role") === "PARTNER") {
      return true;
    } else {
      return false;
    }
  };
  const InterviewerCheck = () => {
    if (localStorage.getItem("role") === "INTERVIEWER") {
      return true;
    } else {
      return false;
    }
  };
  const InternalCheck = () => {
    if (localStorage.getItem("role") === "INTERNAL") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <React.Fragment>
      {InterviewerCheck() ? null : (
        <ListItemButton onClick={() => navigate("/resumemakerui/dashboard")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Resume" />
        </ListItemButton>
      )}

      {companyCheck() ? null : (
        <ListItemButton onClick={() => navigate("/resumemakerui/feedback")}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItemButton>
      )}

      {companyCheck() || InterviewerCheck() || InternalCheck () ? null : (
        <ListItemButton onClick={() => navigate("/resumemakerui/users")}>
          <ListItemIcon>
            <GroupAddRounded />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      )}
    </React.Fragment>
  );
};

export default SideBarlist;
