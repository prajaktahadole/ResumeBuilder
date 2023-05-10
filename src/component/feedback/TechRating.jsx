import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const TechRating = (feedbackform) => {
    return (
        <div>
            <Card style={{ maxWidth: '110%', paddingTop: '1px' }}>
                <CardContent>
                    {feedbackform.feedbackform.technologyRating &&
                        Array.isArray(feedbackform.feedbackform.technologyRating) &&
                        feedbackform.feedbackform.technologyRating
                            .filter((tech) =>
                                tech.techSkills.some(
                                    (skill) => skill.rating !== null && skill.rating >= 0 && skill.rating <= 5
                                )
                            )
                            .map((tech) => (
                                <Box key={tech.techId} sx={{ mb: 2 }}>
                                    <Box
                                        variant="h6"
                                        style={{
                                            fontWeight: 'bold',
                                            flex: 1,
                                            fontSize: '1rem',
                                            marginBottom : '3px'
            
                                        }}
                                    >
                                        {tech.techName}
                                    </Box>
                                    <Grid container spacing={2}>
                                        {tech.techSkills
                                            .filter((skill) => skill.rating !== null && skill.rating >= 0 && skill.rating <= 5)
                                            .map((skill) => (
                                                <Grid item xs={3} key={skill.skillId} >
                                                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ flex: 3 ,}}>{skill.skillName} - </span>
                                                        <span
                                                            style={{ flex: 1,fontWeight: "bold", borderRight :  '1px solid #ccc' }}
                                                        >
                                                            {skill.rating} / 5
                                                        </span>
                                                    </Typography>
                                                </Grid>
                                            ))}
                                    </Grid>
                                </Box>
                            ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default TechRating;
