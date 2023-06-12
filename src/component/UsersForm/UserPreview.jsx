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
import {
  setMultiNotificationData,
  setMultiNotificationVariant,
} from "../../reduxToolkit/Notification/notificationSlice";
import { useDispatch } from "react-redux";

export const UserPreview = () => {
  const dispatch = useDispatch();
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
        dispatch(setMultiNotificationVariant("success"));
          const errorArray = [
            {
              propertyValue: "User updated successfully.",
            },
          ];
          dispatch(setMultiNotificationData(errorArray));
        setEditUser(false); // Exit edit mode
      } else {
        dispatch(setMultiNotificationVariant("error"));
        const errorArray = [
          {
            propertyValue: "Something went wrong.",
          },
        ];
        dispatch(setMultiNotificationData(errorArray));
      }
    } catch (error) {
      console.error(error);
    }
  };

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
                margin: "50px auto",
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
                  margin: "5px auto",
                  maxWidth: "90%",

                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    maxWidth: "95%",
                    margin: "5px",
                    padding: "5px 5x",
                    fontWeight: "bolder",
                    textAlign: "left",
                  }}
                >
                  {user.fullName}
                </Typography>
                <Grid style={{ width: "24%" }}>
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
