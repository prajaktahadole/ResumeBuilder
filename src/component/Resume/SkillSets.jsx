import { Grid, TextField } from '@mui/material'
import React,  { useRef ,  useState}  from 'react'
import resume from "../../styles/resume.css"

function SkillSets({ item, isEdit = false}) {

    const [focusedIndex, setFocusedIndex] = useState(0);
    const textFieldsRef = useRef([]);
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const nextIndex = focusedIndex + 1;
        if (nextIndex < textFieldsRef.current.length) {
          textFieldsRef.current[nextIndex].focus();
          setFocusedIndex(nextIndex);
        }
      }
    };

    return (
        <>
            <Grid container>
                <Grid item lg={12} sx={12}>
                    <h2 style={{ border: "0.1px solid #239ce2", backgroundColor: 'rgb(33, 80, 162)', textAlign: 'center', color: '#fff' }}>Skill Set</h2>
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
                        placeholder="Springboot, Microservices, Hibernate, REST Webservices... etc"
                        //required
                        name='technologies'
                        defaultValue={isEdit ? item.skillSet.technologies:''}
                        onKeyPress={handleKeyPress}
                        inputRef={(ref) => (textFieldsRef.current[0] = ref)}
                        
                    />
                </Grid>

                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={4} style={{ display: 'flex', alignItems: 'start' }}>
                        <h3>Languages:</h3>
                    </Grid>
                    <Grid item xs={8} >
                        <TextField
                            style={{ width: '100%' }}
                            languages Name
                            id="outlined-required"
                            label="Languages Name"
                            placeholder="JAVA, C++, C, HTML, ASP.NET...etc"
                            //required
                            name='languages'
                            defaultValue={isEdit ? item.skillSet.languages : ''}
                            onKeyPress={handleKeyPress}
                            inputRef={(ref) => (textFieldsRef.current[1] = ref)}
                        

                        />
                    </Grid>

                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={4} style={{ display: 'flex', alignItems: 'start' }}>
                        <h3>Tools:</h3>
                    </Grid>
                    <Grid item xs={8} >
                        <TextField
                            style={{ width: '100%' }}
                            Tools Name
                            id="outlined-required"
                            label=" Tools Name"
                            placeholder="GitHub, JIRA, Maven, Play Framework, AWS, Confluence...etc"
                            //required
                            name='tools'
                            defaultValue={isEdit ? item.skillSet.tools : ''}
                            onKeyPress={handleKeyPress}
                             inputRef={(ref) => (textFieldsRef.current[2] = ref)}
                      
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={4} style={{ display: 'flex', alignItems: 'start' }}>
                        <h3>Database:</h3>
                    </Grid>
                    <Grid item xs={8} >
                        <TextField
                            style={{ width: '100%' }}
                            databaseUsed Name
                            id="outlined-required"
                            label=" Database Name"
                            placeholder="MS-SQL, MySQL, PostgreSQL,Oracle, MongoDB"
                            //required
                            name='databaseUsed'
                            defaultValue={isEdit ? item.skillSet.databaseUsed : ''}
                            onKeyPress={handleKeyPress}
                            inputRef={(ref) => (textFieldsRef.current[3] = ref)}
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={4} style={{ display: 'flex', alignItems: 'start' }}>
                        <h3>Operating System:</h3>
                    </Grid>
                    <Grid item xs={8} >
                        <TextField
                            style={{ width: '100%' }}
                            operating Systems
                            id="outlined-required"
                            label=" Operating System"
                            placeholder="Linux, Windows, MacOS"
                            //required
                            name='operatingSystems'
                            defaultValue={isEdit ? item.skillSet.operatingSystems : ''}
                            onKeyPress={handleKeyPress}
                            inputRef={(ref) => (textFieldsRef.current[4] = ref)}
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={4} style={{ display: 'flex', alignItems: 'start' }}>
                        <h3>IDE Used:</h3>
                    </Grid>
                    <Grid item xs={8} >
                        <TextField
                            style={{ width: '100%' }}
                            IDE Used Name
                            id="outlined-required"
                            label=" IDE Used "
                            placeholder="Visual Studio, Eclipse, IntelliJ IDEA, NetBeans, PyCharm, Xcode, Atom...etc"
                            //required
                            name='ideUsed'
                            defaultValue={isEdit ? item.skillSet.ideUsed : ''}
                            onKeyPress={handleKeyPress}
                            inputRef={(ref) => (textFieldsRef.current[5] = ref)}
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={4} style={{ display: 'flex', alignItems: 'start' }}>
                        <h3>Web Server:</h3>
                    </Grid>
                    <Grid item xs={8} >
                        <TextField
                            style={{ width: '100%' }}
                            Web Server
                            id="outlined-required"
                            label=" Web Server"
                            placeholder="Apache HTTP Server, Nginx, Apache Tomcat, IIS...etc"
                            // required={false}
                            name='webServer'
                            defaultValue={isEdit ? item.skillSet.webServer : ''}
                            onKeyPress={handleKeyPress}
                            inputRef={(ref) => (textFieldsRef.current[6] = ref)}
                        />
                    </Grid>

                </Grid>
            </div>
        </>
    )
}

export default SkillSets