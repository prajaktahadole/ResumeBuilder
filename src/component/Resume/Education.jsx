import { Grid, TextField } from '@mui/material'
import React,  { useState } from 'react'

function Education({ item, isEdit = false, register, errors, validationSchema }) {

    return (
        <>
            <Grid container>
                <Grid item xs={12} lg={12} sx={12}>
                    <h2 style={{ border: "0.1px solid #239ce2", backgroundColor: 'rgb(33, 80, 162)', textAlign: 'center', color: '#fff' }}>Education Details</h2>
                </Grid>
            </Grid>
            <div className='subContainer'>
                <Grid container 
                    xs={{display: "flex"}}
                    sm={{
                        '@media (max-width: 600px)': {
                            display: "flex",
                            flexDirection : 'column' ,
                            width : "100%",
                        },
                        }}>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <h3 style={{margin : '5px'}}>Higher Qualification:</h3>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8} lg={8}>
                        <TextField
                            style={{width:'100%' , marginBottom: '7px'}}
                            Degree
                            id="outlined-required"
                            label="Higher Qualification"
                            placeholder="Enter Your Higher Qualification"
                            defaultValue={isEdit ? item.educationDetails.degree : ''}
                            required
                            name='degree'
                            {...register("degree",{ validate: validationSchema })}
                            error={!!errors.degree}
                            helperText={errors.degree?.message}
                        />
                    </Grid>
                </Grid>

                <Grid container 
                    xs={{display: "flex"}}
                    sm={{
                        '@media (max-width: 600px)': {
                            display: "flex",
                            flexDirection : 'column' ,
                            width : "100%",
                        },
                        }}>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <h3  style={{margin : '5px'}}>University:</h3>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8} lg={8} >
                        <TextField
                            style={{width:'100%' , marginBottom: '7px'}}
                            university
                            id="outlined-required"
                            label="University"
                            placeholder="Enter Your University"
                            required
                            name='university'
                            defaultValue={isEdit ? item.educationDetails.university : ''}
                            {...register("university",{ validate: validationSchema })}
                            error={!!errors.university}
                            helperText={errors.university?.message}
                        />
                    </Grid>

                </Grid>

                <Grid container 
                    xs={{display: "flex"}}
                    sm={{
                        '@media (max-width: 600px)': {
                            display: "flex",
                            flexDirection : 'column' ,
                            width : "100%",
                        },
                        }}>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <h3  style={{margin : '5px'}}>Passing Year :</h3>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8} lg={8} >
                        <TextField
                            style={{width:'100%' , marginBottom: '7px'}}
                            passing Year
                            id="outlined-required"
                            label="Passing Year"
                            placeholder="Enter Your Passing Year"
                            required
                            name='passingYear'
                            type='year'
                            inputProps={{
                              pattern: "\\d{0,4}", // Regex pattern to allow up to 10 digits
                              maxLength: 4, // Maximum length of 10
                            }}
                            defaultValue={isEdit ? item.educationDetails.passingYear : ''}
                            {...register("passingYear",{ validate: validationSchema })}
                            error={!!errors.passingYear}
                            helperText={errors.passingYear?.message}
                        />

                    </Grid>

                </Grid>
            </div>
        </>
    )
}

export default Education