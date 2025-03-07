import React, { useState } from 'react';
import Calendar from 'react-calendar';

const DisplayCalendarModal = ({ setSelected } : {setSelected: (x: number | undefined) => void}) => {
  const [selected, setType] = useState<number>(0);

  return (
    <Calendar 
        calendarType='gregory'
        className={""}
        onChange={(e) => {
          const g = new Date().setTime(1117544)  // For testing
          setSelected(g)
            // console.log("Calendar", g)
        }}
    />
  );
};

export default DisplayCalendarModal;