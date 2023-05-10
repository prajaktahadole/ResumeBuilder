import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightBold,
  };
}

export default function MultipleSelectPlaceholder({
  setTechnoList,
  technoList,
}) {
  const theme = useTheme();

  const [personName, setPersonName] = React.useState([]);
  const names =
    Array.isArray(technoList) &&
    technoList.map((technology) => technology.techName);
  const [techSkill, setTechSkill] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
    const newList =
      Array.isArray(technoList) &&
      technoList.map((tech) => {
        if (event.target.value.includes(tech.techName)) {
          return { ...tech, isSelected: true };
        } else {
          return { ...tech, isSelected: false };
        }
      });
    setTechSkill(newList);
    setTechnoList(newList);
  };

  return (
    <div>
      <FormControl fullWidth>
        <Select
          size="small"
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select Technologies</em>;
            }
            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Select Technologies</em>
          </MenuItem>
          {Array.isArray(names) &&
            names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
