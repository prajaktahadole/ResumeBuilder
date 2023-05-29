import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { array } from "yup";
import {
  setMultiNotificationData,
  setMultiNotificationVariant,
} from "../../reduxToolkit/Notification/notificationSlice";
import { useDispatch } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function FormRow({
  technologyList,
  setTechnologyList,
  isSoftskill,
  handleSoftSkillRatingsChange,
  setValue,
  handleTechRatingsChange,
}) {
  const [skillRatings, setSkillRatings] = useState([]);
  const [techStackRating, setTechStackRating] = useState([]);
  const [techSkills, setTechSkills] = useState([]);
  const [inputError, setInputError] = useState(false);
  const uniqueSkills = new Set();

  const updatedTechnologyList = technologyList &&
    Array.isArray(technologyList) && technologyList.map(tech => {
      const { techId, techSkills, ...rest } = tech; // Destructuring assignment to remove techSkills array
      const updatedTechSkills = techSkills && Array.isArray(techSkills) && techSkills.map(({ techSkillId, ...skill }) => skill); // Destructuring assignment to remove techSkillId from techSkills array
      return { ...rest, techSkills: updatedTechSkills }; // Combine rest of the properties with updated techSkills array
    });
  // Initialize the softSkillRatings array with default values
  useEffect(() => {
    const defaultRatings =
      technologyList &&
      Array.isArray(technologyList) &&
      technologyList.map((skill) => ({
        skillName: skill.skillName,
        rating: 0,
      }));
    setSkillRatings(defaultRatings);
  }, [technologyList]);

  const dispatch = useDispatch();

  const renderSkill = (skill) => {
    return (
      <Grid item xs={4}>
        <Item>
          <Grid container justifyContent={"space-between"} alignItems="center">
            <Grid  item style={{ width: "70%", wordWrap: 'break-word', textAlign: 'start' }}>{skill.skillName}</Grid>
            <Grid item style={{ width: "30%", }}>
              <FormControl
                sx={{ maxWidth: 75 }}
                size="small"
                variant="outlined"
              >
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment
                      position="end"
                      style={{ fontWeight: "800", }}
                    >
                      /  5
                    </InputAdornment>
                  }
                  onChange={(e) => {
                    if (isSoftskill) handleSoftSKillRatingChange(e, skill);
                    else handleRatingChange(e, skill);
                  }}
                 
                  onKeyPress={(e) => {
                    const charCode = e.which || e.keyCode;
                    if (charCode < 49 || charCode > 53 || e.target.value.length >= 1) {
                      e.preventDefault();
                      dispatch(setMultiNotificationVariant("error"));
                      const errorArray = [
                        {
                          propertyValue: "Please enter a single digit between 1 and 5",
                        },
                      ];
                      dispatch(setMultiNotificationData(errorArray));
                    }
                  }}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                    min: 1,
                    max: 5,
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Item>
      </Grid>
    );
  };

  const handleSoftSKillRatingChange = (e, skill) => {
    const ratings =
      Array.isArray(technologyList) &&
      technologyList.map((eg) => {
        if (eg.skillName === skill.skillName) {
          if (
            !isNaN(e.target.value) &&
            e.target.value >= 0 &&
            e.target.value <= 5
          ) {
            setInputError(false);
          } else {
            setInputError(true);
          }
          return { ...eg, rating: e.target.value };
        } else {
          // Preserve the previous rating for skills that don't match
          const existingSkillRating = skillRatings.find(
            (r) => r.skillName === eg.skillName
          );
          return existingSkillRating || eg;
        }
      });
    setSkillRatings(ratings);
    handleSoftSkillRatingsChange(ratings);
    setValue("softSkillRatings", ratings);
  };

  const handleRatingChange = (e, skill) => {

    const ratings =
      updatedTechnologyList &&
      Array.isArray(updatedTechnologyList) &&
      updatedTechnologyList.map((eg) => {
        const tech =
          eg.techSkills &&
          Array.isArray(eg.techSkills) &&
          eg.techSkills.map((techskill) => {

            if (techskill.skillName === skill.skillName) {
              // Update the current rating for the matching skill
              return { ...techskill, rating: e.target.value };
            } else {
              // Preserve the previous rating for skills that don't match
              const existingSkillRating = techSkills.find(
                (r) => r.skillName === techskill.skillName
              );

              return existingSkillRating
                ? { ...existingSkillRating, rating: 0 }
                : techskill;
            }
          });
        return { ...eg, techSkills: tech };
      });

    setTechStackRating(ratings);

    const filteredTechnologyList = ratings.filter(item => item.isSelected);
    const cleanedFilteredTechnologyList = filteredTechnologyList.map(({ isSelected, ...rest }) => rest);
    setTechnologyList(ratings); // Update the technologyList state with the updated ratings
    handleTechRatingsChange(technologyList);

    setValue("technologyRating", cleanedFilteredTechnologyList);
  };

  return (
    <React.Fragment>
      {isSoftskill &&
        technologyList &&
        Array.isArray(technologyList) &&
        technologyList.map((skill) => renderSkill(skill))}
      {technologyList &&
        Array.isArray(technologyList) &&
        technologyList
          .filter((t) => t.isSelected)
          .map((tech) =>
            tech.techSkills
              .filter((skill) => !uniqueSkills.has(skill.skillName))
              .map((skill) => {
                uniqueSkills.add(skill.skillName);
              
                if (tech.isSelected) {
                  // Check if the technology is selected
                  return renderSkill(skill, uniqueSkills);
                } else {
                  return null; // Return null for skills whose technology is not selected
                }
              })
          )}

    </React.Fragment>
  );
}

export default function NestedGrid({
  technologyList,
  setTechnologyList,
  setValue,
  isSoftskill,
  handleSoftSkillRatingsChange,
  handleTechRatingsChange,
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <FormRow
            setValue={setValue}
            technologyList={technologyList}
            setTechnologyList={setTechnologyList}
            isSoftskill={isSoftskill}
            handleSoftSkillRatingsChange={handleSoftSkillRatingsChange}
            handleTechRatingsChange={handleTechRatingsChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
