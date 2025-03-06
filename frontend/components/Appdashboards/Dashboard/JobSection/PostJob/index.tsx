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

export default function PostJob() {
  let clicked = React.useRef<boolean[]>([]);
  const [useModerator, setUseModerator] = React.useState<boolean>(false);
  const [date, setDate] = React.useState<number | undefined>();
  const [isCalendarActive, setModal] = React.useState<boolean>(false);
  const [selectedCategories, setSelected] = React.useState<number[]>([]);
  const [value, setValue] = React.useState<number | string>();
  const [uri, setURI] = React.useState<string>();
  const [open, setOpen] = React.useState<boolean>(false);
   
  React.useEffect(() => {
    if(open) setOpen(false);
  }, []);

  const handleSelectItem = (val: number) => {
    const isClicked = clicked.current[val];
    if(selectedCategories.length === 5 && !isClicked) return alert('Max of 5 categories allowed');
    if(!isClicked) {
      clicked.current[val] = true;
      setSelected((prev) => [...prev, val]);
    } else {
      clicked.current[val] = false;
      const newList = selectedCategories.filter((item) => item !== val);
      setSelected(newList)
    }
  }

  const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, callback: (x:string) => void) => {
    callback(event.target.value);
  }

  const setdate = (callDate: number | undefined) => setDate(callDate);

  return (
    <section className="w-full h-[100%] p-4 bg-cyan-900 text-cyan-200">
      <h1 className="p-2 text-2xl text-cyan-300 font-semibold">Create New Job</h1>
      <div className="mt-6  w-full p-4">
        <Grid item container xs={12}>
          <Grid item xs={12} md={6}>
            {/* UseModerator */}
            <div className="w-full">
              <p className="text-lg font-semibold">
                {'o Use Moderator?'} <span className="text-sm text-ellipsis align-text-bottom text-cyan-400">{"(Using a moderator ensures quality and timely delivery)"}</span>
              </p>
              <div className="w-[100%] p-4 flex justify-start items-center gap-6 h-[42px] cursor-pointer bg-gray-50 font-semibold hover:bg-opacity-80" onClick={() => setUseModerator(!useModerator)}>
                <span className="text-xs text-[#878adb] text-opacity-30">Click me</span>
                {useModerator ? <span className="font-semibold">Yes {', Now using moderator'}</span> : <span className="font-semibold">No {', Thanks'}</span>}
              </div>
            </div>

            {/* Display Calendar
            <div>
            </div> */}
              {/* <DisplayCalendarModal open={isCalendarActive} handleClose={closeCalendar} children={<Calendar defaultActiveStartDate={new Date()} onChange={onChange} value={date} className={isCalendarActive ? "" : "hidden"} tileClassName={"text-cyan-500"} />} /> */}

            {/*Top Textfield*/}
            <div className="mt-6 w-full">
              <p className="text-lg  font-semibold">
                {'o Description link'} 
                <span className="text-sm text-ellipsis align-text-bottom text-cyan-400">{"(This could be a github link or link to Google spreadsheet)"}</span>
              </p>
              <div className="w-full p-2 flex justify-start gap-1 md:gap-12 items-center h-[42px] bg-gray-50 text-cyan-400 font-semibold">
                <UserInputBase 
                  placeholder="Job description URI"
                  onChange={(event) => handleChange(event, setURI)}
                  type="text"
                  title='Job description'
                  required
                />
                <span className="hidden md:block font-semibold text-red-400">{ 
                  !uri? <Tooltip title='Job description link not set'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>            
                  </Tooltip> : <span className="font-semibold text-cyan-400">{uri}</span>
                }</span>
              </div>
            </div>

            {/*Bottom Textfield */}
            <div className="mt-6 w-full">
              <p className="text-lg  font-semibold">
                {'o Offer price'} 
                <span className="text-sm text-ellipsis align-text-bottom text-cyan-400">{"(Amount you're willing to pay for this job)"}</span>
              </p>
              <div className="w-[100%] p-2 flex justify-start gap-4 md:gap-12 items-center h-[42px] bg-gray-50 text-cyan-400 font-semibold">
                <UserInputBase 
                  placeholder="OfferPrice"
                  onChange={(event) => handleChange(event, setValue)}
                  type="number"
                  title='Offer Price'
                  required
                />
                <span className="hidden md:block font-semibold text-red-400">
                  {
                    !value? <Tooltip title='OfferPrice not set'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>            
                    </Tooltip> : <span className="font-semibold text-cyan-400">{`$ ${value}`}</span>
                  }
                </span>
              </div>
            </div>

            
            {/* UseCalendar */}
            <div className="mt-6 w-full">
              <p className="text-lg  font-semibold">
                {"o Expected Job Completion Date"}
                <span className="text-sm text-ellipsis align-text-bottom text-cyan-400">{" (EJCD)"}</span>
              </p>
              <DisplayCalendarModal setSelected={setdate}/>
              {/* <div className="w-[100%] p-4 cursor-pointer flex justify-start items-center gap-2 h-[42px] bg-gray-50 text-cyan-400 font-semibold hover:bg-opacity-80" onClick={() => setModal(!isCalendarActive)}>
              </div> */}
                {/* <span className="text-xs text-[#878adb] text-opacity-30">Click me</span>
                <span className="font-semibold">{date?.getTime() || "Pick date"}</span> */}
            </div>
          </Grid>

          <Grid item md={6} sx={{p: 6,}} className="hidden md:block">
            <div className="w-full h-[100%] bg-[url('/absorb.svg')] bg-no-repeat bg-cover bg-right-top p-4"/>
          </Grid>
        </Grid>

        {/* Collpasible (Choose tag) */}
        <div className="flex justify-start">
          <Collapsible 
            items={
              [
                {
                  key: 1,
                  label: <div className="xs:w-[200px] font-semibold text-cyan-700">Choose Tag</div>,
                  children: <Grid item container xs spacing={0}>
                    <Grid item container xs={12} spacing={1}>
                      {
                        CATEGORIES.map((item, i) => {
                          const item_ = item.toLowerCase();
                          return (
                            <Grid item xs={4} md={2} key={i}>
                              <button 
                                className='w-[100%] xs:w-[fit-content] text-xs text-cyan-300 bg-cyan-900 p-2 cursor-pointer hover:bg-cyan-800' 
                                onClick={() => handleSelectItem(i)}
                                style={selectedCategories.includes(i)? {
                                  background: '#7E7474',
                                  color: 'white'
                                } : {}}
                              >
                                { item_ }
                              </button>
                            </Grid>
                          )
                        })
                      }
                    </Grid>
                  </Grid>
                }
              ]
            }
          />
        </div>
        {/* Submit button */}
        <div className='w-full align-middle'>
          <button
            type="submit"
            className='w-full md:w-[25%] bg-cyan-300 p-1 md:p-6 md:h-10 flex justify-center items-center text-cyan-500 md:text-cyan-700  font-semibold text-lg hover:bg-cyan-500 md:hover:text-cyan-300 md:mt-8'
          >
            Submit
          </button>
        </div>
      </div>

    </section>
  );
}
