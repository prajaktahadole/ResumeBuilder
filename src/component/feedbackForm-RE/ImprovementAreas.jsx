import { Grid, TextField } from "@mui/material";

const ImprovementAreas = ({
  isFeedbackEdit,
  feedbackform,
  errors,
  register,
}) => {
  return (
    <Grid container spacing={1}>
      <Grid xs={12} sm={12} lg={12} item>
        <TextField
          label="Improvement Areas"
          name="improvmentAreas"
          {...register("improvmentAreas")}
          multiline
          placeholder="Type improvement Areas"
          variant="outlined"
          rows={2}
          fullWidth
          required
          defaultValue={isFeedbackEdit ? feedbackform.improvmentAreas : ""}
          error={!!errors.improvmentAreas}
        ></TextField>
        {errors.improvmentAreas && (
          <p style={{ fontSize: 14, color: "red" }}>
            {errors.improvmentAreas?.message}
          </p>
        )}
      </Grid>
    </Grid>
  );
};
export default ImprovementAreas;
