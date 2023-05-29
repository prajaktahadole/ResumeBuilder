import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

const InterviewRoundnType = ({
  setInterviewType,
  interviewType,
  errors,
  interviewRound,
  setInterviewRound,
  register,
}) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={6} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Interview Type *
          </InputLabel>
          <Select
            value={interviewType}
            label="Interview Type"
            name="interviewType"
            {...register("interviewType")}
            onChange={(e) => setInterviewType(e.target.value)}
            required
          >
            <MenuItem value={"The_Converge"}>The Converge</MenuItem>
            <MenuItem value={"Humancloud_Internal"}>
              Humancloud Internal
            </MenuItem>
          </Select>
          {!interviewType && errors.interviewType && (
            <p style={{ fontSize: 14, color: "red" }}>
              {errors.interviewType?.message}
            </p>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Interview Round *
          </InputLabel>
          <Select
            value={interviewRound}
            label="Interview Round"
            name="interviewRound"
            {...register("interviewRound")}
            onChange={(e) => setInterviewRound(e.target.value)}
            required
          >
            <MenuItem value={"L1"}>Level 1</MenuItem>
            <MenuItem value={"L2"}>Level 2</MenuItem>
            <MenuItem value={"L3"}>Level 3</MenuItem>
          </Select>
          {!interviewRound && errors.interviewRound && (
            <p style={{ fontSize: 14, color: "red" }}>
              {errors.interviewRound?.message}
            </p>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
};
export default InterviewRoundnType;
