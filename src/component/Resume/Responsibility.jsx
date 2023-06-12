import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

function Responsibility(props) {
  const [responsibility, setResponsibility] = useState("");
  const [responsibilityList, setResponsibilityList] = useState(() => {
    if (
      props.isEdit &&
      props.item.workExperience[props.cindex] &&
      props.item.workExperience[props.cindex].projects[props.pindex] &&
      props.item.workExperience[props.cindex].projects[props.pindex]
        .responsibilities
    ) {
      return props.item.workExperience[props.cindex].projects[
        props.pindex
      ].responsibilities.map((ele) => {
        return { val: ele };
      });
    } else {
      return [];
    }
  });
  const [responsibilityError, setResponsibilityError] = useState("");

  const handleOpenResponsibilities = () => {
    if (responsibility.trim() === "") {
      setResponsibilityError("Responsibility Cannot Be Empty");
      return;
    }

    setResponsibilityList([...responsibilityList, { val: responsibility }]);
    props.onResponsibilityListChange(props.cindex, props.pindex, [
      ...responsibilityList,
      { val: responsibility },
    ]);
    setResponsibility("");
    setResponsibilityError("");
  };

  const removeItem = (ele) => {
    if (
      window.confirm(
        `Are you sure you want to remove the selected responsibility?`
      )
    ) {
      const newItems = responsibilityList.filter((i) => i !== ele);
      setResponsibilityList(newItems);
      props.onResponsibilityListChange(props.cindex, props.pindex, newItems);
    }
  };

  return (
    <>
      <Grid container 
            xs={{display: "flex"}}
            sm={{
                  '@media (max-width: 600px)': {
                       display: "flex",
                       flexDirection : 'column' ,
                       width : "100%",
                  },
                }} 
            spacing={2}>
        <Grid item  xs={0} sm={4} md={4} lg={4}></Grid>
        <Grid item xs={12} sm={8} md={8} lg={8}>
          {Array.isArray(responsibilityList) && responsibilityList.length ? (
            <ul className="ultag">
              {responsibilityList.map((ele, index) => (
                <li key={index}>
                  {ele.val}
                  <Button onClick={() => removeItem(ele)}>X</Button>
                </li>
              ))}
            </ul>
          ) : (
            " "
          )}
        </Grid>
      </Grid>
      <Grid container 
            xs={{display: "flex"}}
            sm={{
                  '@media (max-width: 600px)': {
                       display: "flex",
                       flexDirection : 'column' ,
                       width : "100%",
                  },
                }} 
            spacing={2}>
        <Grid item  xs={0} sm={4.1} md={4.1} lg={4.1}></Grid>
        <Grid item  xs={9} sm={6.9} md={6.9} lg={6.9}>
          <TextField
            style={{ width: "100%" }}
            Responsibilities
            value={responsibility}
            id="outlined-required"
            label="Project Responsibilities"
            defaultValue={''}
            placeholder="Enter your project responsibilities"
            onChange={(e) => setResponsibility(e.target.value)}
            name="proResponsibilities"
            error={!!responsibilityError}
            helperText={responsibilityError}
          />
        </Grid>
        <Grid  item  xs={0.5} sm={1} md={1} lg={1}>
          <Button
            variant="contained"
            onClick={handleOpenResponsibilities}
            style={{ padding: "12px 3px 15px 0px", backgroundColor: "rgb(33, 80, 162)" }}
          >
            ADD
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Responsibility;
