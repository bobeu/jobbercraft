import * as React from 'react';
import PostJob from '../JobSection/PostJob';
import Jobbers from '../JobSection/Jobbers';
import JobTabs from '../JobSection/JobTabs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className='h-screen overflow-auto my-8'
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AppNavigation({handleChange, value} : {handleChange: (event: React.SyntheticEvent, newValue: number) => void, value: number}) {
  return (
    <Box sx={{ width: '100%', }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Jobs" {...a11yProps(0)} style={{color: value === 0? 'cyan' : 'whitesmoke'}}/>
          <Tab label="Post Job" {...a11yProps(1)} style={{color: value === 1? 'cyan' : 'whitesmoke'}}/>
          <Tab label="Jobbers" {...a11yProps(2)} style={{color: value === 2? 'cyan' : 'whitesmoke'}}/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <JobTabs />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PostJob />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Jobbers />
      </CustomTabPanel>
    </Box>
  );
}