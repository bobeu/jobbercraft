import React from 'react';
import { Avatar } from '@mui/material';
import Link from 'next/link';
import BigNumber from 'bignumber.js';
import { Profile, Tier } from '@/customTypes';

const index = () => {
  return (
    <section className='w-full text-white1 py-4' id='#jobbers'>
      <div className='flex justify-between px-4 items-center text-2xl w-full h-[42px]'>
        {/* <h1 className='font-semibold'>Jobbers</h1> */}
        <input
          type="text"
          placeholder='Search name'
          className='bg-gray1 border border-green1 rounded-xl p-2'
        />
      </div>
      <div className="w-full h-full container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 ">
        {
          MOCK_JOBBERS.map((jobber, i) => (
            <div key={i} className="w-full p-14 rounded-2xl bg-green1 text-cyan-200 cursor-pointer">
              <div className='w-full flex justify-between items-center p-4 rounded gap-2 text-white shadow-sm shadow-gray1'>
                <Avatar src='' sx={{width: 50, height: 50 }}/>
                <h1 className='text-lg font-black '>{jobber.other.name}</h1>
              </div>
              <div className='flex justify-between items-center mt-4  font-semibold text-md text-cyan-200'>
                <h1 >{jobber.other.aka}</h1>
                <div className='flex justify-end items-center gap-2 text-cyan-600'>
                  <h3 className=''>{jobber.other.ratings}</h3>
                  <span className='text-cyan-300 '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className='w-full flex justify-between items-center mt-4'>
                <h1 className='text-md text-base'>{jobber.other.field}</h1>
                <button className='bg-green1 border border-gray1 px-4 py-1 rounded-lg text-cyan-700'>
                  <Link href={jobber.other.profileURI}>Profile</Link>
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default index;

const MOCK_JOBBERS : Profile = [
  {
    avatarId: BigNumber(1),
    tier: Tier.PROBATION,
    other: {
      name: 'Isaac J.',
      aka: 'Bobelr',
      field: 'Web3 fullstack',
      profileURI: 'http://github.com/bobeu',
      avatar: 'http://github.com/bobeu',
      ratings: 7
    },
  },
  {
    avatarId: BigNumber(2),
    tier: Tier.APPROVED,
    other: {
      name: 'GodWill Tserundede.',
      aka: 'Prince',
      field: 'Data Analyst',
      profileURI: 'http://github.com/princekelly',
      avatar: 'http://github.com/princekelly',
      ratings: 7
    }
  },
  {
    avatarId: BigNumber(3),
    tier: Tier.PROBATION,
    other: {
      name: 'Dele Fawole.',
      aka: 'Delex',
      field: 'Frontend',
      profileURI: 'http://github.com/dele',
      avatar: 'http://github.com/dele',
      ratings: 4
    }
  },
  {
    avatarId: BigNumber(4),
    tier: Tier.PROBATION,
    other: {
      name: 'Katie Lora',
      aka: 'Kat',
      field: 'Design',
      profileURI: 'http://github.com/lora',
      avatar: 'http://github.com/lora',
      ratings: 2
    }
  },
  {
    avatarId: BigNumber(5),
    tier: Tier.APPROVED,
    other: {
      name: 'Joseph Kleb',
      aka: 'Kleb',
      field: 'Business',
      profileURI: 'http://github.com/joseph',
      avatar: 'http://github.com/joseph',
      ratings: 5
    }
  },
  {
    avatarId: BigNumber(6),
    tier: Tier.APPROVED,
    other: {
      name: 'Goke Anomo',
      aka: 'Anomo',
      field: 'Health consultant',
      profileURI: 'http://github.com/anomo',
      avatar: 'http://github.com/anomo',
      ratings: 6
    }
  },
  {
    avatarId: BigNumber(7),
    tier: Tier.NONE,
    other: {
      name: 'Terry G',
      aka: 'TBoy',
      field: 'Web3 fullstack',
      profileURI: 'http://github.com/terry',
      avatar: 'http://github.com/terry',
      ratings: 5
    }
  },
  {
    avatarId: BigNumber(8),
    tier: Tier.PROBATION,
    other: {
      name: 'Funke Audu',
      aka: 'funky',
      field: 'Smart contracts',
      profileURI: 'http://github.com/funke',
      avatar: 'http://github.com/funke',
      ratings: 3
    }
  },

]

// ethers.utils.defaultAbiCoder.decode(["string"], onchainJobs[0].jobRef)[0]