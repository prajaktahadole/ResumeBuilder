import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  IconButton,
  Box
} from "@mui/material";
import AgGridTable from "../AgGridTable/AgGridTable";
import SelectOption from "./SelectOption";
import { feedbackCountByDate, feedbackCountByInterviewer, feedbackCountByInterviewerAll, feedbackCountByInterviewerandDate } from "../../services/feedback-service";
import { columnDefsFeedbackKpi } from "../../utils/AgGridTableColumns";
import {
  setMultiNotificationData,
  setMultiNotificationVariant,
} from "../../reduxToolkit/Notification/notificationSlice";
import { useDispatch } from "react-redux";
import { exportToExcel } from "../../utils/exportToExcel";
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { useNavigate } from "react-router-dom";
import '../../styles/interview.css'

function InterviewDetails() {
  const dispatch = useDispatch();
  const currentDate = new Date().toISOString().split("T")[0];
  const [gridData, setGridData] = useState([]);
  const [interviewerName, setInterviewerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const handleSelectInterviewer = (selectedInterviewer) => {
    setInterviewerName(selectedInterviewer);
  };

  useEffect(() => {
    async function fetchData() {
      const resData = await feedbackCountByInterviewerAll({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setGridData(resData);
    }
    fetchData();
  }, []);

  const getbyInterviewer = async () => {
    const data = await feedbackCountByInterviewer(interviewerName, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    setGridData(data);
  };

  const getbyInterviewerandDate = async () => {
    const data = await feedbackCountByInterviewerandDate(interviewerName, startDate, endDate, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }
    });
    setGridData(data);
  };

  const getbyDate = async () => {
    const data = await feedbackCountByDate(startDate, endDate, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }
    });
    setGridData(data);
  };

  const handleResults = () => {
    if (!startDate && !endDate && !interviewerName)
    {
      dispatch(setMultiNotificationVariant("error"));
          const errorArray = [
            {
              propertyValue: "Select at least one choice for search data.",
            },
          ];
          dispatch(setMultiNotificationData(errorArray));

    }
    else if (startDate && endDate && interviewerName) {
      getbyInterviewerandDate();
    } 
    else if (!startDate && endDate)
    {
      dispatch(setMultiNotificationVariant("error"));
          const errorArray = [
            {
              propertyValue: "Select start date.",
            },
          ];
          dispatch(setMultiNotificationData(errorArray));
    }
    else if (startDate && !endDate)
    {
      dispatch(setMultiNotificationVariant("error"));
          const errorArray = [
            {
              propertyValue: "Select end date.",
            },
          ];
          dispatch(setMultiNotificationData(errorArray));
    }
    else if (startDate && endDate)
    {
      getbyDate();
    }
    else {
      getbyInterviewer();
    }
  };

  const gridOptionsfeedbackkpi = {
    headerHeight: 36,
    columnDefs: columnDefsFeedbackKpi,
    frameworkComponents: {
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
          NO DATA FOUND FOR SELECTED CRITERIA
        </div>
      </div>
    );
  }
  const handleExportToExcel = () => {
    exportToExcel(gridData, "interview_data.xlsx"); // Function to export data to Excel
  };

  const handleReset = () => {
    window.location.reload(false);
  }

  return (
    <>
      <div>
        <Grid
          item
          xs={12}
          sx={{
            margin: "30px 0px 10px 0px",
          }}
        >
         
          <Paper
            component="form"
            className="countbox"
          >
            <TextField
              style={{ width: "45%", marginRight: "10px" }}
              type="date"
              id="outlined-required"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                max: currentDate,
                required: true,
              }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              style={{ width: "45%", marginRight: "50px" }}
              type="date"
              label="End Date"
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              inputProps={{
                max: currentDate,
                required: true,
              }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <SelectOption onSelectInterviewer={handleSelectInterviewer} />
            <Button
              style={{
                width: "15%",
                padding: "10px",
                fontSize: "15px",
                fontWeight: "bolder",
                backgroundColor: "white",
                textTransform: "none",
              }}
              variant="contained"
              onClick={handleResults}
            >
              <IconButton  color="primary" size="medium">
                <ScreenSearchDesktopIcon />
              </IconButton>
            </Button>
            <Button
              style={{
                width: "15%",
                padding: "10px",
                fontSize: "15px",
                fontWeight: "bolder",
                backgroundColor: "white",
                textTransform: "none",
                marginLeft: "10px",
              }}
              variant="contained"
              onClick={handleExportToExcel}
            >
               <IconButton  color="primary" size="medium">
                <CloudDownloadIcon />
              </IconButton>
            </Button>
            <Button
              style={{
                width: "15%",
                padding: "10px",
                fontSize: "15px",
                fontWeight: "bolder",
                backgroundColor: "white",
                textTransform: "none",
                marginLeft: "10px",
              }}
              variant="contained"
              onClick={handleReset}
            >
               <IconButton  color="primary" size="medium">
                <CleaningServicesIcon />
              </IconButton>
            </Button>
          </Paper>
        </Grid>
      </div>

      <div>
        <Grid
          item
          xs={12}
          sx={{
            marginBottom: "10px",
          }}
        >
         <Box
          className="countbox"
          component="form"
          >
             <Paper className="countindvmain" style={{width : '13%' , padding : "20px" , textAlign : 'center'}}>
                        <h4  >Total  </h4>
                        <h1 >{15}</h1>
              </Paper >
              <Paper style={{color : "green", width : '13%' , padding : "20px" , textAlign : 'center'}} >
                        <h4  >Selected </h4>
                        <h1 >{25}</h1>
              </Paper>

              <Paper style={{color : "red", width : '13%' , padding : "20px" , textAlign : 'center'}} >
                        <h4 >Rejected </h4>
                        <h1 >{10}</h1>
              </Paper>

              <Paper style={{color : "orange", width : '13%' , padding : "20px" , textAlign : 'center'}}>
                        <h4 >Hold </h4>
                        <h1 >{2}</h1>
              </Paper>

          </Box>
        </Grid>
      </div>
       <AgGridTable
          gridOptions={gridOptionsfeedbackkpi}
          data={gridData}
          type="interview"
        />
    </>
  );
}

export default InterviewDetails;

