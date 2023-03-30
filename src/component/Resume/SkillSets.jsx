import { Grid, TextField } from '@mui/material'
import React from 'react'
import resume from "../../style/resume.css"

function SkillSets() {
    return (
        <>
            <Grid container>
                <Grid item lg={12} sx={12}>
                    <h2 style={{ border: "0.1px solid #239ce2", backgroundColor: '#239ce2', textAlign: 'center', color: '#fff' }}>Skill Set</h2>
                </Grid>
            </Grid>

             <Grid container spacing={2}>
                <Grid item xs={2}style={{display:'flex',alignItems:'start'}}>
                    <h3>technologies :</h3>
                </Grid>
                <Grid item xs={10} >
                    <TextField
                        style={{width:'100%'}}
                        Technology Name
                        id="outlined-required"
                        label=" Technology Name"
                        placeholder="Enter your Technology Skills"
                    />
                </Grid>

            </Grid> 
           
            <Grid container spacing={2}>
                <Grid item xs={2} style={{display:'flex',alignItems:'start'}}>
                    <h3>languages:</h3>
                </Grid>
                <Grid item xs={10} >
                    <TextField
                      style={{width:'100%'}}
                      languages Name
                        id="outlined-required"
                        label="languages Name"
                        placeholder="Enter your languages"
                    />
                </Grid>

            </Grid> 
           
            <Grid container spacing={2}>
                <Grid item xs={2} style={{display:'flex',alignItems:'start'}}>
                    <h3>tools :</h3>
                </Grid>
                <Grid item xs={10} >
                    <TextField
                     style={{width:'100%'}}
                        Tools Name
                        id="outlined-required"
                        label=" Tools Name"
                        placeholder="Enter your Technology Tools"
                    />
                </Grid>

            </Grid> 
            <Grid container spacing={2}>
                <Grid item xs={2} style={{display:'flex',alignItems:'start'}}>
                    <h3>databaseUsed :</h3>
                </Grid>
                <Grid item xs={10} >
                    <TextField
                     style={{width:'100%'}}
                     databaseUsed Name
                        id="outlined-required"
                        label=" databaseUsed Name"
                        placeholder="Enter your databaseUsed"
                    />
                </Grid>

            </Grid> 
            <Grid container spacing={2}>
                <Grid item xs={2} style={{display:'flex',alignItems:'start'}}>
                    <h3>operating Systems:</h3>
                </Grid>
                <Grid item xs={10} >
                    <TextField
                     style={{width:'100%'}}
                     operating Systems
                        id="outlined-required"
                        label=" operating Systems"
                        placeholder="operating Systems"
                    />
                </Grid>

            </Grid> 
            <Grid container spacing={2}>
                <Grid item xs={2} style={{display:'flex',alignItems:'start'}}>
                    <h3>IdeUsed:</h3>
                </Grid>
                <Grid item xs={10} >
                    <TextField
                     style={{width:'100%'}}
                     IdeUsed Name
                        id="outlined-required"
                        label=" IdeUsed Name"
                        placeholder="Enter your IdeUsed"
                    />
                </Grid>

            </Grid> 
            <Grid container spacing={2}>
                <Grid item xs={2} style={{display:'flex',alignItems:'start'}}>
                    <h3>Web Server:</h3>
                </Grid>
                <Grid item xs={10} >
                    <TextField
                     style={{width:'100%'}}
                     Web Server
                        id="outlined-required"
                        label=" Web Server"
                        placeholder="Enter Web Server"
                    />
                </Grid>

            </Grid> 
        </>
    )
}

export default SkillSets