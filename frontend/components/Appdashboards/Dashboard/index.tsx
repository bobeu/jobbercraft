import React from "react";
import { SmallRightArrow, IconEmployees } from "../../assets";
// import Address from "../AppMain/Address";
import Container from "@mui/material/Container";
import { useAccount, } from "wagmi";
import { ConnectWallet } from "@/components/ConnectWallet";
import AppNavigation from "./AppNavigation";
import { CustomButton } from "@/components/CustomButton";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const [value, setValue] = React.useState(0);
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  const handlePostJob = () => setValue(1);

  // const handleChangeIndex = (index: number) => {
  //   setValue(index);
  // };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleButtonClick = () => navigate('/', {preventScrollReset: true});

  return (
    <React.Fragment>
      <section className="bg-[url('/map-background.svg')] bg-no-repeat bg-cover bg-right-top w-full bg-gray1" id='applandingpage'>
        <Container maxWidth='lg'>
          <div className="w-full flex justify-between items-center py-4 ">
            <button onClick={handleButtonClick} className=" text-white1/30 md:text-white1/70 text-sm md:text-lg border border-white1/30  px-3 py-2 rounded-xl font-semibold hover:text-cyan-400">
              Back
            </button>
            <div className="md:hidden"><ConnectWallet /></div>

            <div className="md:w-[70%] flex justify-between items-center">
              <div className="hidden md:block"><ConnectWallet /></div>

              <div className="flex items-center gap-2">
                <h1 className="text-xl hidden md:block text-white">{"Hiring?"}</h1>
                <button 
                  disabled={!isConnected}
                  onClick={handlePostJob}
                  className="flex justify-between items-center gap-1 font-medium text-cyan-200 border border-white1/30 px-3 py-2 rounded-xl hover:text-white"
                >
                  <span>Post-Job</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

          <div className="grid gap-y-6 gap-x-6 md:grid-cols-3 mb-10">
            <div className="grid gap-y-6 gap-x-6 md:col-span-3 md:grid-cols-3">
              {DashboardCards?.map(({ value, Icon, description}, index) => (
                <div key={index} className="p-3 flex flex-row items-center bg-gray1 border border-white1/20 rounded-xl text-4xl font-bold text-cyan-500">
                  <div className="p-4">
                    { Icon }
                  </div>
                  <div>
                    <h1>{value}</h1>
                    <h1 className="text-lg text-white1/50">{description}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
        <AppNavigation handleChange={handleChange} value={value}/>
      </section>
    </React.Fragment>
  );
}
export default DashBoard;

const DashboardCards = [
  {
    value: "$5,500",
    Icon: <IconEmployees width="20" height="20" />,
    description: "TVL",
    path: null,
    // arrow: <SmallRightArrow width="20" height="20" />
  },
  {
    value: "70",
    Icon: <IconEmployees width="20" height="20" />,
    description: "JOBBERS",
    path: null,
    // arrow: <SmallRightArrow width="20" height="20" />
  },
  {
    value: "120",
    Icon: <IconEmployees width="20" height="20" />,
    description: "OPENED job",
    path: null,
    // arrow: <SmallRightArrow width="20" height="20" />
  }
];
