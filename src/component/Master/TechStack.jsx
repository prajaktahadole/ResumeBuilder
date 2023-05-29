import { 
  Card , 
  TextField, 
  Button, 
  Grid,  
  IconButton,
  Box
} from '@mui/material';
import React, {useState} from 'react'
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

function TechStack() {

  const [technologies, setTechnologies] = useState([
    { id: 1, value: 'Java', skills: [{ id: 1, value: 'Core Java' }, { id: 2, value: 'Spring Boot' }] },
    { id: 2, value: 'Python', skills: [{ id: 1, value: 'Python Scripting' }, { id: 2, value: 'Django' }, { id: 3, value: 'NumPy' }] },
  ]);

  const handleTechnologyChange = (id, event) => {
    const updatedTechnologies = technologies.map((technology) => {
      if (technology.id === id) {
        return { ...technology, value: event.target.value };
      }
      return technology;
    });
    setTechnologies(updatedTechnologies);
  };

  const handleSkillChange = (technologyId, skillId, event) => {
    const updatedTechnologies = technologies.map((technology) => {
      if (technology.id === technologyId) {
        const updatedskills = technology.skills.map((skill) => {
          if (skill.id === skillId) {
            return { ...skill, value: event.target.value };
          }
          return skill;
        });
        return { ...technology, skills: updatedskills };
      }
      return technology;
    });
    setTechnologies(updatedTechnologies);
  };

  const addTechnology = () => {
    if (technologies.length === 0 || technologies[technologies.length - 1].value.trim() !== '') {
      const newTechnologyId = technologies.length > 0 ? technologies[technologies.length - 1].id + 1 : 1;
      const updatedTechnologies = [...technologies, { id: newTechnologyId, value: '', skills: [] }];
      setTechnologies(updatedTechnologies);
    }
  };

  const addSkill = (technologyId, event) => {
    if ((event.key === 'Enter' || event.type === 'click') && event.target.value.trim() !== '') {
      const updatedTechnologies = technologies.map((technology) => {
        if (technology.id === technologyId) {
          const newSkillId = technology.skills.length + 1;
          const updatedSkills = [...technology.skills, { id: newSkillId, value: event.target.value }];
          return { ...technology, skills: updatedSkills };
        }
        return technology;
      });
      setTechnologies(updatedTechnologies);
      event.target.value = ''; 
    }
  };

  const removeTechnology = (id) => {
    const updatedTechnologies = technologies.filter((technology) => technology.id !== id);
    setTechnologies(updatedTechnologies);
  };

  const removeSkill = (technologyId, skillId) => {
    const updatedTechnologies = technologies.map((technology) => {
      if (technology.id === technologyId) {
        const updatedskills = technology.skills.filter((skill) => skill.id !== skillId);
        return { ...technology, skills: updatedskills };
      }
      return technology;
    });
    setTechnologies(updatedTechnologies);
  };

  const renderTechStackRepresentation = () => {
    return (
      <Card 
      style={{
        maxWidth: "95%",
        margin: "25px auto",
        padding: "25px",
        boxShadow:
          "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        background: "rgb(245,245,245)",
      }}>
        {technologies.map((technology) => (
          <div key={technology.id} 
          style={{ 
          marginBottom: "20px", 
          padding : "10px",
          boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}}>
          <Grid container style={{display: "flex", margin : "5px"}}>
              <TextField
                Technology Name
                id="outlined-required"
                label=" Technology Name"
                placeholder="JAVA, React, Python... etc"
                type="text"
                value={technology.value}
                onChange={(event) => handleTechnologyChange(technology.id, event)}
              ></TextField>
               <Button
                      onClick={() => removeTechnology(technology.id)}>
                          <IconButton size="small" color="error">
                            <DeleteRoundedIcon />
                          </IconButton>
                </Button>
          </Grid>

            <Grid container style={{display: "flex", flexDirection: "column", margin : "5px"}}>
            <Box  sx={{ flexGrow: 1 }} style={{display: "flex", margin : "5px"}}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {technology.skills.map((skill) => (
                   <Grid item key={skill.id} style={{display: 'flex'}} xs={2} sm={4} md={4}>
                    <TextField
                      Skill Name
                      id="outlined-required"
                      label="Skill Name"
                      placeholder="Springboot, Microservices, Hibernate... etc"
                      type="text"
                      value={skill.value}
                      onChange={(event) => handleSkillChange(technology.id, skill.id, event)}
                      style={{margin: "5px"}}
                    ></TextField>
                    <Button
                          style={{
                            marginTop: "15px",
                            height: "30px",
                            width: "30px",
                            minWidth: "15px",
                          }}
                          onClick={() => removeSkill(technology.id, skill.id)}
                        >
                          <IconButton size="small" color="error">
                            <DeleteRoundedIcon />
                          </IconButton>
                    </Button>
                </Grid>
              ))}
              </Grid>
            </Box>
            <Grid style={{marginLeft: "10px", marginTop: "10px"}}>
                <TextField
                  type="text"
                  placeholder="Add Skill"
                  onBlur={(event) => addSkill(technology.id, event)}
                  onKeyDown={(event) => addSkill(technology.id, event)}
                ></TextField>
          </Grid>
         
             </Grid>
          </div>
        ))}
      </Card>
    );
  };

  return (
    <Card  style={{
      maxWidth: "95%",
      margin: "50px auto",
      padding: "50px",
      boxShadow:
        "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
      background: "rgb(245,245,245)",
    }}>
      <div
     >

  
      <div>
        <Grid item lg={12} sx={12} style={{display:'flex',alignItems:'start'}}>
        <Grid item xs={3} style={{marginRight : "15px"}}>
                    <h2> TechStack : </h2>
         </Grid>
     
        <Grid item xs={9} style={{display:'flex',alignItems:'start'}}>
        {technologies.map((technology) => (
            <h2 style={{marginRight : "10px"}}>{technology.value},</h2>
        ))}
        </Grid>

        </Grid>
         <div>
        {renderTechStackRepresentation()}
      </div>
        <Button
          variant="contained"
          style={{ backgroundColor: "rgb(33, 80, 162)"}}
         onClick={addTechnology}>Add Technology</Button>
      </div>
    </div>
      </Card>
  )
}

export default TechStack