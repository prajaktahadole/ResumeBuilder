import { Button, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Rdetails.css";
import {
  downloadResumeById,
  editResumeById,
  getResumeData,
} from "../../services/resumemaker-services";
import Resume from "./Resume";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  setMultiNotificationData,
  setMultiNotificationVariant,
} from "../../reduxToolkit/Notification/notificationSlice";
import { useDispatch } from "react-redux";

function ResumeDetails() {
  const dispatch = useDispatch();
  const [item, setItem] = useState({});
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      personalDetails: {
        ...prevItem.personalDetails,
        [field]: value,
      },
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await editResumeById(id, item, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (res.code === "200") {
        dispatch(setMultiNotificationVariant("success"));
          const errorArray = [
            {
              propertyValue: "Resume Edited Successfully.",
            },
          ];
          dispatch(setMultiNotificationData(errorArray));
        setEditMode(false); // Exit edit mode
      } else {
        dispatch(setMultiNotificationVariant("error"));
          const errorArray = [
            {
              propertyValue: "Something went wrong",
            },
          ];
          dispatch(setMultiNotificationData(errorArray));
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function fetchdata() {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await getResumeData({ id, config });
    setItem(response.data);
  }

  const downloadResume = async (resumeUUID) => {
    try {
      const res = await downloadResumeById  (resumeUUID, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: 'blob'
      });

      const name = item.personalDetails.empName?.split(' ') || [];
      const userData = {
        firstName: name[0],
        lastName: name[1]
      }

      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
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
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      {editMode ? (
        <>
          {item && (
            <Resume
              item={item}
              id={id}
              isEdit={item?.personalDetails ? true : false}
            />
          )}
        </>
      ) : (
        <Grid>
          <Grid style={{ margin: "7px" }}>
            <Button
              style={{
                margin: "5px",
                width: "2%",
                height: "40px",
                fontSize: "15px",
                fontWeight: "bolder",
                left: "89%",
              }}
              variant="contained"
              onClick={() => {
                navigate("/resumemakerui/dashboard");
              }}
            >
              <IconButton
                type="button"
                sx={{ p: "30px", color: "white" }}
                aria-label="search"
              >
                <ArrowBackOutlinedIcon />
              </IconButton>
            </Button>

            <Button
              style={{
                margin: "5px",
                width: "2%",
                height: "40px",
                fontSize: "15px",
                fontWeight: "bolder",
                left: "76%",
              }}
              variant="contained"
              onClick={() => {
                downloadResume(id);
              }}
            >
              <IconButton
                type="button"
                sx={{ p: "30px", color: "white" }}
                aria-label="search"
              >
                <FileDownloadOutlinedIcon />
              </IconButton>
            </Button>

            {item.createdBy === localStorage.getItem("email") || localStorage.getItem("role") === 'ADMIN'  || localStorage.getItem("role") === 'INTERNAL' ? (
              <Button
                style={{
                  margin: "5px",
                  width: "2%",
                  height: "40px",
                  fontSize: "15px",
                  fontWeight: "bolder",
                  left: "63%",
                }}
                variant="contained"
                onClick={() => {
                  setEditMode(!editMode);
                }}
              >
                <IconButton
                  type="button"
                  sx={{ p: "30px", color: "white" }}
                  aria-label="edit"
                >
                  <EditOutlinedIcon />
                </IconButton>
              </Button>
            ) : null}
          </Grid>
          <Grid className="Previewmain">
            {item.personalDetails ? (
              <Grid>
                <Grid key={item.id}>
                  <Grid className="PsubContainer">
                    <div className="pwork">
                      <p className="Name"> {item.personalDetails.empName}</p>
                      <img
                        className="Rlogo"
                        src="https://i.imgur.com/HhW6mt2.png"
                      ></img>
                    </div>

                    <div className="preflex">
                      <div className="Pname">
                        <p> {item.personalDetails.designation}</p>
                        <p> {item.personalDetails.address}</p>
                      </div>
                      <div className="Pname pleft">
                        <p> Email : {item.personalDetails.email}</p>
                        <p> Mobile No :{item.personalDetails.mobileNo}</p>
                       {item.personalDetails.linkedinUR === "" ? "" :  <p>Linkedin : {item.personalDetails.linkedinURL}</p>}
                  
                      </div>
                    </div>
                  </Grid>

                  <Grid className="PsubContainer">
                    <p className="Phead">Professional Summary</p>
                    <Grid>
                      {item.professionalSummary.summaryDetails.map((el) => (
                        <>
                          <li>{el}</li>
                        </>
                      ))}
                    </Grid>
                  </Grid>

                  <Grid className="PsubContainer">
                    <p className="Phead">SkillSet</p>
                    <Grid className="skillsmain">
                      {item.skillSet.technologies === "" ? "" :
                        <div>
                        <Grid className="Psubhead">Technologies:</Grid>
                        <Grid> {item.skillSet.technologies}</Grid>
                      </div>
                      }

                     {
                      item.skillSet.languages === "" ? "" :
                       <div>
                       <Grid className="Psubhead"> Languages:</Grid>
                       <Grid> {item.skillSet.languages}</Grid>
                     </div>
                     }

                      {
                        item.skillSet.tools === "" ? "" :
                        <div>
                        <Grid className="Psubhead"> Tool: </Grid>
                        <Grid> {item.skillSet.tools}</Grid>
                      </div>
                      }

                     {
                      item.skillSet.databaseUsed === "" ? "" :
                       <div>
                       <Grid className="Psubhead"> Database:</Grid>
                       <Grid> {item.skillSet.databaseUsed}</Grid>
                     </div>
                     }

                      {
                        item.skillSet.operatingSystems === "" ? "" :
                        <div>
                        <Grid className="Psubhead"> Operating System: </Grid>
                        <Grid> {item.skillSet.operatingSystems}</Grid>
                      </div>
                      }

                     {
                      item.skillSet.ideUsed === "" ? "" :
                       <div>
                       <Grid className="Psubhead">IDE Used: </Grid>
                         <Grid>{item.skillSet.ideUsed}</Grid>
                     </div>
                     }
                      {item.skillSet.othersSkillSet && item.skillSet.othersSkillSet.length > 0 ? (
                          item.skillSet.othersSkillSet.map((skill, index) => (
                                <div key={index}>
                                  <Grid className="Psubhead">{skill.name}: </Grid>
                                  <Grid>{skill.description}</Grid>
                                </div>
                            ))
                      ) : (
                          " "
                      )}
                    </Grid>
                  </Grid>

                  <Grid className="PsubContainer">
                    <p className="Phead">Work Experience</p>

                    {item.workExperience.map((experience, index) => (
                      <div key={index}>
                        <h3>
                          {experience.jobRole} at {experience.company} (
                          {new Date(experience.periodFrom).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {experience.periodTo === "Present" ? "Present" : new Date(experience.periodTo).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })})
                        </h3>

                        {experience.projects.map((project, projectIndex) => (
                          <Grid key={projectIndex} className="projectsmain">
                            {project.projectName === "" ? (
                              ""
                            ) : (
                              <div>
                                <Grid className="Psubhead">Project:</Grid>
                                <Grid className="Proname">
                                  {project.projectName}
                                </Grid>
                              </div>
                            )}
                            {
                              project.description === "" ? "" :
                              <div>
                                <Grid className="Psubhead">Description:</Grid>
                                <Grid className="Pdescription">
                                  {project.description}
                                </Grid>
                              </div>
                            }

                            {
                              project.technologies === "" ? "":
                              <div>
                              <Grid className="Psubhead">Technologies:</Grid>
                              <Grid> {project.technologies}</Grid>
                            </div>
                            }
                            {
                              project.responsibilities.length <= 0 ? "" :
                                 <div>
                                 <Grid className="Psubhead">
                                   Responsibilities:
                                 </Grid>
                                 <Grid>
                                   {project.responsibilities.map(
                                     (responsibility, resIndex) => (
                                       <li key={resIndex}>{responsibility}</li>
                                     )
                                   )}
                                 </Grid>
                               </div>
                            }
                         
                          </Grid>
                        ))}
                        <hr></hr>
                      </div>
                    ))}
                  </Grid>

                  <Grid className="PsubContainer">
                    <p className="Phead">Education</p>
                    <Grid style={{ fontWeight: "bold", padding: "5px" }}>
                      {item.educationDetails.degree}:{" "}
                      {item.educationDetails.university} (
                      {item.educationDetails.passingYear})
                    </Grid>
                  </Grid>

                  <Grid className="PsubContainer">
                    <p className="Phead">Personal Details</p>

                    <Grid className="skillsmain">
                      <div>
                        <Grid className="Pdhead"> Name:</Grid>
                        <Grid className="Psubhead">
                          {" "}
                          {item.personalDetails.empName}
                        </Grid>
                      </div>

                      <div>
                        <Grid className="Pdhead"> Gender:</Grid>
                        <Grid className="Psubhead">
                          {" "}
                          {item.personalDetails.gender}
                        </Grid>
                      </div>

                      <div>
                        <Grid className="Pdhead">Marital Status:</Grid>
                        <Grid className="Psubhead">
                          {" "}
                          {item.personalDetails.maritalStatus}
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid className="PsubContainer">
                    <p className="Phead">Declaration</p>
                    <Grid>
                      I hereby declare that the above furnished details are true
                      to the best of my knowledge.
                    </Grid>

                    <Grid className="Pdhead" style={{ margin: "10px 0px 5px" }}>
                      {" "}
                      Name:{"  "} {item.personalDetails.empName}
                    </Grid>
                    <Grid className="Psubhead"> </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default ResumeDetails;
