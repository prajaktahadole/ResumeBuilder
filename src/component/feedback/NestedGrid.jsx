import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function FormRow({ technologyList, setTechnologyList, isSoftskill }) {
  console.log("setTechnologyList", setTechnologyList);
  const renderSkill = (skill) => {
    return (
      <Grid item xs={4}>
        <Item>
          <Grid container justifyContent={"space-between"} alignItems="center">
            <Grid item>{skill.name}</Grid>
            <Grid item>
              <FormControl
                sx={{ maxWidth: 75 }}
                size="small"
                variant="outlined"
              >
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">/10</InputAdornment>
                  }
                  onChange={(e) => {
                    if (isSoftskill) handleRatingChange(e, skill);
                    else handleSoftSKillRatingChange(e, skill);
                  }}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
                {/* <FormHelperText id="outlined-weight-helper-text">
        Weight
      </FormHelperText> */}
              </FormControl>
            </Grid>
          </Grid>
        </Item>
      </Grid>
    );
  };

  const handleSoftSKillRatingChange = (e, skill) => {};

  const handleRatingChange = (e, skill) => {
    const tech = [...technologyList];
    for (let t of tech) {
      for (let s of t.skills) {
        if (s.name === skill.name) {
          s.rating = e.target.value;
        }
      }
    }
    setTechnologyList(tech);
  };
  console.log(technologyList);
  return (
    <React.Fragment>
      {isSoftskill &&
        technologyList[0].skills.map((skill) => renderSkill(skill))}

      {technologyList
        .filter((t) => t.isSelected)
        .map((tech) => tech.skills.map((skill) => renderSkill(skill)))}
    </React.Fragment>
  );
}

export default function NestedGrid({
  technologyList,
  setTechnologyList,
  isSoftskill,
}) {
  // console.log("nested", technologyList);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <FormRow
            technologyList={technologyList}
            setTechnologyList={setTechnologyList}
            isSoftskill={isSoftskill}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
