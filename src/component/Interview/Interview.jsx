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
import RestartAltIcon from '@mui/icons-material/RestartAlt';


function InterviewDetails() {
  const dispatch = useDispatch();
  const currentDate = new Date().toISOString().split("T")[0];
  const [gridData, setGridData] = useState([]);
  const [interviewerName, setInterviewerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [hold, setHold] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedInternal, setSelectedInternal] = useState(0);
  const [selectedConverge, setSelectedConverge] = useState(0);
  const [rejectedInternal,setRejectedInternal] = useState(0);
  const [rejectedConverge, setRejectedConverge] = useState(0);
  const [holdInternal, setHoldInternal] = useState(0);
  const [holdConverge, setHoldConverge] = useState(0);
  const [totalInternal, setTotalInternal] = useState(0);
  const [totalConverge, setTotalConverge] = useState(0);

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
        let selectedSum = 0;
        let rejectedSum = 0;
        let holdSum = 0;
        let totalSum = 0;
        let selectedInternalSum = 0;
        let selectedConvergeSum = 0;
        let rejectedInternalSum = 0;
        let rejectedConvergeSum = 0;
        let holdInternalSum = 0;
        let holdConvergeSum = 0;
        let totalInternalSum = 0;
        let totalConvergeSum = 0;

        resData.forEach((item) => {
            selectedSum += item.Selected;
            rejectedSum += item.Rejected;
            holdSum += item.Hold;
            totalSum += item.Total;
            selectedInternalSum += item.interviewType === "Humancloud_Internal" ?  item.Selected : 0;
            selectedConvergeSum += item.interviewType === "The_Converge" ?  item.Selected : 0;
            rejectedInternalSum += item.interviewType === "Humancloud_Internal" ?  item.Rejected : 0;
            rejectedConvergeSum += item.interviewType === "The_Converge" ?  item.Rejected : 0;
            holdInternalSum += item.interviewType === "Humancloud_Internal" ?  item.Hold : 0;
            holdConvergeSum += item.interviewType === "The_Converge" ?  item.Hold : 0;
            totalInternalSum += item.interviewType === "Humancloud_Internal" ?  item.Total : 0;
            totalConvergeSum += item.interviewType === "The_Converge" ?  item.Total : 0;
        });

        setSelected(selectedSum);
        setRejected(rejectedSum);
        setHold(holdSum);
        setTotal(totalSum);
        setSelectedInternal(selectedInternalSum);
        setSelectedConverge(selectedConvergeSum)
        setRejectedInternal(rejectedInternalSum);
        setRejectedConverge(rejectedConvergeSum)
        setHoldInternal(holdInternalSum);
        setHoldConverge(holdConvergeSum)
        setTotalInternal(totalInternalSum);
        setTotalConverge(totalConvergeSum)
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
      let selectedSum = 0;
      let rejectedSum = 0;
      let holdSum = 0;
      let totalSum = 0;
      let selectedInternalSum = 0;
      let selectedConvergeSum = 0;
      let rejectedInternalSum = 0;
      let rejectedConvergeSum = 0;
      let holdInternalSum = 0;
      let holdConvergeSum = 0;
      let totalInternalSum = 0;
      let totalConvergeSum = 0;

      data.forEach((item) => {
          selectedSum += item.Selected;
          rejectedSum += item.Rejected;
          holdSum += item.Hold;
          totalSum += item.Total;
          selectedInternalSum += item.interviewType === "Humancloud_Internal" ?  item.Selected : 0;
          selectedConvergeSum += item.interviewType === "The_Converge" ?  item.Selected : 0;
          rejectedInternalSum += item.interviewType === "Humancloud_Internal" ?  item.Rejected : 0;
          rejectedConvergeSum += item.interviewType === "The_Converge" ?  item.Rejected : 0;
          holdInternalSum += item.interviewType === "Humancloud_Internal" ?  item.Hold : 0;
          holdConvergeSum += item.interviewType === "The_Converge" ?  item.Hold : 0;
          totalInternalSum += item.interviewType === "Humancloud_Internal" ?  item.Total : 0;
          totalConvergeSum += item.interviewType === "The_Converge" ?  item.Total : 0;
      });

      setSelected(selectedSum);
      setRejected(rejectedSum);
      setHold(holdSum);
      setTotal(totalSum);
      setSelectedInternal(selectedInternalSum);
      setSelectedConverge(selectedConvergeSum)
      setRejectedInternal(rejectedInternalSum);
      setRejectedConverge(rejectedConvergeSum)
      setHoldInternal(holdInternalSum);
      setHoldConverge(holdConvergeSum)
      setTotalInternal(totalInternalSum);
      setTotalConverge(totalConvergeSum)
  };

  const getbyInterviewerandDate = async () => {
    const data = await feedbackCountByInterviewerandDate(interviewerName, startDate, endDate, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }
    });
    setGridData(data);
      let selectedSum = 0;
      let rejectedSum = 0;
      let holdSum = 0;
      let totalSum = 0;
      let selectedInternalSum = 0;
      let selectedConvergeSum = 0;
      let rejectedInternalSum = 0;
      let rejectedConvergeSum = 0;
      let holdInternalSum = 0;
      let holdConvergeSum = 0;
      let totalInternalSum = 0;
      let totalConvergeSum = 0;

      data.forEach((item) => {
          selectedSum += item.Selected;
          rejectedSum += item.Rejected;
          holdSum += item.Hold;
          totalSum += item.Total;
          selectedInternalSum += item.interviewType === "Humancloud_Internal" ?  item.Selected : 0;
          selectedConvergeSum += item.interviewType === "The_Converge" ?  item.Selected : 0;
          rejectedInternalSum += item.interviewType === "Humancloud_Internal" ?  item.Rejected : 0;
          rejectedConvergeSum += item.interviewType === "The_Converge" ?  item.Rejected : 0;
          holdInternalSum += item.interviewType === "Humancloud_Internal" ?  item.Hold : 0;
          holdConvergeSum += item.interviewType === "The_Converge" ?  item.Hold : 0;
          totalInternalSum += item.interviewType === "Humancloud_Internal" ?  item.Total : 0;
          totalConvergeSum += item.interviewType === "The_Converge" ?  item.Total : 0;
      });

      setSelected(selectedSum);
      setRejected(rejectedSum);
      setHold(holdSum);
      setTotal(totalSum);
      setSelectedInternal(selectedInternalSum);
      setSelectedConverge(selectedConvergeSum)
      setRejectedInternal(rejectedInternalSum);
      setRejectedConverge(rejectedConvergeSum)
      setHoldInternal(holdInternalSum);
      setHoldConverge(holdConvergeSum)
      setTotalInternal(totalInternalSum);
      setTotalConverge(totalConvergeSum)
  };

  const getbyDate = async () => {
    const data = await feedbackCountByDate(startDate, endDate, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }
    });
    setGridData(data);
      let selectedSum = 0;
      let rejectedSum = 0;
      let holdSum = 0;
      let totalSum = 0;
      let selectedInternalSum = 0;
      let selectedConvergeSum = 0;
      let rejectedInternalSum = 0;
      let rejectedConvergeSum = 0;
      let holdInternalSum = 0;
      let holdConvergeSum = 0;
      let totalInternalSum = 0;
      let totalConvergeSum = 0;

      data.forEach((item) => {
          selectedSum += item.Selected;
          rejectedSum += item.Rejected;
          holdSum += item.Hold;
          totalSum += item.Total;
          selectedInternalSum += item.interviewType === "Humancloud_Internal" ?  item.Selected : 0;
          selectedConvergeSum += item.interviewType === "The_Converge" ?  item.Selected : 0;
          rejectedInternalSum += item.interviewType === "Humancloud_Internal" ?  item.Rejected : 0;
          rejectedConvergeSum += item.interviewType === "The_Converge" ?  item.Rejected : 0;
          holdInternalSum += item.interviewType === "Humancloud_Internal" ?  item.Hold : 0;
          holdConvergeSum += item.interviewType === "The_Converge" ?  item.Hold : 0;
          totalInternalSum += item.interviewType === "Humancloud_Internal" ?  item.Total : 0;
          totalConvergeSum += item.interviewType === "The_Converge" ?  item.Total : 0;
      });

      setSelected(selectedSum);
      setRejected(rejectedSum);
      setHold(holdSum);
      setTotal(totalSum);
      setSelectedInternal(selectedInternalSum);
      setSelectedConverge(selectedConvergeSum)
      setRejectedInternal(rejectedInternalSum);
      setRejectedConverge(rejectedConvergeSum)
      setHoldInternal(holdInternalSum);
      setHoldConverge(holdConvergeSum)
      setTotalInternal(totalInternalSum);
      setTotalConverge(totalConvergeSum)
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
    const gridApi = React.useRef(null);
  const handleExportToExcel = () => {
    //exportToExcel(gridData, "interview_data.xlsx"); // Function to export data to Excel
      //gridOptionsfeedbackkpi.api.exportDataAsExcel();
      if (gridOptionsfeedbackkpi.current) {
          gridOptionsfeedbackkpi.current.api.exportDataAsCsv();
      }
  };

  const handleReset = () => {
    window.location.reload(false);
  }
  return (
    <>
        <Paper style={{padding: '10px', marginTop: '20px', height: '850px' ,backgroundColor: "#F0F0F0"}}>
        <div>
        <Grid
          item
          xs={12}
          sm={12}
          lg={12}
          sx={{
            margin: "10px 0px 10px 0px",
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
                  value={endDate === "" ? setEndDate(currentDate) : endDate}
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
              onClick={handleReset}
            >
               <IconButton  color="primary" size="medium">
                <RestartAltIcon/>
              </IconButton>
            </Button>
          </Paper>
        </Grid>
      </div>

      <div>
        <Grid
          item
          xs={12}
          sm={12}
          lg={12}
          sx={{
            marginBottom: "10px",
          }}
        >
         <Box
          className="countbox1"
          component="form"
          >

                 <Paper xs={4} sm={2} lg={2} className="countindvmain" style={{ width: '23%', padding: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <div className='borbtm'>
                     <h4>SELECTED</h4>
                     <h1 style={{color : "green"}} >{selected}</h1>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px' }}>
                     <div style={{ borderRight: '1px solid black', width: '50%' }}>
                         <h4>INTERNAL</h4>
                         <h1 style={{color : "green"}}>{selectedInternal}</h1>
                     </div>
                     <div style={{ width: '50%' }}>
                         <h4>CONVERGE</h4>
                         <h1 style={{color : "green"}}>{selectedConverge}</h1>
                     </div>
                 </div>
             </Paper>

             <Paper className="countindvmain" style={{ width: '23%', padding: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <div className='borbtm'>
                     <h4>REJECTED</h4>
                     <h1 style={{color : "red"}} >{rejected}</h1>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px' }}>
                     <div style={{ borderRight: '1px solid black', width: '50%' }}>
                         <h4>INTERNAL</h4>
                         <h1 style={{color : "red"}}>{rejectedInternal}</h1>
                     </div>
                     <div style={{ width: '50%'}}>
                         <h4>CONVERGE</h4>
                         <h1 style={{color : "red"}}>{rejectedConverge}</h1>
                     </div>
                 </div>
             </Paper>

             <Paper className="countindvmain" style={{ width: '23%', padding: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <div className='borbtm'>
                     <h4>HOLD</h4>
                     <h1 style={{color : "orange"}} >{hold}</h1>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px' }}>
                     <div style={{ borderRight: '1px solid black', width: '50%'}}>
                         <h4>INTERNAL</h4>
                         <h1 style={{color : "orange"}}>{holdInternal}</h1>
                     </div>
                     <div style={{ width: '50%' }}>
                         <h4>CONVERGE</h4>
                         <h1 style={{color : "orange"}}>{holdConverge}</h1>
                     </div>
                 </div>
             </Paper>
             <Paper className="countindvmain" style={{ width: '23%', padding: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <div className='borbtm'>
                     <h4>TOTAL</h4>
                     <h1>{total}</h1>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px' }}>
                     <div style={{ borderRight: '1px solid black', width: '50%'}}>
                         <h4>INTERNAL</h4>
                         <h1>{totalInternal}</h1>
                     </div>
                     <div style={{ width: '50%' }}>
                         <h4>CONVERGE</h4>
                         <h1>{totalConverge}</h1>
                     </div>
                 </div>
             </Paper>

          </Box>
        </Grid>
      </div>
       <AgGridTable
          gridOptions={gridOptionsfeedbackkpi}
          data={gridData}
          type="interview"
        />
        </Paper>
    </>
  );
}

export default InterviewDetails;

