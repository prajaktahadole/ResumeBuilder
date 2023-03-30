import { Button, Grid, IconButton, InputBase, Paper, TextField } from '@mui/material'
import React from 'react'
import CustomizedTables from './CustomeTable'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const navigate = useNavigate()

    return (
        <Grid container width={'100%'} paddingTop={'30px'} >

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Paper
                    component="form"
                    sx={{ display: 'flex', alignItems: 'center', width: 300 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search name"
                        inputProps={{ 'aria-label': 'search name' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>

                </Paper>
                <Button variant='contained' onClick={() => navigate('/resume')}>Create Resume +</Button>
            </Grid>
            <Grid item xs={12} paddingTop={'30px'}>
                <CustomizedTables />
            </Grid>

        </Grid>
    )
}

export default Dashboard