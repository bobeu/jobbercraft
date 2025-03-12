import React from 'react';
import Calendar from 'react-calendar';

const DisplayCalendarModal = ({ setSelected } : {setSelected: (x: number | undefined) => void}) => {
  return (
    <Calendar 
        calendarType='gregory'
        className={""}
        onChange={(e) => {
          const g = new Date().setTime(1117544)  // For testing
          setSelected(g)
        }}
    />
  );
};

export default DisplayCalendarModal;