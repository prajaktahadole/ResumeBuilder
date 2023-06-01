import { Button, Grid, TextField } from "@mui/material";

const Submit = ({ handleSubmit, submitFormdata }) => {
  console.log(submitFormdata, "submitFormdata", handleSubmit, "handleSubmit");
  return (
    <Grid container spacing={1}>
      <Grid xs={12} sm={12} lg={12} item>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          id="submit"
          style={{ backgroundColor: "rgb(33, 80, 162)" }}
          onClick={handleSubmit(submitFormdata)}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};
export default Submit;
