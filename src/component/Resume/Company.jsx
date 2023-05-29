  import React, { useState } from "react";
  import {
    Grid,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    IconButton,
  } from "@mui/material";
  import Responsibility from "./Responsibility";
  import {
    setMultiNotificationData,
    setMultiNotificationVariant,
  } from "../../reduxToolkit/Notification/notificationSlice";
  import { useDispatch } from "react-redux";
  import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

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
      isCurrentCompany: false,
      projects: [initialProject],
    };

    const dispatch = useDispatch();

    const [companydata, setCompanydata] = useState(
      isEdit ? item.workExperience : [initialCompany]
    );
    const [project, setProject] = useState(
      isEdit ? item.workExperience[0] : [initialProject]
    );
    //const [isCurrentCompany, setIsCurrentCompany] = useState(false);

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
      e.preventDefault();
      if (
        companydata.length > 0 &&
        companydata[companydata.length - 1].company === ""
      ) {
        // Show error message
        dispatch(setMultiNotificationVariant("error"));
        const errorArray = [
          {
            propertyValue:
              "Please enter data for the previously added company before adding another one.",
          },
        ];
        dispatch(setMultiNotificationData(errorArray));
        return;
      }

      setCompanydata([...companydata, initialCompany]);
    };

    const handleAddProject = (e) => {
      e.preventDefault();
      const cid = e.target.id;
      if (
        companydata[cid] &&
        companydata[cid].projects &&
        companydata[cid].projects.length === 0
      ) {
        dispatch(setMultiNotificationVariant("error"));
        const errorArray = [
          {
            propertyValue:
              "Please add the first project before adding another project.",
          },
        ];
        dispatch(setMultiNotificationData(errorArray));
        return;
      }

      const lastProject =
        companydata[cid].projects[companydata[cid].projects.length - 1];

      if (
        !lastProject.projectName.trim() ||
        !lastProject.description.trim() ||
        lastProject.responsibilities.length === 0
      ) {
        dispatch(setMultiNotificationVariant("error"));
        const errorArray = [
          {
            propertyValue:
              "Please fill in the details for the previous added project before adding another project.",
          },
        ];
        dispatch(setMultiNotificationData(errorArray));
        return;
      }

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

    const removeCompany = (index) => {
      if (window.confirm("Are you sure you want to remove this company?")) {
        const updatedCompanyData = [...companydata];
        updatedCompanyData.splice(index, 1);
        setCompanydata(updatedCompanyData);
        onCompanyDataChange(updatedCompanyData);
      }
    };

    const RemoveProject = (cIndex, pIndex) => {
      if (window.confirm(`Are you sure you want to remove this project?`)) {
        const updatedCompanyData = [...companydata];
        updatedCompanyData[cIndex].projects.splice(pIndex, 1);
        setCompanydata(updatedCompanyData);
      }
    };

    const handleCurrentCompanyChange = (event, index) => {
      const { checked } = event.target;
      const newCompanyData = [...companydata];
      newCompanyData[index] = {
        ...newCompanyData[index],
        isCurrentCompany: checked,
        periodTo: checked ? "Present" : "", // Set the end date as "Present" if checked, otherwise empty string
      };
      setCompanydata(newCompanyData);
      onCompanyDataChange(newCompanyData);
    };

    const today = new Date();
    const maxDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}`;

    return (
      <form id="Companyform" onSubmit={handleAddProject}>
        {Array.isArray(companydata) &&
          companydata &&
          companydata.map((company, cindex) => (
            <div style={{ marginBottom: "20px" }} className="subContainer">
              <Grid item xs={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        isEdit &&
                        item.workExperience?.[cindex]?.periodTo === "Present"
                          ? true
                          : company.isCurrentCompany
                      }
                      onChange={(event) =>
                        handleCurrentCompanyChange(event, cindex)
                      }
                      name="isCurrentCompany"
                      color="primary"
                    />
                  }
                  label="Currently working here ?"
                />
              </Grid>
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
                type="button"
                  style={{ border: "None", backgroundColor: "transparent"}}
                  //onClick={RemoveCompanies}
                  onClick={() => removeCompany(cindex)}
                >
                  <IconButton size="small" color="error">
                          <DeleteRoundedIcon   style={{
                          cursor: "pointer",
                        }} />
                        </IconButton>
                </button>
              </Grid>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={4}
                  style={{ display: "flex", alignItems: "start" }}
                >
                  <h3>Company:</h3>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    style={{ width: "100%" }}
                    Company
                    id={cindex}
                    label="Company"
                    placeholder="Enter your Company Name"
                    name="company"
                    required
                    value={company.company}
                    onChange={handleCompanyInputChange}
                    defaultValue={isEdit ? item.workExperience.company : ""}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={4}
                  style={{ display: "flex", alignItems: "start" }}
                >
                  <h3>Designation:</h3>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    style={{ width: "100%" }}
                    Designation
                    id={cindex}
                    label="Designation"
                    placeholder="Enter your Designation"
                    name="jobRole"
                    defaultValue={isEdit ? item.workExperience.jobRole : ""}
                    value={company.jobRole}
                    onChange={handleCompanyInputChange}
                  />
                </Grid>
                <Grid item xs={2.5}>
                  <TextField
                    style={{ width: "100%" }}
                    periodFrom
                    id={cindex}
                    type="month"
                    label="Start"
                    //placeholder="Start Date"
                    defaultValue={isEdit ? item.workExperience.periodFrom : ""}
                    name="periodFrom"
                    value={company.periodFrom}
                    onChange={handleCompanyInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      max: maxDate, // Set the maximum selectable date
                    }}
                  />
                </Grid>
                <Grid item xs={2.5}>
                  {company.isCurrentCompany ||
                  (isEdit &&
                    item.workExperience?.[cindex]?.periodTo === "Present") ? (
                    <TextField
                      style={{ width: "100%" }}
                      periodFrom
                      id={cindex}
                      //type="month"
                      label="End"
                      //placeholder="End Date"
                      defaultValue={isEdit ? item.workExperience.periodTo : ""}
                      name="periodTo"
                      value={company.periodTo}
                      onChange={handleCompanyInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  ) : (
                    <TextField
                      style={{ width: "100%" }}
                      periodFrom
                      id={cindex}
                      type="month"
                      label="End"
                      //placeholder="End Date"
                      defaultValue={isEdit ? item.workExperience.periodTo : ""}
                      name="periodTo"
                      value={company.periodTo}
                      onChange={handleCompanyInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        max: maxDate, // Set the maximum selectable date
                      }}
                    />
                  )}
                </Grid>
              </Grid>

              {Array.isArray(company.projects) &&
                company.projects.map((project, pindex) => (
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
                      type="button"
                        style={{ border: "None", backgroundColor: "transparent"}}
                        id={`${cindex}/${pindex}`}
                        //onClick={() => RemoveProject(pindex, project, setProject)}
                        onClick={() =>
                          RemoveProject(cindex, pindex, project, setProject)
                        }
                      >
                        <IconButton size="small" color="error">
                          <DeleteRoundedIcon   style={{
                          cursor: "pointer",
                        }} />
                        </IconButton>
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
                          defaultValue={
                            isEdit ? item.workExperience.projectName : ""
                          }
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
                          onChange={handleProjectInputChange}
                          value={project.description}
                          name="description"
                          defaultValue={
                            isEdit ? item.workExperience.description : ""
                          }
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
                        onResponsibilityListChange={
                          handleResponsibilityListChange
                        }
                        defaultValue={
                          isEdit ? item.workExperience.responsibility : " "
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
                    style={{ backgroundColor: "rgb(33, 80, 162)" }}
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
              style={{ backgroundColor: "rgb(33, 80, 162)" }}
            >
              Add company
            </Button>
          </Grid>
        }
      </form>
    );
  };

  export default Company;
