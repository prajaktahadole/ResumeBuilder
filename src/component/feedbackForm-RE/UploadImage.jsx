import { Grid } from "@mui/material";
import ImageUploadPreviewComponent from "../feedback/ImageUploadPreviewComponent";
import ImageListComponent from "../feedback/ImageListComponent";

const UploadImage = ({ handleFiles, files }) => {
  console.log("handleFiles-->",files)
  return (
    <Grid container spacing={1}>
      <Grid xs={12} sm={12} lg={12} item>
        {/* <ImageUploadPreviewComponent handleFiles={handleFiles} /> */}
        <ImageListComponent attachments={files} />
        {files.length === 0 ? (
          <p
            style={{
              fontSize: 12,
              color: "red",
              marginTop: "10px",
            }}
          >
            Note: Please upload at least one screenshot in .png or .jpeg format.
          </p>
        ) : null}
        <p
          style={{
            fontSize: 12,
            color: "black",
            marginTop: "10px",
          }}
        >
          Note: Multiple images can be added with a size limit of 5 MB for all
          images.
        </p>
      </Grid>
    </Grid>
  );
};
export default UploadImage;
