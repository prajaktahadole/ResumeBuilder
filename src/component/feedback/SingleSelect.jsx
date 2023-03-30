import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { Fragment } from "react";
import { useState } from "react";

const SingleSelect = ({ name, ops, stateChanger }) => {
  const [select, setSelect] = useState("");
  if (name === "Relavant Experience") {
    if (select !== "") {
      console.log("state is goingto change");
      stateChanger(true);
    }
  }
  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  return (
    <Fragment>
      <FormControl size="small" fullWidth>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={select}
          label={name}
          onChange={handleChange}
        >
          {ops.map((op) => (
            <MenuItem value={op}>{op}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Fragment>
  );
};

export default SingleSelect;
