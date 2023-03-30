import React, { useState } from "react";
import TextField from "@mui/material/TextField";

import { Button, Card, CardContent, Typography, Grid } from "@mui/material";
import NestedGrid from "./NestedGrid.jsx";
import SingleSelect from "./SingleSelect.jsx";
import MultipleSelect from "./MultipleSelect";
import {
  technologyList,
  experience,
  interviewType,
  interviewRound,
  softskillList,
} from "./Data.jsx";
const Feedback = () => {
  const [technoList, setTechnoList] = useState(technologyList);
  const [state, setState] = useState(false);
  function submitHandler(event) {}
  // function ratingChanger(event) {}

    
    return (
       
    <div>
      <React.Fragment>
        <form onSubmit={submitHandler}>
          <Card
            style={{
              maxWidth: 850,
              margin: "10px auto",
              padding: "20px 20px",
              background: "#bbdefb",
            }}
          >
            <Typography
              variant="h5"
              style={{
                maxWidth: 850,
                margin: "10px  auto",
                padding: "5px 5x",
              }}
            >
              Resume Feedback Form
            </Typography>
            <Card style={{ maxWidth: 850, margin: "20px auto" }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      label="Candidate Name"
                      placeholder="FirstName LastName"
                      variant="outlined"
                      fullWidth
                      required
                      size="small"
                    ></TextField>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {/*"interviewType interview round"*/}
            <Card style={{ maxWidth: 850, margin: "10px auto" }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid xs={4} item>
                    <SingleSelect name="Total Experience" ops={experience} />
                  </Grid>
                  <Grid xs={4} sm={4} item>
                    <SingleSelect name="Interview Type" ops={interviewType} />
                  </Grid>
                  <Grid xs={4} sm={4} item>
                    <SingleSelect name="Interview Round" ops={interviewRound} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {/* Technical Skills*/}
            <Card style={{ maxWidth: 850, margin: "20px auto" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  style={{
                    maxWidth: 850,
                    margin: "10px  auto",
                    padding: "20px 5x",
                    textAlign: "left",
                  }}
                >
                  Technical Skills
                </Typography>

                <Grid container spacing={1}>
                  <Grid xs={8} item>
                    <MultipleSelect
                      data={technologyList}
                      setTechnoList={setTechnoList}
                      technoList={technoList}
                    ></MultipleSelect>
                  </Grid>
                  <Grid xs={4} item>
                    <SingleSelect
                      name="Relavant Experience"
                      ops={experience}
                      stateChanger={setState}
                    />
                  </Grid>
                </Grid>
                <Grid mt="10px" item>
                  {state && (
                    <NestedGrid
                      technologyList={technoList}
                      setTechnologyList={setTechnoList}
                    />
                  )}
                </Grid>
              </CardContent>
            </Card>
            {/* Soft Skills*/}
            <Card
              style={{ maxWidth: 850, margin: "20px auto", padding: "20px 5x" }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  style={{
                    maxWidth: 850,
                    margin: "10px  auto",
                    padding: "20px 5x",
                    textAlign: "left",
                  }}
                >
                  Soft Skills
                </Typography>

                <Grid container spacing={1}>
                  <NestedGrid
                    technologyList={softskillList}
                    isSoftskill={true}
                    setTechnologyList={setTechnoList}
                  />
                </Grid>
              </CardContent>
            </Card>
            <Card style={{ maxWidth: 850, margin: "20px auto" }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    <TextField
                      label="Remark"
                      multiline
                      placeholder="Type your message"
                      variant="outlined"
                      rows={4}
                      fullWidth
                      required
                    ></TextField>
                  </Grid>
                  <Grid xs={12} item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Card>
        </form>
      </React.Fragment>
    </div>
  );
    
}

export default Feedback