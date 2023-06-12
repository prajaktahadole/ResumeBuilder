import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getFeedbackForm } from "../../services/feedback-service";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { Box } from "@mui/system";
import TechRating from "./TechRating";
import SoftSkillRating from "./SoftSkillRating";
import ImageListComponent from "./ImageListComponent";
import Feedback from "./Feedback";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import "../../styles/Rdetails.css";
import FeedbackPage from "../feedbackForm-RE/FeedbackPage";
import FeedbackformWrapper from "../feedbackForm-RE/FeedbackformWrapper";

function FeedBackFormReview() {
  const [feedbackform, setFeedbackForm] = useState({});
  const { id } = useParams();
  const [editFeedback, setEditFeedback] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  async function fetchFeedbackForm() {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    //try {
    const response = await getFeedbackForm({ id, config });
    setFeedbackForm(response);
    // } catch (error) {
    //   console.log('ERROR:', error);
    // }
  }

  useEffect(() => {
    fetchFeedbackForm();
  }, []);

  const handleBackClick = () => {
    navigate("/resumemakerui/feedback");
  };

  const handleFeedbackUpdate = async () => {
    // try {
    //   const res = await editResumeById(id, item, {
    //     headers: {
    //       'Authorization': `Bearer ${localStorage.getItem("token")}`,
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   if (res.code === "200") {
    //     alert("Feedback Edited Successfully")
    //     setEditMode(false); // Exit edit mode
    //   } else {
    //     alert('Something went wrong')
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var currdate = new Date();
  currdate.setDate(currdate.getDate() + 3);
  var Currentdate = currdate.toISOString().substring(0,10);

  const interviewDate = new Date(feedbackform.interviewDate === null ? feedbackform.createdDate : feedbackform.interviewDate);
  const formattedDate = interviewDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return (
    <div>
      {editFeedback ? (
        <>{feedbackform && <FeedbackformWrapper id={id} />}</>
      ) : (
        <>
          <form>
            <Card
              style={{
                maxWidth: "95%",
                margin: "10px auto",
                padding: "25px",
                boxShadow:
                  "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                background: "rgb(245,245,245)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  margin: "10px auto",
                  maxWidth: "95%",
                  justifyContent: "right",
                }}
              >
                {feedbackform.createdBy === localStorage.getItem("email") ? (
                  <Grid style={{ width: "15%", display: "flex" }}>
                    <Button
                      style={{
                        width: "10%",
                        height: "40px",
                        fontSize: "15px",
                        fontWeight: "bolder",
                        marginRight: "20px",
                      }}
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleBackClick}
                    >
                      <IconButton
                        type="button"
                        sx={{ p: "2px", color: "white" }}
                        aria-label="search"
                      >
                        <ArrowBackOutlinedIcon />
                      </IconButton>
                    </Button>
                    <Button
                      style={{
                        width: "10%",
                        height: "40px",
                        fontSize: "15px",
                        fontWeight: "bolder",
                        //marginRight: '20px'
                      }}
                      variant="contained"
                      onClick={() => {
                        setEditFeedback(!editFeedback);
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
                  </Grid>
                ) : (
                  <Grid style={{ display: "flex" }}>
                    <Button
                      style={{
                        width: "10%",
                        height: "40px",
                        fontSize: "15px",
                        fontWeight: "bolder",
                        marginRight: '20px'
                      }}
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleBackClick}
                    >
                      <IconButton
                        type="button"
                        sx={{ p: "2px", color: "white" }}
                        aria-label="search"
                      >
                        <ArrowBackOutlinedIcon />
                      </IconButton>
                    </Button>

                  <Button
                      style={{
                        width: "60%",
                        height: "40px",
                        fontSize: "15px",
                        fontWeight: "bolder",
                      }}
                      variant="contained"
                      color="primary"
                       onClick={handleClickOpen}
                    >
                       Engage
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Engage Details</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Client Name"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                      <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Engage Date"
                      type="date"
                      defaultValue={Currentdate}
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                  </DialogActions>
                  </Dialog>
                  </Grid>
                )}
              </Box>
              <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
                <CardContent>
                  <Grid xs={12} sm={12} lg={12} item width="98%" style={{marginLeft: "10px"}}>
                    <Card>
                      <CardContent>
                        <Grid xs={12} sm={12} lg={12} item>
                          <Box
                              sx={{
                                width: "100%",
                                height: "45px",
                                display: "flex",
                                justifyContent: "left",
                                alignItems: "center",
                                fontWeight: "bold",
                              }}
                          >
                            <div className="pwork">
                              <h4 className="Name">
                                {" "}
                                {feedbackform.candidateName}
                              </h4>
                            </div>
                          </Box>
                        </Grid>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell component="th" scope="row">
                                {/* Candidate Name */}
                              </TableCell>
                              <TableCell
                                  style={{ fontWeight: "bold" }}
                              ></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                  component="th"
                                  scope="row"
                                  style={{
                                    fontSize: "1rem",
                                    width: "20%",
                                    textAlign: "right",
                                    borderRight: "1px solid lightgray",
                                  }}
                              >
                                Candidate Id
                              </TableCell>
                              <TableCell
                                  style={{
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    textAlign: "left",
                                    width: "80%",
                                  }}
                              >
                                {feedbackform.candidateId}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                  component="th"
                                  scope="row"
                                  style={{
                                    fontSize: "1rem",
                                    borderRight: "1px solid lightgray",
                                    textAlign: "right",
                                  }}
                              >
                                Total Experience
                              </TableCell>
                              <TableCell
                                  style={{ fontSize: "1rem", fontWeight: "bold" }}
                              >
                                {feedbackform.experience} Years
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                  component="th"
                                  scope="row"
                                  style={{
                                    fontSize: "1rem",
                                    borderRight: "1px solid lightgray",
                                    textAlign: "right",
                                  }}
                              >
                                Interviewer Name
                              </TableCell>
                              <TableCell
                                  style={{ fontSize: "1rem", fontWeight: "bold" }}
                              >
                                {feedbackform.interviewerName}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                  component="th"
                                  scope="row"
                                  style={{
                                    fontSize: "1rem",
                                    borderRight: "1px solid lightgray",
                                    textAlign: "right",
                                  }}
                              >
                                Interview Type
                              </TableCell>
                              <TableCell
                                  style={{ fontSize: "1rem", fontWeight: "bold" }}
                              >
                                {feedbackform.interviewType === "The_Converge"
                                    ? "The Converge"
                                    : "Humancloud Internal"}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                  component="th"
                                  scope="row"
                                  style={{
                                    fontSize: "1rem",
                                    borderRight: "1px solid lightgray",
                                    textAlign: "right",
                                  }}
                              >
                                Interview Round
                              </TableCell>
                              <TableCell
                                  style={{ fontSize: "1rem", fontWeight: "bold" }}
                              >
                                {feedbackform.interviewRound}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                  component="th"
                                  scope="row"
                                  style={{
                                    fontSize: "1rem",
                                    borderRight: "1px solid lightgray",
                                    textAlign: "right",
                                  }}
                              >
                                Interview Date
                              </TableCell>
                              <TableCell
                                  style={{ fontSize: "1rem", fontWeight: "bold" }}
                              >
                                {formattedDate}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid container spacing={1} xs={12} sm={12} lg={12} marginBottom={"15px"}>
                    <Grid xs={12} sm={12} lg={12} item style={{marginTop: "10px",marginLeft: "10px"}}>
                      <h4 style={{marginBottom: "10px",marginLeft: "2px"}}>Technology Rating </h4>
                      <TechRating feedbackform={feedbackform} />
                    </Grid>
                  </Grid>


                  <Grid container spacing={1} xs={12} sm={12} lg={12} marginBottom={"15px"}>
                    <Grid xs={12} sm={12} lg={12} item  style={{marginTop: "10px",marginLeft: "10px"}}>
                      <h4 style={{marginBottom: "10px", marginLeft: "2px"}}>
                        Soft Skills Rating
                      </h4>
                      <SoftSkillRating feedbackform={feedbackform} />
                    </Grid>
                  </Grid>

                        <Grid xs={12} sm={12} lg={12} item width="98%" style={{marginLeft: "10px"}}>
                          <h4 style={{ marginBottom: "10px", marginLeft: "5px" }}>Remarks</h4>
                          <Card>
                            <CardContent >
                              <Box sx={{ mb: 2 }}>
                                <Typography
                                    sx={{ display: "flex", alignItems: "center" }}
                                >
                              <span style={{ flex: 1, fontWeight: "bold" }}>
                                Interview Result :
                              </span>

                                  <span
                                      style={{
                                        flex: 4,
                                        display: "flex",
                                        justifyContent: "left",
                                        alignItems: "center",
                                        fontWeight: "bold",
                                        color:
                                            feedbackform.result === "SELECTED"
                                                ? "green"
                                                : feedbackform.result === "REJECTED"
                                                    ? "red"
                                                    : "orange",
                                      }}
                                  >
                                {feedbackform.result}{" "}
                              </span>
                                </Typography>
                              </Box>
                              <Box sx={{ mb: 2 }}>
                                <Typography
                                    sx={{ display: "flex", alignItems: "center" }}
                                >
                              <span style={{ flex: 1, fontWeight: "bold" }}>
                                Good At :
                              </span>

                                  <span style={{ flex: 4 }}>
                                {feedbackform.goodAt}{" "}
                              </span>
                                </Typography>
                              </Box>

                              <Box sx={{ mb: 2 }}>
                                <Typography
                                    sx={{ display: "flex", alignItems: "center" }}
                                >
                              <span style={{ flex: 1, fontWeight: "bold" }}>
                                Improvement Areas :
                              </span>

                                  <span style={{ flex: 4 }}>
                                {feedbackform.improvmentAreas}{" "}
                              </span>
                                </Typography>
                              </Box>
                              <Box sx={{ mb: 2 }}>
                                <Typography
                                    sx={{ display: "flex", alignItems: "center" }}
                                >
                              <span style={{ flex: 1, fontWeight: "bold" }}>
                                Comments :
                              </span>

                                  <span style={{ flex: 4 }}>
                                {feedbackform.comments}{" "}
                              </span>
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>

                  <Grid container spacing={1} xs={12} sm={12} lg={12} marginBottom={"15px"}>
                    <Grid xs={12} sm={12} lg={12} item style={{marginTop: "10px",marginLeft: "10px"}}>
                      <h4 style={{marginBottom: "10px", marginLeft: "2px"}}>Attachments</h4>
                      <Card>
                        <CardContent>
                      <ImageListComponent attachments={feedbackform.attachments} />
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Card>
          </form>
        </>
      )}
    </div>
  );
}

export default FeedBackFormReview;
