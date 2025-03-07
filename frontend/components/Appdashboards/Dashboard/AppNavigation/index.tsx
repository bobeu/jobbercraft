import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PostJob from '../JobSection/PostJob';
import Jobbers from '../JobSection/Jobbers';
import JobTabs from '../JobSection/JobTabs';

interface TabParentProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabParent(props: TabParentProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <React.Fragment>
          { children }
        </React.Fragment>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function AppNavigation({handleChange, handleChangeIndex, value} : {handleChange: (event: React.SyntheticEvent, newValue: number) => void, handleChangeIndex: (index: number) => void, value: number}) {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%', }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="scrollable"
          aria-label="full width tabs example"
          className='bg-green1 text-white1'
        >
          <Tab label="Jobs" {...a11yProps(0)} />
          <Tab label="Post Job" {...a11yProps(1)} />
          <Tab label="Jobbers" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className='bg-gray1 p-4'
      >
        <TabParent value={value} index={0} dir={theme.direction}>
          <JobTabs />
        </TabParent>
        <TabParent value={value} index={1} dir={theme.direction}>
          <PostJob />
        </TabParent>
        <TabParent value={value} index={2} dir={theme.direction}>
          <Jobbers />
        </TabParent>
      </SwipeableViews>
    </Box>
  );
}