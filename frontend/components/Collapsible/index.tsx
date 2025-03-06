import Collapse, { CollapseProps } from '@mui/material/Collapse';
import React from 'react';
// import type { CollapseProps, } from 'antd';
// import { Collapse, Space } from 'antd';

type CollapsibleProps = {
  items: CollapseProps;
}

const Collapsible = (props: CollapsibleProps) => {
  const { items } = props;
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    // <Space direction="vertical" className='h-[50vh] md:h-[28vh]'>
      <Collapse 
        // items={items} 
        // onChange={onChange} 
        // collapsible='header'
        // bordered={false}
        className='bg-cyan-300 rounded-md text-cyan-700 mt-4'
      />
  // </Space>
  )
  
};

export default Collapsible;

interface ChevronProps {
  open: boolean;
  hideChevron?: boolean;
}

export const Chevron = (props: ChevronProps) => {
  const { open, hideChevron } = props;

  return (
    <React.Fragment>
      {
        !hideChevron? 
        open ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>  
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>      
    ) : null
      }
    </React.Fragment>
  )
}