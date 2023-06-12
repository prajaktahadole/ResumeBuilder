import { Grid, TextField , Button, IconButton} from '@mui/material'
import React,  { useRef ,  useState}  from 'react'
import resume from "../../styles/resume.css"
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

function SkillSets({ fields, setFields, item, isEdit = false}) {
    // const [fields, setFields] = useState([]);

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

      const handleAddField = () => {
        setFields((prevFields) => [...prevFields, { name: '', description: '' }]);
      };

      const handleDeleteField = (index) => {
        setFields((prevFields) => {
          const updatedFields = [...prevFields];
          updatedFields.splice(index, 1);
          return updatedFields;
        });
      };

      const handleChange = (index, field, value) => {
        setFields((prevFields) => {
          const updatedFields = [...prevFields];
          updatedFields[index][field] = value;
          return updatedFields;
        });
      };
      return (
        <>
            <Grid container>
                <Grid item  xs={12} sx={12} sm={12} md={12} lg={12}>
                    <h2 style={{ border: "0.1px solid #239ce2", backgroundColor: 'rgb(33, 80, 162)', textAlign: 'center', color: '#fff' }}>Skill Set</h2>
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
                }} >
                <Grid item  xs={12} sm={3} md={3} lg={3}>
                    <h3 style={{margin : '5px'}}>Technologies:</h3>
                </Grid>
                <Grid item  xs={12} sm={9} md={9} lg={9} >
                    <TextField
                        style={{width:'100%' , marginBottom: '7px'}}
                        Technology Name
                        id="outlined-required"
                        label=" Technology Name"
                        placeholder="Springboot, Microservices, Hibernate, REST Webservices... etc"
                        name='technologies'
                        defaultValue={isEdit ? item.skillSet.technologies:''}
                        onKeyPress={handleKeyPress}
                        inputRef={(ref) => (textFieldsRef.current[0] = ref)}

                    />
                </Grid>

            </Grid>

                <Grid  container 
                    xs={{display: "flex"}}
                    sm={{
                        '@media (max-width: 600px)': {
                            display: "flex",
                            flexDirection : 'column' ,
                            width : "100%",
                        },
                        }}>
                    <Grid item  xs={12} sm={3} md={3} lg={3}>
                        <h3 style={{margin : '5px'}}>Languages:</h3>
                    </Grid>
                    <Grid item  xs={12} sm={9} md={9} lg={9}>
                        <TextField
                            style={{width:'100%' , marginBottom: '7px'}}
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

                <Grid  container 
                    xs={{display: "flex"}}
                    sm={{
                        '@media (max-width: 600px)': {
                            display: "flex",
                            flexDirection : 'column' ,
                            width : "100%",
                        },
                        }}>
                    <Grid item  xs={12} sm={3} md={3} lg={3}>
                        <h3 style={{margin : '5px'}}>Tools:</h3>
                    </Grid>
                    <Grid item  xs={12} sm={9} md={9} lg={9} >
                        <TextField
                            style={{width:'100%' , marginBottom: '7px'}}
                            Tools Name
                            id="outlined-required"
                            label=" Tools Name"
                            placeholder="GitHub, JIRA, Maven, Play Framework, AWS, Confluence...etc"
                            name='tools'
                            defaultValue={isEdit ? item.skillSet.tools : ''}
                            onKeyPress={handleKeyPress}
                             inputRef={(ref) => (textFieldsRef.current[2] = ref)}

                        />
                    </Grid>

                </Grid>
                <Grid  container 
                    xs={{display: "flex"}}
                    sm={{
                        '@media (max-width: 600px)': {
                            display: "flex",
                            flexDirection : 'column' ,
                            width : "100%",
                        },
                        }}>
                    <Grid item  xs={12} sm={3} md={3} lg={3}>
                        <h3 style={{margin : '5px'}}>Database:</h3>
                    </Grid>
                    <Grid item  xs={12} sm={9} md={9} lg={9} >
                        <TextField
                            style={{width:'100%' , marginBottom: '7px'}}
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

                <Grid  container 
                    xs={{display: "flex"}}
                    sm={{
                        '@media (max-width: 600px)': {
                            display: "flex",
                            flexDirection : 'column' ,
                            width : "100%",
                        },
                        }}>
                    <Grid item  xs={12} sm={3} md={3} lg={3}>
                        <h3 style={{margin : '5px'}}>Operating System:</h3>
                    </Grid>
                    <Grid item  xs={12} sm={9} md={9} lg={9} >
                        <TextField
                            style={{width:'100%' , marginBottom: '7px'}}
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
                <Grid  container 
                    xs={{display: "flex"}}
                    sm={{
                        '@media (max-width: 600px)': {
                            display: "flex",
                            flexDirection : 'column' ,
                            width : "100%",
                        },
                        }}>
                    <Grid item  xs={12} sm={3} md={3} lg={3}>
                        <h3 style={{margin : '5px'}}>IDE Used:</h3>
                    </Grid>
                    <Grid item  xs={12} sm={9} md={9} lg={9} >
                        <TextField
                            style={{width:'100%' , marginBottom: '7px'}}
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
                <Grid  container 
                    xs={{display: "flex"}}
                    sm={{
                        '@media (max-width: 600px)': {
                            display: "flex",
                            flexDirection : 'column' ,
                            width : "100%",
                        },
                        }}>
                    <Grid item  xs={12} sm={3} md={3} lg={3}>
                        <h3 style={{margin : '5px'}}>Web Server:</h3>
                    </Grid>
                    <Grid item  xs={12} sm={9} md={9} lg={9} >
                        <TextField
                            style={{width:'100%' , marginBottom: '7px'}}
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

    
                {fields.map((field, index) => (
                    <Grid
                      container 
                      xs={{display: "flex"}}
                      sm={{
                          '@media (max-width: 600px)': {
                              display: "flex",
                              flexDirection : 'column' ,
                              width : "100%",
                            },
                          }}
                          spacing={2}
                          key={index} 
                          style={{ marginBottom: '10px' }}>
                        <Grid 
                        item  xs={12} sm={3} md={3} lg={3}>
                            <TextField
                                style={{ width: '100%' }}
                                id={`SkillName-${index}`}
                                label={`Skill Name ${index + 1}`}
                                placeholder={`Skill Name ${index + 1}`}
                                name={`Skill Name-${index}`}
                                defaultValue={
                                    isEdit &&
                                    item.skillSet.othersSkillSet &&
                                    item.skillSet.othersSkillSet.length > index
                                        ? item.skillSet.othersSkillSet[index].name
                                        : field.name
                                }
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                        </Grid>
                        <Grid  item  xs={10} sm={8} md={8} lg={8}>
                            <TextField
                                style={{ width: '100%' }}
                                id={`Description-${index}`}
                                label={`Description ${index + 1}`}
                                placeholder={`Description ${index + 1}`}
                                name={`Description-${index}`}
                                defaultValue={
                                    isEdit &&
                                    item.skillSet.othersSkillSet &&
                                    item.skillSet.othersSkillSet.length > index
                                        ? item.skillSet.othersSkillSet[index].description
                                        : field.description
                                }
                                onChange={(e) => handleChange(index, 'description', e.target.value)}
                            />
                        </Grid>
                        <Grid item  xs={1} sm={0.6} md={0.6} lg={0.6}>
                            <Button
                                style={{
                                    marginTop: '3px',
                                    marginLeft: '-10px',
                                    minWidth: '25px',
                                }}
                                onClick={() => handleDeleteField(index)}
                            >
                                <IconButton size="small" color="error">
                                    <DeleteRoundedIcon />
                                </IconButton>
                            </Button>
                        </Grid>
                    </Grid>
                ))}


                <Grid
                    item
                    xs={12}
                    sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingTop: "20px",
                    }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "rgb(33, 80, 162)" }}
                 onClick={handleAddField}>Add Skills</Button>
            </Grid>
            </div>
        </>
    )
}

export default SkillSets