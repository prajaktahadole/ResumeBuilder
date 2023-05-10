import { Button, Grid, IconButton, InputBase, Paper, TextField } from '@mui/material'
import React from 'react'
import CustomizedTables from './CustomeTable'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import FeedbackDashboard from '../feedback/FeedbackDashboard';


const Dashboard = () => {
    const navigate = useNavigate()

    return (
        <>
            <Grid item xs={12} paddingTop={'30px'} >
                {(localStorage.getItem("role") === "INTERVIEWER") ? <FeedbackDashboard /> : <CustomizedTables />
                }
            </Grid>  
        </>
    )
}

export default Dashboard