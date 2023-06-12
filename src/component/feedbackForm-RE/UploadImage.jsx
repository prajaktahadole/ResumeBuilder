import { Grid } from "@mui/material";
import ImageUploadPreviewComponent from "../feedback/ImageUploadPreviewComponent";
import ImageListComponent from "../feedback/ImageListComponent";

const UploadImage = ({ files }) => {
  return (
    <Grid container spacing={1}>
      <Grid xs={12} sm={12} lg={12} item>
         {/*<ImageUploadPreviewComponent attachments={files} isEdit={true} handleFiles={handleFiles} />*/}
        <ImageListComponent attachments={files} />
        <p
          style={{
            fontSize: 12,
            color: "black",
            marginTop: "10px",
          }}
        >
            Note: Please upload images in PNG and JPEG format only and Multiple images can be added with a size limit of 5 MB for all images..
        </p>
      </Grid>
    </Grid>
  );
};
export default UploadImage;
