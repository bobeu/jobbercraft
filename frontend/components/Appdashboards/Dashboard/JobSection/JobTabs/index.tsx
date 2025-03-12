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
import { formatJobContent } from '@/utilities';
import { zeroAddress } from 'viem';

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const JobTabs = () => {
  let disableTab = React.useRef<boolean[]>([])
  const [mode, setMode] = useState<TabPosition>('top');
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

  const { address, isConnected } = useAccount();

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

  return (
    <section className='h-[100vh] m-4'>
      <Grid container xs={'auto'} spacing={2}>
        {
          formatJobContent(!isConnected? MOCKJOBS : data? data : MOCKJOBS, address || zeroAddress).result.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <motion.button
                initial={{opacity: 0}}
                animate={{opacity: [0, 1]}}
                transition={{duration: '0.5', delay: index/MOCKJOBS.length}}
                className='w-full rounded-md cursor-pointer' 
              >
                { (isConnected && !isPending)? <JobCard { ...{ jobDetail: job, jobId: BigInt(index) }} /> : (isConnected && isPending)? <Loading /> : <JobCard { ...{ jobDetail: job, jobId: BigInt(index) }} /> }
              </motion.button>
            </Grid>
          ))
        }
      </Grid>
    </section>
  );
};

export default JobTabs;