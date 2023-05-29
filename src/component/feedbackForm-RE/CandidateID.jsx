import { Grid, TextField } from "@mui/material";

const CandidateIDnName = ({
  isFeedbackEdit,
  feedbackform,
  errors,
  register,
}) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={6} sm={6}>
        <TextField
          label="Candidate Id"
          placeholder="Candidate Id"
          variant="outlined"
          name="candidateId"
          {...register("candidateId")}
          fullWidth
          required
          defaultValue={isFeedbackEdit ? feedbackform.candidateId : ""}
          error={!!errors.candidateId}
        />
        {errors.candidateId && (
          <p style={{ fontSize: 14, color: "red" }}>
            {errors.candidateId?.message}
          </p>
        )}
      </Grid>
      <Grid item xs={6} sm={6}>
        <TextField
          label="Candidate Name"
          placeholder="FirstName LastName"
          variant="outlined"
          name="candidateName"
          {...register("candidateName")}
          fullWidth
          required
          defaultValue={isFeedbackEdit ? feedbackform.candidateName : ""}
          error={!!errors.candidateName}
        />
        {errors.candidateName && (
          <p style={{ fontSize: 14, color: "red" }}>
            {errors.candidateName?.message}
          </p>
        )}
      </Grid>
    </Grid>
  );
};
export default CandidateIDnName;
