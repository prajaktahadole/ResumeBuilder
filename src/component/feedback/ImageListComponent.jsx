import React , {useState} from 'react';
import "../../styles/FeedbackPrev.css";

export default function ImageListComponent(props) {
  const { attachments } = props;

  const [showPreview, setShowPreview] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  function handleClick(image) {
    setCurrentImage(image);
    setShowPreview(true);
  }

  function handleClose() {
    setShowPreview(false);
  }
  return (
    <div>
     <div  style={{display:'flex', flexDirection:'row'}}>
      {attachments && Array.isArray(attachments) && attachments.map((imageUrl, index) => (
        <div key={index}  onClick={() => handleClick(imageUrl)}>
          <img style={{ height: '100px', width: '100px' , margin:"10px"}} src={imageUrl} alt={`Preview ${index + 1}`} />
        </div>
      ))}
    </div>

    <div>

      {showPreview && (
        <div className="modal" onClick={handleClose}>
          <div className="modal-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <img src={currentImage} alt="Preview" className="preview" />
          </div>
        </div>
      )}
    </div>
 </div>
   
  );
}
