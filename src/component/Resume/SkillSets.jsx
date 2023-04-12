import { Grid, TextField } from '@mui/material'
import React from 'react'
import resume from "../../styles/resume.css"

function SkillSets() {
    return (
        <>
            <Grid container>
                <Grid item lg={12} sx={12}>
                    <h2 style={{ border: "0.1px solid #239ce2", backgroundColor: 'rgb(25,118,210)', textAlign: 'center', color: '#fff' }}>Skill Set</h2>
                </Grid>
            </Grid>
            <div className='subContainer'>

             <Grid container spacing={2}>
                <Grid item xs={4}style={{display:'flex',alignItems:'start'}}>
                    <h3>Technologies:</h3>
                </Grid>
                <Grid item xs={8} >
                    <TextField
                        style={{width:'100%'}}
                        Technology Name
                        id="outlined-required"
                        label=" Technology Name"
                        placeholder="Enter Your Technology Skills"
                        required
                        name='technologies'
                    />
                </Grid>

            </Grid> 
           
            <Grid container spacing={2}>
                <Grid item xs={4} style={{display:'flex',alignItems:'start'}}>
                    <h3>Languages:</h3>
                </Grid>
                <Grid item xs={8} >
                    <TextField
                      style={{width:'100%'}}
                      languages Name
                        id="outlined-required"
                        label="Languages Name"
                        placeholder="Enter Your Languages"
                        required
                        name='languages'
                    />
                </Grid>

            </Grid> 
           
            <Grid container spacing={2}>
                <Grid item xs={4} style={{display:'flex',alignItems:'start'}}>
                    <h3>Tools:</h3>
                </Grid>
                <Grid item xs={8} >
                    <TextField
                     style={{width:'100%'}}
                        Tools Name
                        id="outlined-required"
                        label=" Tools Name"
                        placeholder="Enter Your Technology Tools"
                        required
                        name='tools'
                    />
                </Grid>

            </Grid> 
            <Grid container spacing={2}>
                <Grid item xs={4} style={{display:'flex',alignItems:'start'}}>
                    <h3>Database:</h3>
                </Grid>
                <Grid item xs={8} >
                    <TextField
                     style={{width:'100%'}}
                     databaseUsed Name
                        id="outlined-required"
                        label=" Database Name"
                        placeholder="Enter Your Database Used"
                        required
                        name='databaseUsed'
                    />
                </Grid>

            </Grid> 
            <Grid container spacing={2}>
                <Grid item xs={4} style={{display:'flex',alignItems:'start'}}>
                    <h3>Operating System:</h3>
                </Grid>
                <Grid item xs={8} >
                    <TextField
                     style={{width:'100%'}}
                     operating Systems
                        id="outlined-required"
                        label=" Operating System"
                        placeholder="Operating System"
                        required
                        name='operatingSystems'
                    />
                </Grid>

            </Grid> 
            <Grid container spacing={2}>
                <Grid item xs={4} style={{display:'flex',alignItems:'start'}}>
                    <h3>IDE Used:</h3>
                </Grid>
                <Grid item xs={8} >
                    <TextField
                     style={{width:'100%'}}
                     IDE Used Name
                        id="outlined-required"
                        label=" IDE Used "
                        placeholder="Enter Your IDE Used"
                        required
                        name='ideUsed'
                    />
                </Grid>

            </Grid> 
            <Grid container spacing={2}>
                <Grid item xs={4} style={{display:'flex',alignItems:'start'}}>
                    <h3>Web Server:</h3>
                </Grid>
                <Grid item xs={8} >
                    <TextField
                     style={{width:'100%'}}
                     Web Server
                        id="outlined-required"
                        label=" Web Server"
                        placeholder="Enter Web Server"
                        required
                        name='webServer'
                    />
                </Grid>

            </Grid> 
            </div>
        </>
    )
}

export default SkillSets