import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function SoftSkillRating({ feedbackform }) {

    return (
        <div>
            <Card style={{ maxWidth: "110%", paddingTop: "1px", }}>
                <CardContent style={{  display : 'grid', gridTemplateColumns : 'repeat(2, 1fr)'  }}>
                    {feedbackform.softSkillRatings && Array.isArray(feedbackform.softSkillRatings) && feedbackform.softSkillRatings.map((softSkill) => (
                        <Box key={softSkill.softSkillId} sx={{ mb: 2 }}>
                            <Typography sx={{ display: 'flex', alignItems: 'center', width : '70%' }}>
                                <div style={{width : '70%'}}>{softSkill.skillName}</div>
                               
                                <div style={{fontWeight: "bold"}}>{softSkill.rating} / 5</div>
                            </Typography>
                        </Box>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

export default SoftSkillRating;

