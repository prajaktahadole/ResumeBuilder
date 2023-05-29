import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { getInterviewers } from "../../services/resumemaker-services";
import { useEffect, useState } from "react";


 function SelectOption({ onSelectInterviewer }) {
  const [interviewList, setInterviewList] = useState();
  const [selectedInterviewer, setSelectedInterviewer] = useState("");

  useEffect(() => {
    const getInterviewersData = async () => {
      try {
        const response = await getInterviewers({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        });
        setInterviewList(response.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    getInterviewersData();
  }, []);

  const handleInterviewerChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedInterviewer(selectedValue);
    onSelectInterviewer(selectedValue); // Call the callback function with the selected interviewer
  };

  return (
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">
      Interviewer
    </InputLabel>

    <Select
    sx={{ marginRight: "5px", width: "90%" }}
    label="Interviewer"
    value={selectedInterviewer}
    onChange={handleInterviewerChange}
    >
    {interviewList &&
          interviewList.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
    </Select>
    </FormControl>
  );
}

export default SelectOption;