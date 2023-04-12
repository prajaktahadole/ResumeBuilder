// import React, { useState } from 'react';
// import { Grid, TextField } from '@mui/material'
// import Responsibility from './Responsibility';

// const Project = () => {
//   const [projectData, setProjectData] = useState({
//     projectName: '',
//     projectTechnology: '',
//     projectDescription: ''
//   });

//   const handleProjectInputChange = (e) => {
//     const { name, value } = e.target;
//     setProjectData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleAddCompany = (e) => {
//     e.preventDefault();
//     console.log('Project data:', projectData);
  
//   };



//   return (
//     <form id='ProjectForm' onSubmit={handleAddCompany}>
//       <Grid container spacing={2} className='subprojectcls' >

//         <Grid item xs={4} style={{ display: 'flex', alignItems: 'start' }}>
//           <h3>Projects: </h3>
//         </Grid>
//         <Grid item xs={4} >
//           <TextField
//             style={{ width: '100%' }}
//             Project Name
//             id="outlined-required"
//             label="Project Name"
//             placeholder="Enter Your Project Name"
//             required
//             value={projectData.projectName}
//             onChange={handleProjectInputChange}
//           />
//         </Grid>
//         <Grid item xs={4} >
//           <TextField
//             style={{ width: '100%' }}
//             Project Technology
//             id="outlined-required"
//             label="Project Technology"
//             placeholder="Enter your Project Technology"
//             required
//             value={projectData.projectTechnology}
//             onChange={handleProjectInputChange}
//           />
//         </Grid>
//         <Grid item xs={4} style={{ display: 'flex' }} >

//         </Grid>

//         <Grid item xs={8} >
//           <TextField
//             style={{ width: '100%' }}
//             Description
//             id="outlined-required"
//             label="Project Description"
//             placeholder="Enter your project description"
//             required
//             value={projectData.projectDescription}
//             onChange={handleProjectInputChange}
//           />
//         </Grid>

//         <Grid item xs={4} style={{ display: 'flex', alignItems: 'start' }}>

//         </Grid>
//         <Responsibility />


//       </Grid>
//     </form>

//   );
// };

// export default Project;

