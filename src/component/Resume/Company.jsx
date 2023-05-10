import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import Responsibility from "./Responsibility";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import { CheckBox } from "@mui/icons-material";

const Company = ({
  onCompanyDataChange,
  onResponsibilityListChange,
  item,
  isEdit = false,
}) => {
  const initialProject = {
    projectName: "",
    description: "",
    technologies: "",
    responsibilities: [],
  };
  const initialCompany = {
    company: "",
    jobRole: "",
    periodFrom: "",
    periodTo: "",
    projects: [initialProject],
  };

  const [companydata, setCompanydata] = useState(
    isEdit ? item.workExperience : [initialCompany]
  );
  const [project, setProject] = useState(
    isEdit ? item.workExperience[0] : [initialProject]
  );

  const [selectedStartDate, setSelectedStartDate] = useState(format(new Date(), "MMM-yyyy"));

  const [selectedEndDate, setSelectedEndDate] = useState(
    format(new Date(), "MMM-yyyy")
  );

  const handleStartDateChange = (date) => {
    setSelectedStartDate(format(date, "MMM-yyyy"));
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(format(date, "MMM-yyyy"));
  };

  useEffect(() => {
    console.log("Selected Start Date:", selectedStartDate);
  }, [selectedStartDate]);
  
  useEffect(() => {
    console.log("Selected End Date:", selectedEndDate);
  }, [selectedEndDate]);

  const handleResponsibilityListChange = (cId, pId, newList) => {
    const str1 = [];
    newList.forEach((el) => {
      str1.push(el.val);
    });
    let tempCompanyData = [...companydata];
    tempCompanyData[cId].projects[pId].responsibilities = str1;
    setCompanydata(tempCompanyData);
    onCompanyDataChange(tempCompanyData);
  };

  const handleCompanyInputChange = (e) => {
    const { name, value, id } = e.target;
    companydata[id] = {
      ...companydata[id],
      [name]: value,
      
    };
    const updatedArr = companydata.reduce((acc, company, index) => {
      if (index === id) {
        acc.push({
          ...company,
          [name]: value,
        });
      } else {
        acc.push(company);
      }
      return acc;
    }, []);
    setCompanydata(updatedArr);
    onCompanyDataChange(updatedArr);
  };

  const handleAddCompany = (e) => {
    setCompanydata([...companydata, initialCompany]);
  };
  const handleAddProject = (e) => {
    const cid = e.target.id;
    const newCompanyData = companydata.map((company, index) => {
      if (index !== parseInt(cid)) {
        return company;
      }
      return {
        ...company,
        projects: [...company.projects, initialProject],
      };
    });

    setCompanydata(newCompanyData);
    onCompanyDataChange(newCompanyData);
  };

  const handleProjectChange = (index, value) => {
    const newCompany = [...project];
    newCompany[index] = value;
    setProject(newCompany);
  };

  const handleProjectInputChange = (e) => {
    const { name, value, id } = e.target;
    const [companyIndex, projectIndex] = id.split("/");
    const updatedCompanyData = [...companydata];
    const updatedProjects = [...updatedCompanyData[companyIndex].projects];
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      [name]: value,
    };
    updatedCompanyData[companyIndex] = {
      ...updatedCompanyData[companyIndex],
      projects: updatedProjects,
    };
    setCompanydata(updatedCompanyData);
  };

  const RemoveCompanies = (ele) => {
    if (window.confirm(`Are you sure you want to remove ?`)) {
      const newItems = [...companydata];
      newItems.splice(ele, 1);
      setCompanydata(newItems);
    }
  };

  const RemoveProject = (index) => {
    if (window.confirm(`Are you sure you want to remove this project?`)) {
      const newItems = [...project];
      newItems.splice(index, 1);
      setProject(newItems);
    }
  };

  return (
    <form id="Companyform" onSubmit={handleAddProject}>
      {companydata.map((company, cindex) => (
        <div style={{ marginBottom: "20px" }} className="subContainer">
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "15px",
              marginRight: "5px",
            }}
          >
            <button
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                fontSize: "25px",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "5px",
              }}
              onClick={RemoveCompanies}
            >
              X
            </button>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4} style={{ display: "flex", alignItems: "start" }}>
              <h3>Company:</h3>
            </Grid>
            <Grid item xs={8}>
              <TextField
                style={{ width: "100%" }}
                Company
                id={cindex}
                label="Company"
                placeholder="Enter your Company Name"
                required
                name="company"
                value={company.company}
                onChange={handleCompanyInputChange}
                defaultValue={isEdit ? item.workExperience.company : ""}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4} style={{ display: "flex", alignItems: "start" }}>
              <h3>Designation:</h3>
            </Grid>
            <Grid item xs={4}>
              <TextField
                style={{ width: "100%" }}
                Designation
                id={cindex}
                label="Designation"
                placeholder="Enter your Designation"
                required
                name="jobRole"
                defaultValue={isEdit ? item.workExperience.jobRole : ""}
                value={company.jobRole}
                onChange={handleCompanyInputChange}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                style={{ width: "100%" }}
                periodFrom
                id={cindex}
                label="Start"
                placeholder="Start Date"
                required
                defaultValue={isEdit ? item.workExperience.periodFrom : ""}
                name="periodFrom"
                value={company.periodFrom}
                onChange={handleCompanyInputChange}
              />
              {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  label="Start Date"
                  id={cindex}
                  views={["year", "month"]}
                  onChange={handleStartDateChange}
                  maxDate = {new Date()}
                  format="MMM-yyyy"
                  inputVariant="outlined"
                  value={selectedStartDate}
                  autoOk
                />
              </MuiPickersUtilsProvider> */}
            </Grid>
            <Grid item xs={2}>
              <TextField
                style={{ width: "100%" }}
                periodFrom
                id={cindex}
                label="End"
                placeholder="End Date"
                required
                defaultValue={isEdit ? item.workExperience.periodTo : ""}
                name="periodTo"
                value={company.periodTo}
                onChange={handleCompanyInputChange}
              />
              {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  label="End Date"
                  id={cindex}
                  views={["year", "month"]}
                  onChange={handleEndDateChange}
                  maxDate = {new Date()}
                  format="MMM-yyyy"
                  value={selectedEndDate}
                  inputVariant="outlined"
                  autoOk
                />
              </MuiPickersUtilsProvider> */}
            </Grid>
          </Grid>

          {company.projects.map((project, pindex) => (
            <>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "15px",
                  marginRight: "5px",
                }}
              >
                <button
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    fontSize: "25px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                  id={`${cindex}/${pindex}`}
                  onClick={() => RemoveProject(pindex, project, setProject)}
                >
                  X
                </button>
              </Grid>
              <Grid container spacing={2} className="subprojectcls">
                <Grid
                  item
                  xs={4}
                  style={{ display: "flex", alignItems: "start" }}
                >
                  <h3>Projects: </h3>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    style={{ width: "100%" }}
                    Project
                    Name
                    id={`${cindex}/${pindex}`}
                    label="Project Name"
                    placeholder="Enter Your Project Name"
                    required
                    defaultValue={isEdit ? item.workExperience.projectName : ""}
                    onChange={handleProjectInputChange}
                    value={project.projectName}
                    name="projectName"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    style={{ width: "100%" }}
                    Project
                    Technology
                    id={`${cindex}/${pindex}`}
                    label="Project Technology"
                    placeholder="Enter your Project Technology"
                    required
                    onChange={handleProjectInputChange}
                    value={project.technologies}
                    name="technologies"
                    defaultValue={
                      isEdit ? item.workExperience.technologies : ""
                    }
                  />
                </Grid>
                <Grid item xs={4} style={{ display: "flex" }}></Grid>

                <Grid item xs={8}>
                  <TextField
                    style={{ width: "100%" }}
                    Description
                    id={`${cindex}/${pindex}`}
                    label="Project Description"
                    placeholder="Enter your project description"
                    required
                    onChange={handleProjectInputChange}
                    value={project.description}
                    name="description"
                    defaultValue={isEdit ? item.workExperience.description : ""}
                  />
                </Grid>

                <Grid
                  item
                  xs={4}
                  style={{ display: "flex", alignItems: "start" }}
                ></Grid>
                <Responsibility
                  pindex={pindex}
                  cindex={cindex}
                  onResponsibilityListChange={handleResponsibilityListChange}
                  defaultValue={
                    isEdit ? item.workExperience.responsibility : ""
                  }
                  item={item}
                  isEdit={isEdit}
                />
              </Grid>
            </>
          ))}

          {
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "20px",
              }}
            >
              <Button
                id={cindex}
                variant="contained"
                type="submit"
                style={{backgroundColor: "rgb(33, 80, 162)"}}
            
                onClick={handleAddProject}
              >
                Add Projects
              </Button>
            </Grid>
          }
        </div>
      ))}

      {
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "20px",
            
          }}
        >
          <Button 
          variant="contained" 
          type="submit"
          onClick={handleAddCompany}
          style={{backgroundColor: "rgb(33, 80, 162)"}}
          >
            Add company
          </Button>
        </Grid>
      }
    </form>
  );
};

export default Company;
