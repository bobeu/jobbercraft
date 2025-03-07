import React from "react";
import { flexSpread } from "@/constants";
import AddressWrapper from "@/components/AddressFormatter/AddressWrapper";
import Collapse from "@mui/material/Collapse";
import { FormattedJobberContent } from "@/customTypes";
import { Chevron } from "@/components/Collapsible";
import { getTimeFromEpoch } from "@/utilities";

export const JobberInfo = ({ formattedData, index }: ProviderProps) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const handleCollapse = () => setOpen(!open);

    const { 
        acceptance,
        identifier,
        myBestPrice,
        proposedJobEnd,
        signed
    } = formattedData;

    return(
        <div >
            <button onClick={handleCollapse} className={`w-full ${flexSpread} text-cyan-300 p-1 text-xs uppercase hover:text-cyan-700 focus:font-semibold`}>
                <h3>{`Jobber ${index + 1}`}</h3>
                <Chevron open={open} />
            </button>
            <Collapse in={open} timeout="auto" unmountOnExit className={'w-full bg-gray1 p-4 text-cyan-100'}>
                <ul className="w-full space-y-2 text-xs relative">
                    <li className={`${flexSpread} underline underline-offset-4`}>
                        <h3 className="text-center font-bold text-sm md:text-md">Address</h3>
                        <AddressWrapper size={3} account={identifier} display overrideClassName="text-sm" copyIconSize="4"/>
                    </li>
                    <li className={`${flexSpread}`}>
                        <h3>Absorbed</h3>
                        <h3 className="text-end">{acceptance? 'Accepted to collaborate' : 'Not accepted'}</h3>
                    </li>
                    <li className={`${flexSpread}`}>
                        <h3>Best Price</h3>
                        <h3>{myBestPrice}</h3>
                    </li>
                    <li className={`${flexSpread}`}>
                        <h3>Proposed Time of completion</h3>
                        <h3>{getTimeFromEpoch(proposedJobEnd)}</h3>
                    </li>
                    <li className={`${flexSpread}`}>
                        <h3>Signed job completion</h3>
                        <h3>{`${signed? 'Signed' : 'Not Signed'} USDT`}</h3>
                    </li>
                </ul>
            </Collapse>
        </div>
    );
}

interface ProviderProps {
    formattedData: FormattedJobberContent;
    index: number;
}