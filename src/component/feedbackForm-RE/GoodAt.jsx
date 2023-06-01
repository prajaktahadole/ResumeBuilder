import { Grid, TextField } from "@mui/material";

const GoodAt = ({ isFeedbackEdit, feedbackform, errors, register }) => {
  return (
    <Grid container spacing={1}>
      <Grid xs={12} sm={12} lg={12} item>
        <TextField
          label="Good At"
          name="goodAt"
          {...register("goodAt")}
          multiline
          placeholder="Type Good At"
          variant="outlined"
          rows={2}
          fullWidth
          required
          defaultValue={isFeedbackEdit ? feedbackform.goodAt : ""}
          error={!!errors.goodAt}
        ></TextField>
        {errors.goodAt && (
          <p style={{ fontSize: 14, color: "red" }}>{errors.goodAt?.message}</p>
        )}
      </Grid>
    </Grid>
  );
};
export default GoodAt;
