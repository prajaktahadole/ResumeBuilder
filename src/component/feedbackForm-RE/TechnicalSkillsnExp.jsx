import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,

} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewLangToSkill,
  setTechnologyList,
  setselectedMultipleLang,
} from "../../reduxToolkit/Resume/resumeSlice";
import Rating from "./Rating";

const TechnicalSkillsnExp = ({
  totalExperience,
  setTotalExperience,
  errors,
  register,
}) => {
  let dispatch = useDispatch();
  const {
    languageListArray,
    selectedMultipleLang,
    currentTechnologyList,
    languageToSkill,
    newLangToSkill,
  } = useSelector((state) => state.resume);

  useEffect(() => {
    let tempCurrentList = { ...currentTechnologyList };
    if (selectedMultipleLang.length) {
     
      let tempList = {};
      selectedMultipleLang.map((item, idx) => {
        let tempObj = {};
        newLangToSkill[item].forEach((ele) => {
          if (!tempList[ele.skillName]) {
            tempObj[ele.skillName] = { ...ele };
          }
        });
        tempList = { ...tempList, ...tempObj };
      });
      dispatch(setTechnologyList(tempList));
    }
  }, [selectedMultipleLang]);
  const handleChange = (e) => {
    dispatch(setselectedMultipleLang(e));
  };
  const handleRateChange = (e, index) => {
    //put conditions for numbers like less than greater than
    let tempObj = { ...currentTechnologyList };
    let obj = { ...tempObj[index] };
    obj.rating = e;
    tempObj[index] = obj;
    dispatch(setTechnologyList(tempObj));
    //change in main state
    tempObj = { ...newLangToSkill };
    tempObj[obj.techName] = tempObj[obj.techName].map((ele) => {
      if (ele.skillName === obj.skillName) {
        let tempSkillObj = { ...ele };
        tempSkillObj.rating = e;
        return tempSkillObj;
      }
      return ele;
    });
    dispatch(setNewLangToSkill(tempObj));
  };

  return (
    <>
      <Typography
        variant="h6"
        style={{ maxWidth: "95%", padding: "5px", textAlign: "left" }}
      >
        Technical Skills
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Autocomplete
            multiple
            value={selectedMultipleLang}
            id="combo-box-demo"
            options={languageListArray}
            onChange={(_, data) => {
              handleChange(data);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Technologies" />
            )}
            renderOption={(props, option) => (
              <Box
                component={"li"}
                sx={{ color: "black", "&>img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option}
              </Box>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Total Experience *
            </InputLabel>
            <Select
              value={totalExperience}
              label="Total Experience"
              name="expereince"
              {...register("experience")}
              onChange={(e) => setTotalExperience(e.target.value)}
              required
            >
              <MenuItem value={"0-2"}>0-2</MenuItem>
              <MenuItem value={"2-5"}>2-5</MenuItem>
              <MenuItem value={"5-8"}>5-8</MenuItem>
              <MenuItem value={"8-10"}>8-10</MenuItem>
              <MenuItem value={"8-10"}>10-12</MenuItem>
              <MenuItem value={"8-10"}>12-15</MenuItem>
            </Select>
            {!totalExperience && errors.experience && (
              <p style={{ fontSize: 14, color: "red" }}>
                {errors.experience?.message}
              </p>
            )}
          </FormControl>
        </Grid>
        {/* Nested Grid */}
        {Object.keys(currentTechnologyList).map((ele) => {
          return (
            <Grid item xs={4} md={4} p={2} >
              
                <Grid container justifyContent={"space-between"} alignItems="center" padding={"5px"} boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}>
                  <Grid item style={{ width: "80%", wordWrap: 'break-word', textAlign: 'start' }}>{ele}</Grid>
                  <Grid  item style={{ width: "20%", }}> 
                  <Rating 
                  index={ele}
                  rating={currentTechnologyList[ele].rating}
                  onChange={handleRateChange}
                /></Grid>
                </Grid>
            
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default TechnicalSkillsnExp;
