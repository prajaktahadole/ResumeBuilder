import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { display } from "@mui/system";
import React, { useState } from "react";
import resume from "../../styles/resume.css"
import Education from "./Education";
import SkillSets from "./SkillSets";
import Company from "./Company";
import { useNavigate } from 'react-router-dom';

function Resume() {
  const [summary, setSummary] = useState('');
  const [summaryList, setSummaryList] = useState([]);
  const [married, setMarried] = useState('');
  const [gender, setGender] = useState('');

  const navigate = useNavigate()

  const handleSummary = () => {
    setSummaryList([...summaryList, { val: summary }])
  }

  const handleChangeStatus = (event) => {
    setMarried(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  }


  const removeItem = (ele) => {
    if (window.confirm(`Are you sure you want to remove ${summaryList}?`)) {
      console.log("first", ele)
      const newItems = summaryList.filter((i) => i !== ele);
      setSummaryList(newItems);
      console.log(newItems)
    }
  };
  const getSumbitData = () => {
    const form = document.getElementById("myForm"); // replace 'myForm' with the ID of your form element
    console.log("Form data", form.elements)
    const str = [];
    summaryList.forEach((ele) => {
      str.push(ele.val);
    });
    const personalDetails = {
      personalDetails: {
        empName: form.elements.fullName.value,
        email: form.elements.email.value,
        designation: form.elements.mainDesignation.value,
        mobileNo: form.elements.mobileNo.value,
        address: form.elements.address.value,
        gender: gender,
        maritalStatus: married,
      },
      skillSet: {
        technologies: form.elements.technologies.value,
        languages:  form.elements.languages.value,
        tools:  form.elements.tools.value,
        databaseUsed:  form.elements.databaseUsed.value,
        operatingSystems:  form.elements.operatingSystems.value,
        ideUsed:  form.elements.ideUsed.value,
        webServer:  form.elements.webServer.value,
      },
      professionalSummary: {
        summaryDetails: str,
      },
      educationDetails: {
        degree:  form.elements.degree.value,
        university:  form.elements.university.value,
        passingYear:  form.elements.passingYear.value,
      },
     workExperience : [
        {
          company: form.elements.company.value,
          jobRole: form.elements.desigination.value,
          periodFrom: form.elements.periodFrom.value,
          periodTo: form.elements.periodTo.value,
          projects : [
            {
              projectName: form.elements.projectName.value,
              description: form.elements.description.value,
              proTechnologies: form.elements.proTech.value,
              responsibilities : [
                form.elements.proResponsibilities.value
              ]
            }
          ]  
        }
    ]
    };

    const personalDetailsJSON = JSON.stringify(personalDetails);
    console.log("personalDetailsJSON", personalDetailsJSON)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    getSumbitData();
  }


  return (
    <>
    <form id="myForm">
      <div className="container">
        <div className="main">
          <div >
          <h1>Resume</h1>
          <Button style={{  width : "20%" ,height:"40px",
                    fontSize:"15px" ,fontWeight: "bolder",  
                    left:"78%" , margin:"-100px 0px 0px 0px"}} 
                    variant="contained" 
                    onClick={() => navigate('/resumemakerui/preview')}>Resume Preview</Button>
          </div>
        
          <div className="detail subContainer">
            <div className="row">
              <TextField
                Name
                id="outlined-required"
                label="Name"
                placeholder="Enter your Name"
                required
                name="fullName"
              />
              <TextField
                Email
                id="outlined-required"
                label="Email"
                placeholder="Enter your email"
                required
                name="email"
              />
            </div>

            <div className="row">
              <TextField
                Title
                id="outlined-required"
                label="Title"
                placeholder="Enter your Designation"
                required
                name="mainDesignation"
              />
              <TextField
                Enter Phone
                id="outlined-required"
                label="Enter Phone"
                placeholder="Enter Your phone Number"
                required
                name="mobileNo"
              />
            </div>
            <div className="row" style={{ textAlign: 'left' }}>
              <TextField
                Address
                id="outlined-required"
                label="Address"
                placeholder="Enter your Address"
                required
                name="address"
              />
             
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>

                <Select

                  value={gender}
                  label="Gender"
                  onChange={handleChangeGender}
                  required
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>


            </div>
            <div style={{ textAlign: 'left' }}>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">MaritalStatus</InputLabel>

                <Select
                  sx={{ width: '49%' }}
                  value={married}
                  label="MaritalStatus"
                  onChange={handleChangeStatus}
                  required
                >
                  <MenuItem value={"Married"}>Married</MenuItem>
                  <MenuItem value={"Unmarried"}>Unmarried</MenuItem>
                  <MenuItem value={"Divorce"}>Divorce</MenuItem>
                </Select>
              </FormControl>
      
            </div>
          </div>
          <div>
            <h2 style={{ border: "0.1px solid #239ce2", backgroundColor: 'rgb(25,118,210)', textAlign: 'center', color: '#fff' }}>Professional Summary</h2>
          </div>
          <div className="detail subContainer">
            {Array.isArray(summaryList) && summaryList.length ? <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>{summaryList.map((ele, index) => <li>{ele.val}<Button onClick={() => removeItem(ele)}>x</Button></li>)} </ul> : " "}
            <div className="row">
              <TextField
                Summary
                id="outlined-required"
                value={summary}
                label="Summary"
                placeholder="Enter your summary"
                onChange={(e) => setSummary(e.target.value)}
                required
              />
              <Button onClick={handleSummary} variant="contained">Add</Button>
            </div>
          </div>
        
          <SkillSets />
       
          <Education />
          <Company/>
          <Button style={{  width : "25%" ,padding: "10px",
           fontSize:"15px" ,fontWeight: "bolder",  left:"38%" ,
            margin:"25px 0px 25px 0px"}}  variant="contained" 
            onClick={handleSubmit} >Submit Data</Button>
        </div>
      </div>
      </form>
    </>
  )
}
export default Resume

