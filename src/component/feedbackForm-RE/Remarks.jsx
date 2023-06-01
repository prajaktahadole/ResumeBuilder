import { Grid, TextField } from "@mui/material";

const Remarks = ({ isFeedbackEdit, feedbackform, errors, register }) => {
  return (
    <Grid container spacing={1}>
      <Grid xs={12} sm={12} lg={12} item>
        <TextField
          label="Remark"
          name="comments"
          {...register("comments")}
          multiline
          placeholder="Type your message"
          variant="outlined"
          rows={2}
          fullWidth
          required
          error={!!errors.comments}
          defaultValue={isFeedbackEdit ? feedbackform.comments : ""}
        ></TextField>
        {errors.comments && (
          <p style={{ fontSize: 14, color: "red" }}>
            {errors.comments?.message}
          </p>
        )}
      </Grid>
    </Grid>
  );
};
export default Remarks;
