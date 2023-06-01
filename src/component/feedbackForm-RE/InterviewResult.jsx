import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

const InterviewResult = ({ errors, result, setResult, register }) => {
  return (
    <Grid container spacing={1}>
      <Grid xs={12} sm={6} lg={6} item>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Interview Result *
          </InputLabel>
          <Select
            value={result}
            label="Interview Result"
            name="result"
            {...register("result")}
            onChange={(e) => setResult(e.target.value)}
            required
          >
            <MenuItem value={"SELECTED"}>Selected</MenuItem>
            <MenuItem value={"REJECTED"}>Rejected</MenuItem>
            <MenuItem value={"HOLD"}>Hold</MenuItem>
          </Select>
          {!result && errors.result && (
            <p style={{ fontSize: 14, color: "red" }}>
              {errors.result?.message}
            </p>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
};
export default InterviewResult;
