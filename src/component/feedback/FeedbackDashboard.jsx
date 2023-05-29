import {
  getFeedbackAllData,
  deleteFeedbackFormById,
} from "../../services/feedback-service";
import { columnDefsFeedback } from "../../utils/AgGridTableColumns";
import { DeleteRounded, PreviewRounded } from "@mui/icons-material";
import { Button, IconButton, InputBase, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AgGridTable from "../AgGridTable/AgGridTable";
import SearchIcon from "@mui/icons-material/Search";
import { getFeedbackAllDataByEmail } from "../../services/feedback-service";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import {
  setMultiNotificationData,
  setMultiNotificationVariant,
} from "../../reduxToolkit/Notification/notificationSlice";
import { useDispatch } from "react-redux";

const FeedbackDashboard = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const buttonRendererView = (props) => {
    return (
      <IconButton
        size="small"
        onClick={() => navigate(`/resumemakerui/feedback/${props.data.formId}`)}
        color="primary"
      >
        <PreviewRounded />
      </IconButton>
    );
  };

  const deleteFeedbackForm = async (formId) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      const res = await deleteFeedbackFormById(formId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        dispatch(setMultiNotificationVariant("success"));
      const errorArray = [
        {
          propertyValue: "Feedback Deleted Successfully.",
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
  };

  const buttonRendererDelete = (props) => {
    return (
      <IconButton
        size="small"
        onClick={() => deleteFeedbackForm(props.data.formId)}
        color="error"
      >
        <DeleteRounded />
      </IconButton>
    );
  };

  const buttonRendereShare = (props) => {
    return (
      <IconButton
        size="small"
        onClick={() => shareFeedbackForm(props.data.formId)}
        color="primary"
      >
        <ShareRoundedIcon />
      </IconButton>
    );
  };

  const shareFeedbackForm = (formId) => {
    const currentURL = `${window.location.origin}/resumemakerui/feedback/${formId}`;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        dispatch(setMultiNotificationVariant("success"));
        const errorArray = [
          {
            propertyValue: "Linked Copied",
          },
        ];
        dispatch(setMultiNotificationData(errorArray));
      })
      .catch(() => {
        dispatch(setMultiNotificationVariant("error"));
        const errorArray = [
          {
            propertyValue: "Error in Copy Link",
          },
        ];
        dispatch(setMultiNotificationData(errorArray));
      });
  };

  const gridOptionsfeedback = {
    headerHeight: 36,
    columnDefs: columnDefsFeedback,
    frameworkComponents: {
      buttonRendererViewResume: buttonRendererView,
      buttonRendererShareResume: buttonRendereShare,
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
  async function fetchdata() {
    if (localStorage.getItem("role") === "ADMIN" || localStorage.getItem("role") === "INTERNAL") {
      const res = await getFeedbackAllData({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setFeedbackData(res);
    } else {
      const res = await getFeedbackAllDataByEmail(
        localStorage.getItem("email"),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setFeedbackData(res);
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <div>
      <h1></h1>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <Paper
            component="form"
            sx={{ display: "flex", alignItems: "center", width: 300 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search feedback"
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
            onClick={() => navigate("/resumemakerui/addfeedback")}
          >
           Add FeedBack
          </Button>
        </Grid>
      </div>

      <AgGridTable
        searchData={searchValue}
        gridOptions={gridOptionsfeedback}
        data={feedbackData}
        type="feedback"
      />
    </>
  );
};

export default FeedbackDashboard;
