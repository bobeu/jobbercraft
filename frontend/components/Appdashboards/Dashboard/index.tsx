import React from "react";
import { SmallRightArrow, IconEmployees } from "../../assets";
// import Address from "../AppMain/Address";
import Container from "@mui/material/Container";
import { useAccount, } from "wagmi";
import { ConnectWallet } from "@/components/ConnectWallet";
import AppNavigation from "./AppNavigation";
import { CustomButton } from "@/components/CustomButton";

function DashBoard() {
  const { isConnected, address } = useAccount();

  const handlePostJob = () => {
    
  }

  return (
    <React.Fragment>
      <section className="bg-[url('/map-background.svg')] bg-no-repeat bg-cover bg-right-top w-full bg-gray1 mt-8 md:mt-14" id='applandingpage'>
        <Container maxWidth='lg'>
          <div className="w-full flex justify-between items-center py-4 ">
            <h1 className="w-2/4 text-white1 text-lg font-semibold">
              Demo
            </h1>
            <div className="w-2/4 flex justify-end items-center">
              <ConnectWallet />
              <div className="w-full flex justify-start md:justify-end items-center gap-2">
                <h1 className="text-xl text-white">{"Hiring?"}</h1>
                <CustomButton 
                  disabled={!isConnected}
                  handleButtonClick={handlePostJob}
                  overrideClassName="flex items-center gap-1 p-2 h-[42px] font-medium text-gray1 text-lg bg-white1 w-[fit-content] hover:bg-white hover:shadow-md hover:shadow-yellow-500"
                >
                  <span>Post Job</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </CustomButton>
              </div>
            </div>
          </div>

          <div className="grid gap-y-6 gap-x-6 md:grid-cols-3 mb-10">
            <div className="grid gap-y-6 gap-x-6 md:col-span-3 md:grid-cols-3">
              {DashboardCards?.map(({ value, Icon, description, arrow }, index) => (
                <div key={index} className="p-3 flex flex-row items-center bg-cyan-100">
                  <div className="p-4">
                    { Icon }
                  </div>
                  <div className="p-4">
                    <h1 className="text-4xl font-bold text-cyan-700">
                      {value}
                    </h1>
                    <h1 className="text-cyan-700">{description}</h1>
                  </div>
                  <div className="flex-1" />
                  <div>{arrow}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
        <AppNavigation />
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
    arrow: <SmallRightArrow width="20" height="20" />
  },
  {
    value: "70",
    Icon: <IconEmployees width="20" height="20" />,
    description: "JOBBERS",
    path: null,
    arrow: <SmallRightArrow width="20" height="20" />
  },
  {
    value: "120",
    Icon: <IconEmployees width="20" height="20" />,
    description: "OPENED job",
    path: null,
    arrow: <SmallRightArrow width="20" height="20" />
  }
];
