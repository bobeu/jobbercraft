import React, { useState } from 'react';
import { CATEGORIES, MediaQueryBreakpointEnum } from '@/components/constants';
import { AllJobs } from '@/customTypes';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { useAccount, useReadContract } from 'wagmi';
import { MOCKJOBS } from '@/constants';
import Grid from "@mui/material/Grid";
import { motion } from 'framer-motion';
import getReadFunctions from '@/components/readContractConfig';
import { Loading } from './Nulls';
import { JobCard } from './JobCard';
// import CreateAvatar from './CreateAvatar';

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const JobTabs = () => {
  let disableTab = React.useRef<boolean[]>([])
  // let params = React.useRef({});
  const [mode, setMode] = useState<TabPosition>('top');
  const [jobs, setJobs] = useState<AllJobs>([]);
  const [modalOpen, setModal] = useState(false);

  const { data, isPending } = useReadContract({
    ...getReadFunctions().readAllJobs(),
    query: {
      refetchInterval: 4000, 
      refetchOnReconnect: 'always', 
    }
  });
  const isSm = useMediaQuery(MediaQueryBreakpointEnum.sm);
  const navigate = useNavigate();

  const toggleModal = () => {
    setModal(!modalOpen);  
  }

  const { address, connector } = useAccount();

  const handleCreateAvatar = async() => {
    // const result = await sendTransactions().interact(
    //   {
    //     functionName: 'becomeAJobber',
    //     connector,
    //     account: `0x${address?.substring(2, 42)}`,
    //     baj: {
    //       aka: 'Bob',
    //       name: 'Isaac',
    //       field: 'Fullstack developer',
    //       avatarUrl: 'https://github.com/bobeu/avatar',
    //       profileURI : 'https://github.com/bobeu'
    //     }
    //   }
    // );
    // console.log(result);
    // toggleModal();
    
  }

  const handleModeChange = (e: any) => {
    setMode(e.target.value);
  };

  const toggleDisable = (index: number, value: boolean) => {
    disableTab.current[index] = value;
  }

  React.useEffect(() => {
    !jobs.length && setJobs(MOCKJOBS); 
  }, []);

  return (
    <section className='h-[100vh] m-4'>
      <Grid container xs={'auto'}>
        {
          MOCKJOBS.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <motion.button
                initial={{opacity: 0}}
                animate={{opacity: [0, 1]}}
                transition={{duration: '0.5', delay: index/MOCKJOBS.length}}
                className='w-full rounded-md cursor-pointer' 
              >
                { isPending? <Loading /> : data? null : <JobCard { ...{...data! }} /> }
              </motion.button>
            </Grid>
          ))
        }

      </Grid>
    </section>
  );
};

export default JobTabs;
        {/* <div className='hidden md:flex justify-start items-center gap-2'> */}
          {/* <Tooltip title='Reorder tags'>
            <RadioGroup onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
              <Button variant='text' style={{borderRadius: 0}} value="top">Top</Button>
              <Button variant='text' style={{borderRadius: 0}} value="left">Left</Button>
            </RadioGroup>
          </Tooltip> */}
          {/* <Typography><span className='text-cyan-700'>Job Tags</span></Typography> */}
        {/* </div> */}
        {/* <div className='md:hidden grid grid-cols-1 mt-40 md:mt-2 md:justify-end md:items-center gap-1'>
          <h3>{'Jobber? Create a one-time'}</h3>
          <button 
            onClick={() => handleCreateAvatar()}
            className='bg-cyan-500 text-white py-1 md:px-4 h-[120px] rounded md:h-full font-semibold hover:bg-cyan-600 shadow-md shadow-yellow-500'
          >
            Avatar
          </button>
        </div> */}
      {/* </div> */}
      {/*<Tabs //

        // component={'animate'}
        // defaultActiveKey="1"
        // tabPosition={mode}
        // animated
        // className=' bg-white text-cyan-200'
        // items={CATEGORIES.map((category, i) => {
        //   const id = category.toLowerCase();
        //   return {
        //     label: id,
        //     key: id,
        //     disabled: disableTab.current[i],
        //     children: <JobCategoryMap 
        //                 category={id} 
        //                 toggleDisable={toggleDisable} 
        //                 index={i}
        //                 categories={CATEGORIES}
        //                 jobs={jobs}
        //               />,
        //   };
        // })}
      />
      {/* <CreateAvatar modalOpen={modalOpen} toggleModal={toggleModal} /> */}