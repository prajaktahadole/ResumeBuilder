import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

function Responsibility(props) {
  const [responsibility, setResponsibility] = useState("");
  //const [responsibilityList, setResponsibilityList] = useState(props.isEdit ? props.item.workExperience[props.cindex].projects[props.pindex].responsibilities.map((ele) => { return { "val": ele } }) : []);
const [responsibilityList, setResponsibilityList] = useState(
    props.isEdit && props.item.workExperience[props.cindex] ? 
    props.item.workExperience[props.cindex].projects[props.pindex].responsibilities.map((ele) => { return { "val": ele } }) 
    : []
);
  const handleOpenResponsibilities = () => {
    setResponsibilityList([...responsibilityList, { val: responsibility }]);
    props.onResponsibilityListChange(props.cindex, props.pindex, [
      ...responsibilityList,
      { val: responsibility },
    ]);
    setResponsibility("");
  };

  const removeItem = (ele) => {
    if (
      window.confirm(`Are you sure you want to remove selected responsibility ?`)
    ) {
     
      const newItems = responsibilityList.filter((i) => i !== ele);
      setResponsibilityList(newItems);
      props.onResponsibilityListChange(props.cindex, props.pindex, newItems);
     // console.log(newItems);
    }
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}>
          {Array.isArray(responsibilityList) && responsibilityList.length ? (
            <ul className="ultag">
              {responsibilityList.map((ele, index) => (
                <li>
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
      <Grid container spacing={2} sx={{ paddingBottom: "20px" }}>
        <Grid item xs={4.1}></Grid>
        <Grid item lg={6.9} sx={6.9}>
          <TextField
            style={{ width: "100%" }}
            Responsibilities
            value={responsibility}
            id="outlined-required"
            label="Project Responsibilities"
            defaultValue={''}
            placeholder="Enter your project responsibilities "
            onChange={(e) => setResponsibility(e.target.value)}
            required
            name="proResponsibilities"
          />
        </Grid>
        <Grid item lg={1} sx={1}>
          <Button
            variant="contained"
            onClick={handleOpenResponsibilities}
            style={{ padding: "12px 3px 15px 0px" , backgroundColor : "rgb(33, 80, 162)"}}
          >
            ADD
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Responsibility;
