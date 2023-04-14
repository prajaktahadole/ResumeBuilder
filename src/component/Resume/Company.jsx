import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material'
import Responsibility from './Responsibility';

const Company = ({ onCompanyDataChange, onResponsibilityListChange }) => {
  const initialProject = {
    projectName: '',
    proDescription: '',
    proTechnologies: '',
    responsibilities: []
  }
  const initialCompany = {
    companyName: '',
    designation: '',
    startDate: '',
    endDate: '',
    projects: [initialProject],
  }

  const [companydata, setCompanydata] = useState([initialCompany]);
  const [project, setProject] = useState([initialProject]);

    const handleResponsibilityListChange = (cId,pId,newList) => {
      let tempCompanyData=[...companydata]
      tempCompanyData[cId].projects[pId].responsibilities=newList
      setCompanydata(tempCompanyData)
       
    };
 
  const handleCompanyInputChange = (e) => {
    const { name, value, id } = e.target;
    companydata[id] = {
      ...companydata[id],
      [name]: value
    }
    const updatedArr = companydata.reduce((acc, company, index) => {
      if (index === id) {
        acc.push({
          ...company,
          [name]: value
        })
      } else {
        acc.push(company)
      }
      return acc;
    }, [])
    setCompanydata(updatedArr);
    onCompanyDataChange(updatedArr);
  };

  const handleAddCompany = (e) => {
    setCompanydata([
      ...companydata, initialCompany
    ]);
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
    const [companyIndex, projectIndex] = id.split('/');
    const updatedCompanyData = [...companydata];
    const updatedProjects = [...updatedCompanyData[companyIndex].projects];
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      [name]: value
    };
    updatedCompanyData[companyIndex] = {
      ...updatedCompanyData[companyIndex],
      projects: updatedProjects
    };
    setCompanydata(updatedCompanyData);
  };

  const RemoveCompanies = (ele) => {
    if (window.confirm(`Are you sure you want to remove ${companydata}?`)) {
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
    <form id='Companyform' onSubmit={handleAddProject}>
      {companydata.map((company, cindex) => <div style={{ marginBottom: "20px" }} className='subContainer' >
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: "15px", marginRight: "5px" }}>
          <button style={{
            width: "30px",
            height: "30px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            fontSize: "25px",
            fontWeight: "bold",
            cursor: "pointer",
            borderRadius: "5px",
          }} onClick={RemoveCompanies}>X</button>
        </Grid>
        <Grid container spacing={2} >
          <Grid item xs={4} style={{ display: 'flex', alignItems: 'start' }}>
            <h3>Company:</h3>
          </Grid>
          <Grid item xs={8} >
            <TextField
              style={{ width: '100%' }}
              Company
              id={cindex}
              label="Company"
              placeholder="Enter your Company Name"
              required
              name='companyName'
              value={company.companyName}
              onChange={handleCompanyInputChange}
            />
          </Grid>

        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4} style={{ display: 'flex', alignItems: 'start' }}>
            <h3>Designation:</h3>
          </Grid>
          <Grid item xs={4} >
            <TextField
              style={{ width: '100%' }}
              Designation
              id={cindex}
              label="Designation"
              placeholder="Enter your Designation"
              required
              name='designation'
              value={company.designation}
              onChange={handleCompanyInputChange}
            />
          </Grid>
          <Grid item xs={2} >
            <TextField
              style={{ width: '100%' }}
              periodFrom
              id={cindex}
              label="Start"
              placeholder="Enter your Working Period in last  Company "
              required
              name='startDate'
              value={company.startDate}
              onChange={handleCompanyInputChange}
            />
          </Grid>
          <Grid item xs={2} >
            <TextField
              style={{ width: '100%' }}
              periodFrom
              id={cindex}
              label="End"
              placeholder="Enter your Working Period To "
              required
              name='endDate'
              value={company.endDate}
              onChange={handleCompanyInputChange}
            />
          </Grid>
        </Grid>



        {company.projects.map((project, pindex) => (
          <>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: "15px", marginRight: "5px" }}>
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
            <Grid container spacing={2} className='subprojectcls' >

              <Grid item xs={4} style={{ display: 'flex', alignItems: 'start' }}>
                <h3>Projects: </h3>
              </Grid>
              <Grid item xs={4} >
                <TextField
                  style={{ width: '100%' }}
                  Project Name
                  id={`${cindex}/${pindex}`}
                  label="Project Name"
                  placeholder="Enter Your Project Name"
                  required
                  onChange={handleProjectInputChange}
                  value={project.projectName}
                  name='projectName'

                />
              </Grid>
              <Grid item xs={4} >
                <TextField
                  style={{ width: '100%' }}
                  Project Technology
                  id={`${cindex}/${pindex}`}
                  label="Project Technology"
                  placeholder="Enter your Project Technology"
                  required
                  onChange={handleProjectInputChange}
                  value={project.proTechnologies}
                  name='proTechnologies'
                />
              </Grid>
              <Grid item xs={4} style={{ display: 'flex' }} >

              </Grid>

              <Grid item xs={8} >
                <TextField
                  style={{ width: '100%' }}
                  Description
                  id={`${cindex}/${pindex}`}
                  label="Project Description"
                  placeholder="Enter your project description"
                  required
                  onChange={handleProjectInputChange}
                  value={project.proDescription}
                  name='proDescription'
                />
              </Grid>

              <Grid item xs={4} style={{ display: 'flex', alignItems: 'start' }}>
                  
              </Grid>
              <Responsibility pindex={pindex} cindex={cindex} onResponsibilityListChange={handleResponsibilityListChange}/>
            </Grid>
          </>

        ))}

        {<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '20px' }}>
          <Button id={cindex} variant="contained" type="submit"  onClick={handleAddProject}>Add Projects</Button>
        </Grid>}

      </div>)}

      {<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '20px' }}>
        <Button variant="contained" type="submit" onClick={handleAddCompany}>Add company</Button>
      </Grid>}
    </form>
  );
};

export default Company;