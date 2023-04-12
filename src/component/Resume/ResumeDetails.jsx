import React from 'react'
import { useParams } from 'react-router-dom'


function ResumeDetails() {
    const id = useParams();
    console.log("resumeid", id);
   

  return (
    <div>
        ResumeDetails
   </div>
    
  )
}

export default ResumeDetails