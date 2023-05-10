import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Education from "./Education";
import SkillSets from "./SkillSets";
import Company from "./Company";
import { useNavigate } from "react-router-dom";
import { editResumeById, resumeSave } from "../../services/resumemaker-services";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


function Resume({ item, isEdit = false, id }) {
  const [summary, setSummary] = useState("");
  const [summaryList, setSummaryList] = useState(isEdit ? item.professionalSummary.summaryDetails.map((ele) => { return { "val": ele } }) : []);
  const [married, setMarried] = useState(isEdit ? item.personalDetails.maritalStatus : "");
  const [gender, setGender] = useState(isEdit ? item.personalDetails.gender : "");

  const navigate = useNavigate();
  const handleSummary = () => {
   
    setSummaryList([...summaryList, { val: summary }]);
    setSummary("");

  };
  
  const handleChangeStatus = (event) => {
  setMarried(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const [workExperience, setWorkExperience] = useState(isEdit ? item.workExperience : []);

  const handleCompanyDataChange = (newCompanyData) => {
    setWorkExperience(newCompanyData);
  };


  const removeItem = (ele) => {
    if (window.confirm(`Are you sure you want to remove select summary ?`)) {
      const newItems = summaryList.filter((i) => i !== ele);
      setSummaryList(newItems);
    }
  };

   const EditItem = (ele, index) => {
    if (window.confirm(`Are you sure you want to edit summary ?`)) {
      const newSummaryList = [...summaryList];
      newSummaryList[index] = { ...newSummaryList[index], isEditing: true };
      setSummaryList(newSummaryList);
    }

  };

    const saveItem = (ele, index, value) => {
    const newSummaryList = [...summaryList];
    newSummaryList[index] = { ...newSummaryList[index], val: value, isEditing: false };
    setSummaryList(newSummaryList);
  };


  const validateForm = () => {
    const form = document.getElementById("myForm");
    const fullName = form.elements.fullName.value;
    const email = form.elements.email.value;
    const designation= form.elements.mainDesignation.value;
    const mobileNo= form.elements.mobileNo.value;
    const address= form.elements.address.value;
    // const technologies = form.elements.technologies.value;
    // const languages = form.elements.languages.value;
    // const tools = form.elements.tools.value;
    // const databaseUsed = form.elements.databaseUsed.value;
    // const operatingSystems = form.elements.operatingSystems.value;
    // const degree = form.elements.degree.value;
    // const university = form.elements.university.value;
    // const passingYear = form.elements.passingYear.value;
 

    function validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    }

    if (!fullName || fullName.trim() === '') {
      alert("Please enter your Name.");
      return false;
    }
  
    if (!email || email.trim() === '') {
      alert("Please enter your Email.");
      return false;
    }else if(!validateEmail(email)){
      alert('Invalid email');
      return false;
    }

    if (!designation || designation.trim() === '') {
      alert("Please enter your Designation.");
      return false;
    }
  

    if (!mobileNo || mobileNo.trim() === '' ) {
      alert("Please enter your Mobile No.");
      return false;
    }else if( mobileNo=== Number || mobileNo.length !== 10)
    {
      alert("Invalid Mobile no");
      return false;
    }

    // if (!address || address.trim() === '') {
    //   alert("Please enter your Address.");
    //   return false;
    // }

    if(summaryList.length === 0){
      alert("Please Enter Summary")
      return false;
    }
    
    if ( gender === "") {
      alert("Please Select your Gender.");
      return false;
    }

    if( married === ""){
      alert("Please Select Marital status")
      return false;
    }

    
    // if (!technologies || technologies.trim() === '') {
    //   alert("Please enter your Technologies.");
    //   return false;
    // }
    
    // if (!languages || languages.trim() === '') {
    //   alert("Please enter your languages.");
    //   return false;
    // }

    // if (!tools || tools.trim() === '') {
    //   alert("Please enter your Tools.");
    //   return false;
    // }

    // if (!databaseUsed || databaseUsed.trim() === '') {
    //   alert("Please enter your DatabaseUsed.");
    //   return false;
    // }
    
    // if (!operatingSystems || operatingSystems.trim() === '') {
    //   alert("Please enter your Operating Systems.");
    //   return false;
    // }

    // if (!degree || degree.trim() === '') {
    //   alert("Please enter your Higher Qualification.");
    //   return false;
    // }

    // if (!university || university.trim() === '') {
    //   alert("Please enter your University.");
    //   return false;
    // }
    
    // if (!passingYear || passingYear.trim() === '') {
    //   alert("Please enter your passing Year.");
    //   return false;
    // }

    // if(workExperience.length === 0){
    //   alert("Please Enter atleast 1 work experience")
    //   return false;
    // }else{
    //   for(var i = 0; i < workExperience.length; i++){

    //     if(workExperience[i].company === "")
    //     {
    //        alert("Please Enter Company Name")
    //        return false;
    //      }
    //      else if(workExperience[i].jobRole === "")
    //      {
    //        alert("Please Enter Job Role")
    //        return false;
    //      }
    //      else if(workExperience[i].periodFrom === "")
    //      {
    //        alert("Please Enter Starting Period Date")
    //        return false;
    //      }
    //      else if(workExperience[i].projects.length === 0)
    //      {
    //        alert("please enter project details")
    //        return false;
    //      }
    //     //  else if(workExperience[i].projects.length !== 0){
    //       else{
    //       for(var j = 0; j <workExperience[i].projects.length; j++ )
    //       {
    //           if(workExperience[i].projects[i].projectName === ""){
    //             alert("Please Enter Project Name")
    //             return false;
    //           }else  if(workExperience[i].projects[i].description === ""){
    //             alert("Please Enter Project Description")
    //             return false;
    //           }else  if(workExperience[i].projects[i].technologies === ""){
    //             alert("Please Enter Project technologies")
    //             return false;
    //           }
    //           else  if(workExperience[i].projects[i].technologies.length === ""){
    //             alert("Please Enter Project technologies")
    //             return false;
    //           }  
    //           return true;
    //       }
         
    //      }
    //      return false
    //    }
    // }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("myForm");
    const str = [];
    summaryList.forEach((ele) => {
      str.push(ele.val);
    });

    const isValid = validateForm();
    if (isValid) {
      const personalDetails = {
        personalDetails: {
          empName: form.elements.fullName.value,
          email: form.elements.email.value,
          designation: form.elements.mainDesignation.value,
          mobileNo: form.elements.mobileNo.value,
          address: form.elements.address.value,
          gender: gender,
          maritalStatus: married,
        linkedinURL: form.elements.linkedin.value
        },
        skillSet: {
          technologies: form.elements.technologies.value,
          languages: form.elements.languages.value,
          tools: form.elements.tools.value,
          databaseUsed: form.elements.databaseUsed.value,
          operatingSystems: form.elements.operatingSystems.value,
          ideUsed: form.elements.ideUsed.value,
          webServer: form.elements.webServer.value,
        },
        professionalSummary: {
          summaryDetails: str,
        },
        educationDetails: {
          degree: form.elements.degree.value,
          university: form.elements.university.value,
          passingYear: form.elements.passingYear.value,
        },
        workExperience,
      };
      const data = JSON.stringify(personalDetails);
  
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      };
      let res;
      if (isEdit) {
        res = await editResumeById(id, config, data)
      } else {
        res = await resumeSave(config, data);
      }
  
      if (res.code === '200') {
        alert("Resume saved successfully");
        navigate("/resumemakerui/dashboard");
      } else {
        alert('Something went wrong');
      }
  
    }

  
  };

  const inputRefs = useRef([]);

  const handleKeyDown = (e, currentIndex) => {
  
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentIndex < inputRefs.current.length - 1) {
        inputRefs.current[currentIndex + 1].focus();
      } else if (currentIndex === inputRefs.current.length - 1 && summary !== "") {
        // If last input field and summary is not empty, add the summary
        handleSummary();
      } else {
       
      }
    }
  };
  

  return (
    <>
      <form id="myForm">
        <div className="containerResume">
          <div className="main">
            <div>
              <h1>Resume</h1>
            </div>

            <div className="detail subContainer">
              <div className="row">
                <TextField
                  Name
                  id="outlined-required"
                  label="Name"
                  defaultValue={isEdit ? item.personalDetails.empName : ''}
                  placeholder="Enter your Name"
                  required
                  name="fullName"
                  inputRef={(el) => (inputRefs.current[0] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 0)}
                />
                <TextField
                  Email
                  id="outlined-required"
                  label="Email"
                  defaultValue={isEdit ? item.personalDetails.email : ''}
                  placeholder="Enter your email"
                  required
                  name="email"
                  type="email"
                  inputRef={(el) => (inputRefs.current[1] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 1)}
                />
              </div>

              <div className="row">
                <TextField
                  Title
                  id="outlined-required"
                  label="Title"
                  defaultValue={isEdit ? item.personalDetails.designation : ''}
                  placeholder="Enter your Designation"
                  required
                  name="mainDesignation"
                  inputRef={(el) => (inputRefs.current[2] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 2)}
                />
                <TextField
                  Enter
                  Phone
                  id="outlined-required"
                  label="Enter Phone"
                  defaultValue={isEdit ? item.personalDetails.mobileNo : ''}
                  placeholder="Enter Your phone Number"
                  required
                  name="mobileNo"
                  inputRef={(el) => (inputRefs.current[3] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 3)}
                />
              </div>
              <div className="row" style={{ textAlign: "left" }}>
                  <TextField
                  LinkedIn
                  id="outlined-required"
                  label="LinkedIn URL"
                  placeholder="Enter your linkedin profile URL"
                  defaultValue={isEdit ? item.personalDetails.linkedinURL : ''}
                  required
                  name="linkedin"
                  inputRef={(el) => (inputRefs.current[4] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 4)}
                />
                 <TextField
                  Address
                  id="outlined-required"
                  label="Address"
                  placeholder="Enter your Address"
                  defaultValue={isEdit ? item.personalDetails.address : ''}
                  required
                  name="address"
                  inputRef={(el) => (inputRefs.current[5] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 5)}
                />
               
              </div>
                <div className="row" style={{ textAlign: "left" }}>
                 <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>

                  <Select
                    value={gender}
                    label="Gender"
                    onChange={handleChangeGender}
                    required
                    inputRef={(el) => (inputRefs.current[6] = el)}
                    onKeyDown={(e) => handleKeyDown(e, 6)}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>

                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">MaritalStatus</InputLabel>

                  <Select
                    value={married}
                    label="MaritalStatus"
                    onChange={handleChangeStatus}
                    required
                    inputRef={(el) => (inputRefs.current[7] = el)}
                    onKeyDown={(e) => handleKeyDown(e, 7)}
                  >
                    <MenuItem value={"Married"}>Married</MenuItem>
                    <MenuItem value={"Unmarried"}>Unmarried</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div>
              <h2
                style={{
                  border: "0.1px solid #239ce2",
                  backgroundColor: "rgb(33, 80, 162)",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Professional Summary
              </h2>
            </div>
            <div className="detail subContainer">
              {Array.isArray(summaryList) && summaryList.length ? (
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  {summaryList.map((ele, index) => (
                    <li>
                      {ele.val}

                      <Button
                        style={{
                          margin: "10px",
                          width: "10px",
                          height: "30px",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                        variant="contained"
                      onClick={() => EditItem(ele)}>
                      <IconButton
                          type="button" sx={{ p: "20px", color:'white' }} aria-label="edit"
                          >
                          <EditOutlinedIcon />
                        </IconButton>
                      </Button>


                      <Button onClick={() => removeItem(ele)}>
                      <IconButton
                          size="small"
                          color="error">
                          <DeleteRoundedIcon />
                        </IconButton>
                      </Button>
                    </li>
                  ))}{" "}
                </ul>
              ) : (
                " "
              )}
              <div className="row">
                <TextField
                  Summary
                  id="outlined-required"
                  value={summary}
                  label="Summary"
                  placeholder="Press Enter Key to Add Summary"
                  onChange={(e) => setSummary(e.target.value)}
                  required
                  inputRef={(el) => (inputRefs.current[8] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 8)}
                />
            
              </div>
            </div>

            <SkillSets item={item} isEdit={isEdit}   />

            <Education item={item} isEdit={isEdit}   />
            <div>
              <h2
                style={{
                  border: "0.1px solid #239ce2",
                  backgroundColor: "rgb(33, 80, 162)",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
               Work Experience 
              </h2>
            </div>

            <Company
              item={item} isEdit={isEdit}
              onCompanyDataChange={handleCompanyDataChange}
           
            />

            {isEdit ? <Button
              style={{
                width: "25%",
                padding: "10px",
                fontSize: "15px",
                fontWeight: "bolder",
                left: "38%",
                margin: "25px 0px 25px 0px",
                backgroundColor : "rgb(33, 80, 162)"

              }}
              variant="contained"
              onClick={handleSubmit}>Update Data</Button>
              :
              <Button
                style={{
                  width: "25%",
                  padding: "10px",
                  fontSize: "15px",
                  fontWeight: "bolder",
                  left: "38%",
                  margin: "25px 0px 25px 0px",
                  backgroundColor : "rgb(33, 80, 162)"
                }}
                variant="contained"
                onClick={handleSubmit}
              >
                Submit Data
              </Button>}


          </div>
        </div>
      </form>
    </>
  );
}
export default Resume;
