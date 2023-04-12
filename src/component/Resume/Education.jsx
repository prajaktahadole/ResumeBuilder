import { Grid, TextField } from '@mui/material'
import React from 'react'

function Education() {
    return (
        <>
            <Grid container>
                <Grid item lg={12} sx={12}>
                    <h2 style={{ border: "0.1px solid #239ce2", backgroundColor: 'rgb(25,118,210)', textAlign: 'center', color: '#fff' }}>Education Details</h2>
                </Grid>
            </Grid>
            <div className='subContainer'>
            <Grid container spacing={2}>
                <Grid item xs={4} style={{ display: 'flex', alignItems: 'start' }}>
                    <h3>Higher Qualification:</h3>
                </Grid>
                <Grid item xs={8} >
                    <TextField
                        style={{ width: '100%' }}
                        Degree
                        id="outlined-required"
                        label="Higher Qualification"
                        placeholder="Enter Your Higher Qualification"
                        required
                        name='degree'
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4} style={{ display: 'flex', alignItems: 'start' }}>
                    <h3>University:</h3>
                </Grid>
                <Grid item xs={8} >
                    <TextField
                        style={{ width: '100%' }}
                        university
                        id="outlined-required"
                        label="University"
                        placeholder="Enter Your University"
                        required
                        name='university'
                    />
                </Grid>

            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4} style={{ display: 'flex', alignItems: 'start' }}>
                    <h3>Passing Year :</h3>
                </Grid>
                <Grid item xs={8} >
                    <TextField
                        style={{ width: '100%' }}
                        passing Year
                        id="outlined-required"
                        label="Passing Year"
                        placeholder="Enter Your Passing Year"
                        required
                        name='passingYear'
                    />

                </Grid>

            </Grid>
            </div>
        </>
    )
}

export default Education