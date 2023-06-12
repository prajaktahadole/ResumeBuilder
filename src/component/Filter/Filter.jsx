import React, { useState, useEffect } from 'react';
import { getFeedbackAllData,findSkills,  } from "../../services/feedback-service";
import { 
  Autocomplete , 
  TextField, 
  FormControl, 
  InputLabel,  
  Select,
  MenuItem,
  Paper,
  InputBase,
  IconButton,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../../styles/Filter.css';
import InitialsAvatar from 'react-initials-avatar';
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';

const Filter = () => {
  const [Data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [technologyList, setTechnologyList] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedResult, setSelectedResult] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const navigate =useNavigate();

  async function fetchData() {
   const res = await getFeedbackAllData({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setData(res);

    const technologies = await findSkills({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    setTechnologyList(technologies);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleTechnologyChange = (event, values) => {
    setSelectedTechnologies(values);
    setSelectedSkills([]);
  };

  const handleSkillsChange = (event, values) => {
    setSelectedSkills(values);
  };

  const handleExperienceChange = (event) => {
    setSelectedExperience(event.target.value);
  };

  const handleResultChange = (event) => {
    setSelectedResult(event.target.value);
  };

  // const handleSortChange = (event) => {
  //   setSortOrder(event.target.value);
  // };

  console.log("Sort Order", sortOrder)
  const filteredData = Data.filter((item) => {
    const isSearchMatch = item.candidateName.toLowerCase().includes(searchText.toLowerCase());

    const isTechnologyMatch =
      selectedTechnologies.length === 0 ||
      selectedTechnologies.every((selectedTech) =>
        item.technologyRating.some((techRating) => techRating.techName === selectedTech)
      );

    const isSkillsMatch =
      selectedSkills.length === 0 ||
      item.technologyRating.some((techRating) =>
        selectedSkills.every((selectedSkill) =>
          techRating.techSkills.some((skill) => skill.skillName === selectedSkill)
        )
      );

    const isResultMatch = selectedResult === '' || item.result === selectedResult;  

    const isExperienceMatch = selectedExperience === '' || item.experience === selectedExperience;

    return isSearchMatch && isTechnologyMatch && isSkillsMatch && isExperienceMatch && isResultMatch;
  });

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  console.log("filteredData11111", filteredData)
  return (
    <Paper className='filtermain'
    style={{backgroundColor: "#F0F0F0"}}>
 
    <Paper className='filterMenu'>
     <Grid container spacing={2} alignItems="center">

    <Grid  item xs={6} sm={6} md={6} lg={3}>

      <Autocomplete
        multiple
        value={selectedTechnologies}
        onChange={handleTechnologyChange}
        options={technologyList.map((techRating) => techRating.techName)}
        renderInput={(params) => (
          <TextField {...params} label="Technologies" placeholder="Select Technologies" />
        )}
      />
    </Grid>
    <Grid item xs={6} sm={6} md={6} lg={3}>

      <Autocomplete
        multiple
        value={selectedSkills}
        onChange={handleSkillsChange}
        options={technologyList
          .filter((techRating) => selectedTechnologies.includes(techRating.techName))
          .flatMap((techRating) => techRating.techSkills.map((skill) => skill.skillName))
        }
        renderInput={(params) => (
          <TextField {...params} label="Skills" placeholder="Select Skills" />
        )}
      />
    </Grid>

    <Grid  item xs={6} sm={6} md={6} lg={3}>

    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Result</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedResult}
            label="Result"
            onChange={handleResultChange}
        >  
            <MenuItem value="SELECTED">SELECTED</MenuItem>
            <MenuItem value="REJECTED">REJECTED</MenuItem>
            <MenuItem value="HOLD">HOLD</MenuItem>  
        </Select>
    </FormControl>
    </Grid>


    <Grid  item xs={6} sm={6} md={6} lg={3}>

    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Work Experience</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedExperience}
            label="Age"
            onChange={handleExperienceChange}
        >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="2-5">2-5 years</MenuItem>
            <MenuItem value="5-8">5-8 years</MenuItem>
            <MenuItem value="8-10">8-10 years</MenuItem>
            <MenuItem value="10-12">10-12 years</MenuItem>
            <MenuItem value="12-15">12-15 years</MenuItem>
        </Select>
    </FormControl>

    </Grid>
    <Grid item  xs={8} sm={8} md={9} lg={9}>
       <Paper
          component="form"
          sx={{ display: 'flex', alignItems: 'center', padding: '5px'}}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search name' }}
              type="text" 
              value={searchText} 
              onChange={handleSearchChange}
            />
            <IconButton type="button" sx={{ p: '10px', fontWeight: 'bold' }} aria-label="search">
              <SearchIcon />
            </IconButton>
    </Paper>
    </Grid>

    {/* <Grid  item xs={4} sm={4} md={3} lg={3}>
      <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Score</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortOrder}
              label="Sort Order"
              onChange={handleSortChange}
          >  
              <MenuItem value="asc">Low to High</MenuItem>
              <MenuItem value="desc">High to Low</MenuItem>
          </Select>
      </FormControl>
      </Grid>*/}
    </Grid> 
    </Paper>

    <Paper className='filterContainer'>
    <Grid container spacing={2} >
        {currentItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card variant='outlined' style={{border: '1px solid gray' , height: '240px', overflow: 'hidden'}}>
            <CardHeader
             style={{
             
            }}
               variant="bold"
                avatar={
                  <InitialsAvatar
                  className="InitialsAvatarinner"
                  name={
                    item.candidateName
                  }
                  />
                }

              title={
                <Box className="Filtersubheader">
                <Typography variant="h6" fontWeight="bold" >
                {item.candidateName}
              </Typography>
             

              </Box>
              }
              
              subheader={
               <Box  className="Filtersubheader">
                 <Typography>{item.experience + " years"}</Typography>
              
                <Box className="Filtersubheader"  
                          style={{
                                  color:
                                  item.result === "SELECTED"
                                      ? "green"
                                      : item.result === "REJECTED"
                                      ? "red"
                                      : "orange",
                                }}>
                 <Typography className='filterResult'  >{item.result}
                 </Typography>
                 <Typography  style={{fontSize : '17px' , marginTop: "-1px"}} >
                  - {item.totalScore}
                  </Typography>
                  </Box>
               </Box>
              }
      />
              <CardContent
              className='FilterCardContent'
              style={{
                padding : "0px 10px", 
                height: '90px', 
                overflow: 'hidden',
                marginTop: '-5px'}}>
                 <Typography
                         style={{
                          padding : "2px 0px", 
                          marginTop: '0px'}}
                        variant="body2" color="text.secondary" >
                        Interview Date: {item.interviewDate}
                    </Typography>
                {item.technologyRating.map((techRating) => (
                  <div key={techRating.techId}>
                    <Typography variant="subtitle1" component="div" fontWeight={"300"} >
                      {techRating.techName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight={"300"}>
                      Skills: {techRating.techSkills.map((skill) => skill.skillName).join(', ')}
                    </Typography>
                  </div>
                ))}
              </CardContent>
              <CardActions 
              className="Filterbutt">
                     <Button 
                     variant='contained'
                     size="small"
                     onClick={() =>
                      navigate(`/resumemakerui/feedback/${item.formId}`)
                    }
                    color="primary"
                     > View Details
                     </Button>
                </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div className='pagination'>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>

    </Paper>

  </Paper>
  );
};

export default Filter;
