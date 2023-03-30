import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react';
import "../../style/responsibility.css";



function Responsibility() {

    const [responsibility, setResponsibility] = useState('');
    const [responsibilityList, setResponsibilityList] = useState([]);

    const handleOpenResponsibilities = () => {

        setResponsibilityList([...responsibilityList, { val: responsibility }]);
    };

    const removeItem = (ele) => {
        if (window.confirm(`Are you sure you want to remove ${responsibilityList}?`)) {
            console.log("first", ele)
            const newItems = responsibilityList.filter((i) => i !== ele);
            setResponsibilityList(newItems);
            console.log(newItems)
        }
    };
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={10}>
                    {Array.isArray(responsibilityList)
                        && responsibilityList.length ? <ul className='ultag'>{responsibilityList.map((ele, index) =>
                            <li>{ele.val}<Button onClick={() => removeItem(ele)}>X</Button></li>)}</ul> : " "}
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ paddingBottom: '20px' }}>
                <Grid item xs={2}>
                </Grid>
                <Grid item lg={9} sx={9}>
                    <TextField
                        style={{ width: '100%' }}
                        Responsibilities
                        value={responsibility}
                        id="outlined-required"
                        label="Project Responsibilities"
                        placeholder="Enter your project responsibilities "
                        onChange={(e) => setResponsibility(e.target.value)}
                    />
                </Grid>
                <Grid item lg={1} sx={1}>
                    <Button variant="contained" onClick={handleOpenResponsibilities} sx={{ marginTop: '10px' }}>+</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Responsibility