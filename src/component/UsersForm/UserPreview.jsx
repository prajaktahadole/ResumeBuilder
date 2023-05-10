import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  getUserByID,
  getUserByUUID,
  updateUser,
} from "../../services/resumemaker-services";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import AddUser from "./AddUser";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export const UserPreview = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [edituser, setEditUser] = useState(false);

  async function getUser() {
    try {
      const response = await getUserByID({
        id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setUser(response);
    } catch (error) {}
  }

  useEffect(() => {
    getUser();
  }, []);

  const handleBackClick = () => {
    navigate("/resumemakerui/users");
  };

  const name = user.fullName?.split(" ") || [];
  const userData = {
    firstName: name[0],
    lastName: name[1],
  };

  const handleUserUpdate = async () => {
    try {
      const res = await updateUser(id, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (res.code === "200") {
        alert("User Updated Successfully");
        setEditUser(false); // Exit edit mode
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };
  //console.log("user ---> ",user)

  return (
    <div>
      {edituser ? (
        <>
          {user && (
            <AddUser
              user={user}
              name={name}
              id={id}
              isUserEdit={user?.userId ? true : false}
            />
          )}
        </>
      ) : (
        <>
          <form>
            <Card
              style={{
                maxWidth: "65%",
                margin: "145px auto",
                padding: "25px",
                boxShadow:
                  "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                background: "rgb(245,245,245)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "10px auto",
                  maxWidth: "80%",
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    maxWidth: "95%",
                    margin: "10px",
                    padding: "5px 5x",
                    fontWeight: "bolder",
                    textAlign: "left",
                  }}
                >
                  {user.fullName}
                </Typography>
                <Grid style={{ width: "32%" }}>
                  <Button
                    style={{
                      margin: "5px",
                      width: "2%",
                      height: "40px",
                      fontSize: "15px",
                      fontWeight: "bolder",
                      backgroundColor: "rgb(33, 80, 162)",
                    }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleBackClick}
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
                      backgroundColor: "rgb(33, 80, 162)",
                    }}
                    variant="contained"
                    onClick={() => {
                      setEditUser(!edituser);
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
              </Box>
              <Card style={{ maxWidth: "90%", margin: "35px auto" }}>
                <CardContent>
                  <Grid container spacing={0} style={{ margin: "auto" }}>
                    {/* <Grid xs={12} sm={12} item>
                    <Box
                      sx={{
                        width: '500px',
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        margin : 'auto',
                       
                      }}
                    >
                      <h3 style={{width: "28%" ,  textAlign: 'right' , marginRight : '25px' }}>First Name : </h3> <h3>{userData.firstName}</h3>
                    </Box>
                  </Grid>
                  <Grid xs={12} sm={12} item>
                    <Box
                      sx={{
                        width: '500px',
                        height: '50px',
                        // backgroundColor: '#f1f1f1',
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        margin : 'auto'
                        // padding:'10px'
                      }}
                    >
                      <h3 style={{width: "28%",  textAlign: 'right' , marginRight : '25px' }}>Last Name : </h3> <h3>{userData.lastName}</h3>
                    </Box>
                  </Grid>
            
                  <Grid xs={12} sm={12} item>
                    <Box
                      sx={{
                        width: '500px',
                        height: '50px',
                        // backgroundColor: '#f1f1f1',
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        margin : 'auto'
                        // padding:'10px'
                      }}
                    >
                      <h3 style={{width: "28%",  textAlign: 'right' , marginRight : '25px'}}>Email Id :</h3> <h3>{user.email}</h3>
                    </Box>
                  </Grid>
                  <Grid xs={12} sm={12} item>
                    <Box
                      sx={{
                        width: '500px',
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        margin : 'auto'
                      }}
                    >
                      <h3 style={{width: "28%" ,  textAlign: 'right' , marginRight : '25px' }}> User Role : </h3>
                      <h3>
                        {user.roles && Array.isArray(user.roles) && user.roles.map(role => (
                          <h3 key={role.id}>{role.name}</h3>
                        ))}
                      </h3>
                    </Box>
                  </Grid>
                  {
                    user.company === null ||  user.company === "" ? "" :
                    <Grid xs={12} sm={12} item>
                    <Box
                      sx={{
                        width: '500px',
                        height: '50px',
                        // backgroundColor: '#f1f1f1',
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        margin : 'auto'
                        // padding:'10px'
                      }}
                    >
                      <h3 style={{width: "28%",  textAlign: 'right' , marginRight : '25px'}}>Company :</h3> <h3>{user.company}</h3>
                    </Box>
                  </Grid>
                  } */}

                    <TableContainer
                      component={Paper}
                      style={{ maxWidth: "90%", margin: "35px auto" }}
                    >
                      <Table aria-label="simple table">
                        <TableBody>
                          <TableRow>
                            <TableCell
                              style={{
                                borderRight: "1px solid lightgray",
                                textAlign: "right",
                                width: "28%",
                                marginRight: "25px",
                              }}
                            >
                              First Name
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                              {userData.firstName}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              style={{
                                borderRight: "1px solid lightgray",
                                textAlign: "right",
                                width: "28%",
                                marginRight: "25px",
                              }}
                            >
                              Last Name
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                              {userData.lastName}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              style={{
                                borderRight: "1px solid lightgray",
                                textAlign: "right",
                                width: "28%",
                                marginRight: "25px",
                              }}
                            >
                              Email Id
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                              {user.email}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              style={{
                                borderRight: "1px solid lightgray",
                                textAlign: "right",
                                width: "28%",
                                marginRight: "25px",
                              }}
                            >
                              User Role
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                              {user.roles &&
                                Array.isArray(user.roles) &&
                                user.roles.map((role) => (
                                  <div key={role.id}>{role.name}</div>
                                ))}
                            </TableCell>
                          </TableRow>
                          {user.company === null || user.company === "" ? (
                            ""
                          ) : (
                            <TableRow>
                              <TableCell
                                style={{
                                  borderRight: "1px solid lightgray",
                                  textAlign: "right",
                                  width: "28%",
                                  marginRight: "25px",
                                }}
                              >
                                Company
                              </TableCell>
                              <TableCell style={{ fontWeight: "bold" }}>
                                {user.company}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </CardContent>
              </Card>
            </Card>
          </form>
        </>
      )}
    </div>
  );
};
