import { Button } from "@mui/material";
import React, { useState } from "react";

const ImageUploadPreviewComponent = ({handleFiles }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [selectedPreview, setSelectedPreview] = useState(null);

  const handleFile = (e) => {
    let file = e.target.files;
    setFiles(prevFiles => {
      const newFiles = [];
      for (let i = 0; i < file.length; i++) {
        newFiles.push(file[i]);
      }
      handleFiles(newFiles);
      return [...prevFiles, ...newFiles];
    });

    const selectedFiles = Array.from(e.target.files);
    const previewsArray = [];
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previewsArray.push({ file, preview: reader.result });
        if (previewsArray.length === selectedFiles.length) {
          setPreviews([...previews, ...previewsArray]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (i) => {
    setFiles(files.filter(x => x.name !== i));
  }


  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);

    const previewsArray = [];
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previewsArray.push({ file, preview: reader.result });
        if (previewsArray.length === selectedFiles.length) {
          setPreviews([...previews, ...previewsArray]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (file) => {
    const updatedFiles = files.filter((f) => f !== file);
    setFiles(updatedFiles);

    const updatedPreviews = previews.filter((p) => p.file !== file);
    setPreviews(updatedPreviews);

    if (selectedPreview && selectedPreview.file === file) {
      setSelectedPreview(null);
    }
  };

  const handlePreviewClick = (preview) => {
    setSelectedPreview(preview);
  };

  const handleClosePreview = () => {
    setSelectedPreview(null);
  };

  return (
    <>
      <div>
        <label>Upload Image : </label>

        <Button variant="contained"
         component="label"
         style={{backgroundColor: "rgb(33, 80, 162)"}}
         onChange={handleFile}>
          Upload
          <input hidden accept="image/*" multiple type="file" />
        </Button>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
        {previews.map((preview) => (
          <div>
          <div
            key={preview.preview}
            style={{
              position: "relative",
              width: "100px",
              height: "100px",
              backgroundImage: `url(${preview.preview})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              margin: "0.5rem",
              cursor: "pointer",
            }}
            onClick={() => handlePreviewClick(preview)}
            >
            </div>
            <button
              onClick={() => handleDelete(preview.file)}
              style={{

                top: "5px",
                right: "5px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>

          ))}
        </div>
        {selectedPreview && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",zIndex:5,
          }}
          onClick={handleClosePreview}
        >
          <img
            src={selectedPreview.preview}
            alt={selectedPreview.file.name}
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
            }}
          />
        </div>
      )}
      </div>
    </>
  );
}

export default ImageUploadPreviewComponent;







