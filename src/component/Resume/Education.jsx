import { Grid, TextField } from '@mui/material'
import React from 'react'

function Education() {
    return (
        <>
            <Grid container>
                <Grid item lg={12} sx={12}>
                    <h2 style={{ border: "0.1px solid #239ce2", backgroundColor: '#239ce2', textAlign: 'center', color: '#fff' }}>Education Details</h2>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={2} style={{ display: 'flex', alignItems: 'start' }}>
                    <h3>Higher Qualification:</h3>
                </Grid>
                <Grid item xs={10} >
                    <TextField
                        style={{ width: '100%' }}
                        Degree
                        id="outlined-required"
                        label="Degree"
                        placeholder="Enter your Degree"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={2} style={{ display: 'flex', alignItems: 'start' }}>
                    <h3>university:</h3>
                </Grid>
                <Grid item xs={10} >
                    <TextField
                        style={{ width: '100%' }}
                        university
                        id="outlined-required"
                        label="university"
                        placeholder="Enter your university"
                    />
                </Grid>

            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={2} style={{ display: 'flex', alignItems: 'start' }}>
                    <h3>passingYear:</h3>
                </Grid>
                <Grid item xs={10} >
                    <TextField
                        style={{ width: '100%' }}
                        passing Year
                        id="outlined-required"
                        label="passing Year"
                        placeholder="Enter your passing Year"
                    />

                </Grid>

            </Grid>
        </>
    )
}

export default Education