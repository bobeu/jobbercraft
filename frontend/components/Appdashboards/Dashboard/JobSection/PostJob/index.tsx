import "react-calendar/dist/Calendar.css";
import * as React from "react";
import Grid from "@mui/material/Grid";
// import DisplayCalendarModal from "./DisplayCalendarModal";
import Calendar from "react-calendar";
// import TextField from "@mui/material/TextField";
import Collapsible  from '@/components/Collapsible';
import { CATEGORIES } from '@/components/constants';
import Tooltip from "@mui/material/Tooltip";
import { UserInputBase } from "@/components/UserInput";
import DisplayCalendarModal from "./DisplayCalendarModal";
import postJob from "@/apis/update/jobberCraft/postJob";
import { useAccount, useConfig } from "wagmi";
import { formatAddr } from "@/utilities";
import { parseEther } from "viem";
import { TransactionCallback } from "@/customTypes";
import useAppStorage from "@/components/StateContextProvider/useAppStorage";

type Tag = 'offerprice' | 'jobtype' | 'jobref' | 'enddate' | 'title'
export default function PostJob() {
  let clicked = React.useRef<boolean[]>([]);
  const [useModerator, setUseModerator] = React.useState<boolean>(false);
  const [endDate, setDate] = React.useState<string>('');
  const [jobType, setJobType] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [selectedTags, setSelected] = React.useState<number[]>([]);
  const [offerPrice, setOfferPrice] = React.useState<string>('');
  const [jobRef, setJobRef] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
  const [curatorId, setCuratorId] = React.useState<number>(0);
   
  React.useEffect(() => {
    if(open) setOpen(false);
  }, []);
  
  const { address } = useAccount();
  const config = useConfig();
  const { setmessage } = useAppStorage();

  const callback : TransactionCallback = (arg) => {
     setmessage(arg.message)
  }

  const handleSelectItem = (val: number) => {
    const isClicked = clicked.current[val];
    if(selectedTags.length === 5 && !isClicked) return alert('Max of 5 categories allowed');
    if(!isClicked) {
      clicked.current[val] = true;
      setSelected((prev) => [...prev, val]);
    } else {
      clicked.current[val] = false;
      const newList = selectedTags.filter((item) => item !== val);
      setSelected(newList)
    }
  }

  const handleSubmit = async() => {
    const value = parseEther(offerPrice);
    const tags = selectedTags.map((tag) => CATEGORIES[tag]);
    await postJob({
      account: formatAddr(address),
      config,
      curatorId: BigInt(curatorId),
      jobRef,
      jobType: 1,
      offerPrice: value,
      proposedEndDateInDays: Number(endDate),
      tags,
      title,
      callback,
      value
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, tag: Tag) => {
    e.preventDefault();
    const value = e.target.value
    switch (tag) {
      case 'offerprice':
        setOfferPrice(value);
        break;
      case 'enddate':
        setDate(value);
      case 'jobtype':
        setJobType(value);
      case 'title':
        setTitle(value);
      case 'jobref':
        setJobRef(value);
      default:
        break;
    }
  }

  // const setdate = (callDate: number | undefined) => setDate(callDate);

  return (
    <section className="w-full h-[100%] p-4 bg-green1 text-cyan-400">
      <h1 className="p-2 text-2xl text-cyan-300 font-semibold">Create Job</h1>
      <div className="mt-6  w-full p-4">
        <Grid item container xs={12}>
          <Grid item xs={12} md={6}>
            {/* Use curator*/}
            <div className="w-full">
              <p className="text-lg font-semibold">
                {'o Use Curator?'} <span className="text-sm text-ellipsis align-text-bottom text-cyan-200">{"(Using a moderator ensures quality and timely delivery)"}</span>
              </p>
              <div className="w-[100%] p-4 text-green1 flex justify-start items-center gap-6 h-[42px] cursor-pointer bg-gray-50 font-semibold hover:bg-opacity-80" onClick={() => setUseModerator(!useModerator)}>
                <span className="text-xs">Select</span>
                {useModerator ? <span className="font-semibold">Yes {', Now using Curator'}</span> : <span className="font-semibold">No {', Thanks'}</span>}
              </div>
            </div>

            {/* Display Calendar
            <div>
            </div> */}
              {/* <DisplayCalendarModal open={isCalendarActive} handleClose={closeCalendar} children={<Calendar defaultActiveStartDate={new Date()} onChange={onChange} value={date} className={isCalendarActive ? "" : "hidden"} tileClassName={"text-cyan-500"} />} /> */}

            {/*Top Textfield*/}
            <div className="mt-6 w-full">
              <h1 className="text-lg font-semibold">
                {'o Job title'} 
              </h1>
              <div className="w-full p-2 flex justify-start gap-1 md:gap-12 items-center h-[42px] bg-gray-50 text-cyan-400 font-semibold">
                <UserInputBase 
                  placeholder="Write job title"
                  onChange={(event) => handleChange(event, 'title')}
                  type="text"
                  title='Job Title'
                  required
                />
                <span className="hidden md:block font-semibold text-red-400">{ 
                  title === ''? <Tooltip title='Job description link not set'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>            
                  </Tooltip> : <span className="font-semibold text-cyan-400">{title}</span>
                }</span>
              </div>
            </div>

            <div className="mt-6 w-full">
              <h1 className="text-lg  font-semibold">
                {'o Expected Completion Date'} 
                <span className="text-sm text-ellipsis align-text-bottom text-cyan-200">{"(This could be a github link or link to Google spreadsheet)"}</span>
              </h1>
              <div className="w-full p-2 flex justify-start gap-1 md:gap-12 items-center h-[42px] bg-gray-50 text-cyan-400 font-semibold">
                <UserInputBase 
                  placeholder="In days"
                  onChange={(event) => handleChange(event, 'enddate')}
                  type="number"
                  title='ProposedCompletionDate'
                  required
                />
                <span className="hidden md:block font-semibold text-red-400">{ 
                  endDate === ''? <Tooltip title='Job description link not set'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>            
                  </Tooltip> : <span className="font-semibold text-cyan-400">{endDate}</span>
                }</span>
              </div>
            </div>

            <div className="mt-6 w-full">
              <h1 className="text-lg  font-semibold">
                {'o Job reference link'} 
                <span className="text-sm text-ellipsis align-text-bottom text-cyan-200">{"(This could be a github link or link to Google spreadsheet)"}</span>
              </h1>
              <div className="w-full p-2 flex justify-start gap-1 md:gap-12 items-center h-[42px] bg-gray-50 text-cyan-400 font-semibold">
                <UserInputBase 
                  placeholder="Job description URI"
                  onChange={(e) => handleChange(e, 'jobref')}
                  type="text"
                  title='Job description link'
                  required
                />
                <span className="hidden md:block font-semibold text-red-400">{ 
                  jobRef === ''? <Tooltip title='Job description link not set'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>            
                  </Tooltip> : <span className="font-semibold text-cyan-400">{jobRef}</span>
                }</span>
              </div>
            </div>

            {/*Bottom Textfield */}
            <div className="mt-6 w-full">
              <p className="text-lg  font-semibold">
                {'o Offer price'} 
                <span className="text-sm text-ellipsis align-text-bottom text-cyan-200">{"(Amount you're willing to pay for this job)"}</span>
              </p>
              <div className="w-[100%] p-2 flex justify-start gap-4 md:gap-12 items-center h-[42px] bg-gray-50 font-semibold">
                <UserInputBase 
                  placeholder="OfferPrice"
                  onChange={(event) => handleChange(event, 'offerprice')}
                  type="number"
                  title='Offer Price'
                  required
                />
                <span className="hidden md:block font-semibold text-red-400">
                  {
                    offerPrice === ''? <Tooltip title='OfferPrice not set'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>            
                    </Tooltip> : <span className="font-semibold text-cyan-400">{`$${offerPrice}`}</span>
                  }
                </span>
              </div>
            </div>
          </Grid>
          <Grid item md={6} sx={{p: 6,}} className="hidden md:block">
            <div className="w-full h-[100%] bg-[url('/absorb.svg')] bg-no-repeat bg-cover bg-right-top p-4"/>
          </Grid>
        </Grid>

        {/* Collpasible (Choose tag) */}
        <div className="w-full flex justify-start">
          <Collapsible
             className="w-ful p-4 bg-gray1"
          >
            <Grid container xs={12}>
              {
                CATEGORIES.map((item, i) => {
                  const item_ = item.toLowerCase();
                  return (
                    <Grid item xs={4} md={2} key={i}>
                      <button 
                        className='w-full xs:w-[fit-content] text-xs text-cyan-200 bg-gray1 p-2 cursor-pointer hover:bg-green1' 
                        onClick={() => handleSelectItem(i)}
                        style={
                          selectedTags.includes(i)? {
                            background: '#7E7474',
                            color: 'white'
                            } : {}
                        }
                      >
                      { item_ }
                      </button>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Collapsible>
        </div>
        {/* Submit button */}
        <div className='w-full align-middle'>
          <button
            type="submit"
            className='w-full md:w-[25%] bg-green1 border border-gray1 rounded-lg p-1 md:p-6 md:h-10 flex justify-center items-center text-white1 font-semibold text-lg hover:text-cyan-600 hover:shadow-sm hover:shadow-white1 md:mt-8'
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

    </section>
  );
}
