import { Button, Grid, TextField } from "@mui/material";

const Submit = ({ handleSubmit, submitFormdata }) => {
  return (
    <Grid container spacing={1}>
      <Grid xs={12} item>
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
