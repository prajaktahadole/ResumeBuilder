import { Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import { setSoftSkillList } from "../../reduxToolkit/Resume/resumeSlice";

const SoftSkills = () => {
    let dispatch = useDispatch();
    const { currentSoftSkillList } = useSelector((state) => state.resume);
    const handleChange = (e, index) => {
        let tempObj = { ...currentSoftSkillList };
        tempObj[index] = e;
        dispatch(setSoftSkillList(tempObj));
    };
    return (
            <>
            {/*<Grid item xs={12} sm={6} lg={6} style={{border: '1px solid red'}}>*/}
                <Typography
                    variant="h6"
                    style={{
                        maxWidth: "95%",
                        marginBottom: "5px",
                        padding: "5px",
                        textAlign: "left",
                        fontWeight: 'bold',
                        fontSize: '28px'
                    }}
                >
                    Soft Skills
                </Typography>
            {/*</Grid>*/}
    <Grid container spacing={1} >
            {Object.keys(currentSoftSkillList).map((ele, index) => {
                return (
                    <Grid item xs={12} sm={6} lg={6} p={2}>
                        <Stack>
                            <Typography>{ele}</Typography>
                            <Rating
                                index={ele}
                                rating={currentSoftSkillList[ele]}
                                onChange={handleChange}
                            />
                        </Stack>
                    </Grid>
                );
            })}
            {/* Nested grid */}
        </Grid>
            </>
    );
};
export default SoftSkills;
