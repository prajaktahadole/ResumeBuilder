import { InputAdornment, TextField } from "@mui/material";
import {
  setMultiNotificationData,
  setMultiNotificationVariant,
} from "../../reduxToolkit/Notification/notificationSlice";
import { useDispatch } from "react-redux";

const Rating = ({ onChange, rating, index }) => {
  const dispatch = useDispatch();
  return (
    <TextField
      value={rating}
      onChange={(e) => onChange(e.target.value, index)}
      onKeyPress={(e) => {
        const charCode = e.which || e.keyCode;
        if (charCode < 49 || charCode > 53 || e.target.value.length >= 1) {
          e.preventDefault();
          dispatch(setMultiNotificationVariant("error"));
          const errorArray = [
            {
              propertyValue: "Please enter a single digit between 1 and 5",
            },
          ];
          dispatch(setMultiNotificationData(errorArray));
        }
      }}
      endAdornment={
        <InputAdornment position="end" style={{ fontWeight: "800" }}>
          / 5
        </InputAdornment>
      }
    ></TextField>
  );
};
export default Rating;
