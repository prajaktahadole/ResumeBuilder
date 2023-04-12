// import React, { useState } from 'react'
// import { Button, Grid } from '@mui/material';
// import Company from './Company';

// function AddNewCompany() {
//   const [add, setAdd] = useState([]);

//   const handleAddCompany = () => {
//     setAdd([...add, '']);

//   };

//   const handleCompanyChange = (index, value) => {
//     const newAdded = [...add];
//     newAdded[index] = value;
//     setAdd(newAdded);
//   };

//   const RemoveCompanies = (ele) => {
//     if (window.confirm(`Are you sure you want to remove ${add}?`)) {
//       const newItems = [...add];
//       newItems.splice(ele, 1);
//       setAdd(newItems);
//     }
//   };

//   return (
//     <div>
//       <Grid container>
//         <Grid item lg={12} sx={12}>
//           <h2 style={{ border: "0.1px solid #239ce2", backgroundColor: 'rgb(25,118,210)', textAlign: 'center', color: '#fff' }}>Work Experience</h2>
//         </Grid>
//       </Grid>
//       <Company add={add} handleAddCompany={handleAddCompany} />

//       {add.map((tag, index) => (
//         <>

//           <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: "15px", marginRight: "30px" }}>
//             <button style={{ width: "50px", height: "50px", backgroundColor: "red", color: "white", border: "none", fontSize: "25px", fontWeight: "bold" }} onClick={RemoveCompanies}>X</button>
//           </Grid>
//           <Company  />
//         </>

//       ))}

//       <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: "15px", marginRight: "30px" }}>
//         <Button variant="contained" onClick={handleAddCompany}>Add Company</Button>
//       </Grid>
//     </div>
//   )
// }

// export default AddNewCompany