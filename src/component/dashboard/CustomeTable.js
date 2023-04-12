import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom"
import "../../styles/resume.css"
import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { getResumeAllData } from '../../services/resumemaker-services'

const token = localStorage.getItem("token")

const config = {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, email, designation, resumeid) {
  return { name, email, designation, resumeid };
}

export default function CustomizedTables() {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      const res = await getResumeAllData(config);
      setData(res)
    }
    fetchdata()
    console.log("Data received: ", data);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow style={{ margin: "auto", alignContent: "center", textAlign: "center" }} >

            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell >Email</StyledTableCell>
            <StyledTableCell >Designation</StyledTableCell>
            <StyledTableCell >Resume UUID</StyledTableCell>
            <StyledTableCell >View</StyledTableCell>
            <StyledTableCell >Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody
          style={{ margin: "auto", alignContent: "center", textAlign: "center" }}>
          {data && Array.isArray(data) && data.length && data.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.personalDetails.empName}
              </StyledTableCell>
              <StyledTableCell >{row.personalDetails.email}</StyledTableCell>
              <StyledTableCell >{row.personalDetails.designation}</StyledTableCell>
              <StyledTableCell ><Link to={`/resumemakerui/resume/${row.id}`} style={{ textDecoration: "none" }}>{row.id}</Link></StyledTableCell>
              <StyledTableCell ><Link to={`/resumemakerui/resume/${row.id}`}><PreviewRoundedIcon /></Link></StyledTableCell>
              <StyledTableCell ><Link><DeleteRoundedIcon /></Link></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}