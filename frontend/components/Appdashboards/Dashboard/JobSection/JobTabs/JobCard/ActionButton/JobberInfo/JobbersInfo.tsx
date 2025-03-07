import React from "react";
import { flexSpread, } from "@/constants";
import { JobberInfo } from '.';
import AddressWrapper from "@/components/AddressFormatter/AddressWrapper";
import { Address, FormattedJobberContent, FormattedJobContent, } from "@/customTypes";
import { formatAddr, } from "@/utilities";
import Button from '@mui/material/Button';
import Drawer from "../Confirmation/Drawer";

const BOXSTYLING = "h-[180px] lg:h-[150px] w-full rounded-lg border border-white1/20 p-4 space-y-2 text-orange-200 bg-white1/10";

export const InfoDisplay = ({ formattedJob, actions, popUpDrawer, toggleDrawer } : InfoDisplayProps) => {
    const {
        curator,
        // isCollab,
        // isHirer,
        job: { hirer },
        requests,
        tags
    } = formattedJob;

    const extractAddresses = () => {
        let addrs : Address[] = [];
        requests.forEach((rc) => {
            addrs.push(formatAddr(rc.identifier))
        });
        return addrs;
    }

    return(
        <Drawer openDrawer={popUpDrawer} setDrawerState={toggleDrawer} styles={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', gap: '16px', color: '#fed7aa', borderLeft: '1px solid rgb(249 244 244 / 0.2)',}} >
            <div className={`space-y-4`}>
                <div className={`${flexSpread} gap-6`}>
                    <button onClick={() => toggleDrawer(0)} className="w-2/4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 lg:size-8 active:ring-1 text-orangec hover:text-orangec/70 rounded-lg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    { actions }
                </div>
                <ul className={`bg-gray1 p-4 rounded-lg border border-white1/20 text-orange-400 font-normal text-sm`}>
                    <li className={`${flexSpread}`}>
                        <h3 className="">Hirer</h3>
                        <AddressWrapper 
                            size={4} 
                            copyIconSize="4" 
                            account={hirer}
                            overrideClassName="text-md" 
                            display 
                        />
                    </li>
                    <li className={`${flexSpread}`}>
                        <h3 className="">Curator</h3>
                        <AddressWrapper 
                            size={4} 
                            copyIconSize="4" 
                            account={curator}
                            overrideClassName="text-md" 
                            display 
                        />
                    </li>
                    {/* <li className={`${flexSpread}`} >
                        <h3 className="">{"Financed"}</h3>
                        <p className="">{`${allGh_toNumber}`}</p>
                    </li>
                    <li className={`${flexSpread}`} >
                        <h3 className="">{"Reserved Id"}</h3>
                        <p className="">{`${rId.toString()}`}</p>
                    </li> */}
                </ul>
                <ul className={`${BOXSTYLING} text-xs`}>
                    <h1>Tags</h1>
                    {
                        tags?.map((tag) => (
                            <Button variant="text">{tag}</Button>
                        ))
                    }
                </ul>
            </div>
        </Drawer>
    );
}

export const JobbersInfo: React.FC<ProvidersProps> = ({toggleDrawer, popUpDrawer, jobber_formatted}) => {
    return(
        <Drawer openDrawer={popUpDrawer} setDrawerState={toggleDrawer} styles={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', gap: '16px', color: '', borderLeft: '1px solid rgb(249 244 244 / 0.3)', height: "100%"}} >
            <div className="p-0 flex text-cyan-100 justify-between items-center text-lg md:text-xl font-bold">
                <h3>Requests to collaborate</h3>
                <button onClick={() => toggleDrawer(0)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 lg:size-8 active:ring-1 text-white1 hover:text-orangec/70 rounded-lg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <React.Fragment>
                {
                    jobber_formatted.map((data, i) => (
                        <JobberInfo
                            formattedData={data}
                            key={i} 
                            index={i}
                        />
                    ))
                }
            </React.Fragment>
        </Drawer>
    );
}

interface InfoDisplayProps {
    formattedJob: FormattedJobContent;
    actions: React.ReactNode;
    popUpDrawer: number;
    toggleDrawer: (arg: number) => void;
}

interface ProvidersProps {
    jobber_formatted: FormattedJobberContent[];
    popUpDrawer: number;
    toggleDrawer: (arg: number) => void;
}