import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import { format } from 'date-fns';


const InterviewRoundnType = ({
  setInterviewType,
  interviewType,
  errors,
  interviewRound, interviewDate,
  setInterviewRound,
  register,
}) => {
  const formattedDate = format(interviewDate, 'yyyy-MM-dd');

  const [date, setDate] = useState("");
  const currentDate = new Date().toISOString().split('T')[0];
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  useEffect(() => {
    setDate(currentDate);
  }, [currentDate]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4} lg={4}>
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
      <Grid item xs={12} sm={4} lg={4}>
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
      <Grid xs={12} sm={4} lg={4} item>
        <FormControl fullWidth>
          <TextField
              style={{ width: "100%" }}
              type="date"
              id="outlined-required"
              label="Interview Date"
              name="interviewDate"
              {...register("interviewDate")}
              defaultValue={formattedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: currentDate,
                required: true,
              }}
          />
          {errors.interviewDate && (
              <p style={{ fontSize: 14, color: "red" }}>
                {errors.interviewDate?.message}
              </p>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
};
export default InterviewRoundnType;
