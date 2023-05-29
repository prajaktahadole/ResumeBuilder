import { Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import { setSoftSkillList } from "../../reduxToolkit/Resume/resumeSlice";

const SoftSkills = () => {
  let dispatch = useDispatch();
  const { currentSoftSkillList } = useSelector((state) => state.resume);
  const handleChange = (e, index) => {
    let tempObj = { ...currentSoftSkillList };
    tempObj[index] = e;
    dispatch(setSoftSkillList(tempObj));
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          style={{
            maxWidth: "95%",
            marginBottom: "5px",
            padding: "5px",
            textAlign: "left",
          }}
        >
          Soft Skills
        </Typography>
      </Grid>
      {Object.keys(currentSoftSkillList).map((ele, index) => {
        return (
          <Grid item xs={4} md={4} p={2}>
              <Grid container  justifyContent={"space-between"} alignItems="center" padding={"5px"} boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"} width={"100%"}>
              <Grid item style={{ width: "80%", wordWrap: 'break-word', textAlign: 'start' }}>{ele}</Grid>
              <Grid  item style={{ width: "20%", }}> 
              <Rating
              item xs={1}
                index={ele}
                rating={currentSoftSkillList[ele]}
                onChange={handleChange}
              />
              </Grid>
          </Grid>
          </Grid>
        );
      })}
      {/* Nested grid */}
    </Grid>
  );
};
export default SoftSkills;
