import React from 'react';
import "../../styles/schedule.css"

function ScheduleInterview() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'scrollingAnimation 5s linear infinite',
        }}
      >
        <div><h1>Page under construction</h1></div>
      </div>
    </div>
  );
}

export default ScheduleInterview;
