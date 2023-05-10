import { Autocomplete, Box, TextField } from "@mui/material";
import React from "react";

const AutoCompleteCustome = ({ setTechnoList, technoList }) => {
  const [personName, setPersonName] = React.useState([]);

  const names =
    Array.isArray(technoList) &&
    technoList.map((technology) => technology.techName);
  const handleChange = (event, data) => {
    setPersonName(data);
    const newList =
      Array.isArray(technoList) &&
      technoList.map((tech) => {
        if (data.includes(tech.techName)) {
          return { ...tech, isSelected: true };
        } else {
          return { ...tech, isSelected: false };
        }
      });
    setTechnoList(newList);
  };
  return (
    <div>
      <Autocomplete
        multiple
        value={personName}
        id="combo-box-demo"
        options={names}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} label="Select Technologies" />
        )}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{
              color: "black",
              "& > img": { mr: 2, flexShrink: 0 },
            }}
            {...props}
          >
            {option}
          </Box>
        )}
      />
    </div>
  );
};

export default AutoCompleteCustome;
