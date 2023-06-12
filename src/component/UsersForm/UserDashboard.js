import { DeleteRounded, PreviewRounded } from "@mui/icons-material";
import { Button, IconButton, InputBase, Paper, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { columnDefsUser } from "../../utils/AgGridTableColumns";
import {
  deleteUserById,
  getUserByUUID,
  getUsersAllData,
} from "../../services/resumemaker-services";
import { useNavigate } from "react-router-dom";
import AgGridTable from "../AgGridTable/AgGridTable";
import SearchIcon from "@mui/icons-material/Search";
import {
  setMultiNotificationData,
  setMultiNotificationVariant,
} from "../../reduxToolkit/Notification/notificationSlice";
import { useDispatch } from "react-redux";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const buttonRendererView = (props) => {
    return (
      <IconButton
        size="small"
        onClick={() => navigate(`/resumemakerui/users/${props.data.userUUID}`)}
        color="primary"
      >
        <PreviewRounded />
      </IconButton>
    );
  };
  const buttonRendererDelete = (props) => {
    return (
      <IconButton
        size="small"
        onClick={() => deleteUser(props.data.userUUID)}
        color="error"
      >
        <DeleteRounded />
      </IconButton>
    );
  };

  const deleteUser = async (userUUID) => {
    const resuser = await getUserByUUID({
      userUUID,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (resuser.email === localStorage.getItem("email")) {
      dispatch(setMultiNotificationVariant("error"));
      const errorArray = [
        {
          propertyValue: "You cannot delete your own account.",
        },
      ];
      dispatch(setMultiNotificationData(errorArray));
    } else {
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (confirmed) {
        const res = await deleteUserById(userUUID, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          dispatch(setMultiNotificationVariant("success"));
          const errorArray = [
            {
              propertyValue: "User Deleted Successfully.",
            },
          ];
          dispatch(setMultiNotificationData(errorArray));
          fetchdata();
        } else {
          dispatch(setMultiNotificationVariant("error"));
          const errorArray = [
            {
              propertyValue: "Something went wrong.",
            },
          ];
          dispatch(setMultiNotificationData(errorArray));
        }
      }
    }
  };
  const gridOptionsResume = {
    headerHeight: 36,
    columnDefs: columnDefsUser,
    frameworkComponents: {
      buttonRendererViewResume: buttonRendererView,
      buttonRendererDeleteResume: buttonRendererDelete,
      customNoRowsOverlay: CustomNoRowsOverlay,
    },
  };
  function CustomNoRowsOverlay() {
    return (
      <div
        className="ag-overlay-no-rows-wrapper"
        style={{
          backgroundColor: "white",
          padding: "20px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "bolder",
        }}
      >
        <div style={{ textAlign: "center" }}>
          NO DATA FOUND FOR LOGGED IN USER
        </div>
      </div>
    );
  }
  useEffect(() => {
    fetchdata();
  }, []);

  async function fetchdata() {
    const res = await getUsersAllData({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    setUserData(res);
  }
//console.log("user data --> ", userData)

  return (
    <>
      <Paper style={{padding: '15px', marginTop: '30px' , height: '635px', backgroundColor: '#F0F0F0'}}>
      <div>
        <Grid
         item
         xs={12}
         sm={12}
         lg={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0px",
          }}
        >
          <Paper
            component="form"
            sx={{ display: "flex", alignItems: "center", width: 300 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search name"
              inputProps={{ "aria-label": "search name" }}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e?.target?.value || "");
              }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(33, 80, 162)" }}
            onClick={() => navigate("/resumemakerui/adduser")}
          >
            Add Users{" "}
          </Button>
        </Grid>
      </div>
      {/* {userData.length ? (
        <AgGridTable
          searchData={searchValue}
          gridOptions={gridOptionsResume}
          data={userData}
          type="users"
        />
      ) : null} */}
      <AgGridTable
          searchData={searchValue}
          gridOptions={gridOptionsResume}
          data={userData}
          type="users"
        />
      </Paper>
    </>
  );
};

export default UserDashboard;
