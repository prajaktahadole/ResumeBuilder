import * as React from "react";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/resume.css";
import { deleteResumeById, downloadResumeById, getResumeAllData, getResumeAllDataByEmail } from "../../services/resumemaker-services";
import AgGridTable from "../AgGridTable/AgGridTable";
import { columnDefsResume } from "../../utils/AgGridTableColumns";
import { Button, Grid, IconButton, InputBase } from "@mui/material";
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SearchIcon from '@mui/icons-material/Search';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import { useDispatch } from "react-redux";
import { setMultiNotificationData, setMultiNotificationVariant } from "../../reduxToolkit/Notification/notificationSlice";

export default function CustomizedTables() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const buttonRendererView = (props) => {
    return (
      <IconButton
        size="small"
        onClick={() =>
          navigate(`/resumemakerui/resume/${props.data.resumeUUID}`)
        }
        color="primary"
      >
        <PreviewRoundedIcon />
      </IconButton>
    );
  };
  const buttonRendererDelete = (props) => {
    return (
      <IconButton
        size="small"
        onClick={() => deleteResume(props.data.resumeUUID)}
        color="error"
      >
        <DeleteRoundedIcon />
      </IconButton>
    );
  };
  const buttonDownloadResume = (props) => {
    return (
      <IconButton
        size="small"
        onClick={() => downloadResume(props.data.resumeUUID,props.data.name)}
        color="primary"
      >
        <DownloadForOfflineRoundedIcon />
      </IconButton>
    );
  };

  const buttonShareResume = (props) => {
    return (
      <IconButton
        size="small"
        onClick={() => shareResume(props.data.resumeUUID)}
        color="primary"
      >
       <ShareRoundedIcon />
      </IconButton>
    );
  };

  const downloadResume = async (resumeUUID,name) => {
    try {
      const res = await downloadResumeById(resumeUUID, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: 'blob'
      });

      const nameid = name?.split(' ') || [];
      const userData = {
        firstName: nameid[0],
        lastName: nameid[1]
      }
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      //link.download = resumeUUID + '.pdf';
      link.download = "Resume_"+userData.firstName+"_"+userData.lastName+ '.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to download resume.');
    }
  }

  const shareResume = (resumeUUID) => {
    const currentURL = `${window.location.origin}/resumemakerui/resume/${resumeUUID}`;
    navigator.clipboard.writeText(currentURL)
      .then(() => 
      {
        dispatch(setMultiNotificationVariant("success"));
        const errorArray = [
          {
            propertyValue: "Linked Copied",
          },
        ];
        dispatch(setMultiNotificationData(errorArray));
      })
      .catch(() =>  {
        dispatch(setMultiNotificationVariant("error"));
        const errorArray = [
          {
            propertyValue: "Error in Copy Link",
          },
        ];
        dispatch(setMultiNotificationData(errorArray));
      });
   
  }

  const deleteResume = async (resumeUUID) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
      if (confirmed) {
    const res = await deleteResumeById(resumeUUID, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      }
    })
    if (res.status === 200) {
      dispatch(setMultiNotificationVariant("success"));
      const errorArray = [
        {
          propertyValue: "Resume Deleted Successfully.",
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

  const gridOptionsResume = {
    headerHeight: 36,
    columnDefs: columnDefsResume,
    frameworkComponents: {
      buttonRendererViewResume: buttonRendererView,
      buttonRendererDownloadResume: buttonDownloadResume,
      buttonRendererShareResume: buttonShareResume,
      buttonRendererDeleteResume: buttonRendererDelete,
      customNoRowsOverlay: CustomNoRowsOverlay,
    }
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
          fontWeight: "bolder"
        }}
      >
        <div style={{ textAlign: "center" }}>NO DATA FOUND FOR LOGGED IN USER</div>
      </div>
    );
  }
  useEffect(() => {
    fetchdata();
  }, []);

  async function fetchdata() {
    if(localStorage.getItem("role") === "ADMIN" || localStorage.getItem("role") === "INTERNAL")
    {
      const res = await getResumeAllData({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setData(res);
    }
    else
    {
      const res = await getResumeAllDataByEmail(localStorage.getItem("email"),{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      setData(res);

    }
    
  }

  return (
    <>
      <Grid container width={'100%'} height={'100%'} marginBottom={"25px"}  >

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Paper
            component="form"
            sx={{ display: 'flex', alignItems: 'center', width: 300 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search resume"
              inputProps={{ 'aria-label': 'search name' }}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e?.target?.value || "");
              }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>

          </Paper>
  
          <Button variant='contained'  sx={{backgroundColor: "rgb(33, 80, 162)"}} onClick={() => navigate('/resumemakerui/resume')}>Create Resume</Button>
        </Grid>

      </Grid>
      {
        <AgGridTable searchData={searchValue} gridOptions={gridOptionsResume} data={data} />
      }
    </>
  );
}
