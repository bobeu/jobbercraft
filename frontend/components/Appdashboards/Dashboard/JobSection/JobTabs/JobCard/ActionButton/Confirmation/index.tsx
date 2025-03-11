import React from "react";
import Stack from "@mui/material/Stack";
import { Spinner } from "@/components/Spinner";
import useAppStorage from "@/components/StateContextProvider/useAppStorage";
import Drawer from './Drawer';
import Message from "@/components/Message";
import { VoidFunc } from "@/customTypes";
import ButtonTemplate from "@/components/ButtonTemplate";

export const Confirmation : 
    React.FC<{
        sendTransaction: () => Promise<void>;
        displayMessage?: string;
        toggleDrawer: (arg: number) => void
        openDrawer: number,
        back?: VoidFunc
    }> = 
        ({sendTransaction, back, toggleDrawer, openDrawer, displayMessage}) => 
{   
    const [loading, setLoading] = React.useState<boolean>(false);
    const { setmessage, closeDisplayForm } = useAppStorage();
    const handleCloseDrawer = () => {
        toggleDrawer(0);
        setmessage('');
    };

    const callback_after = (errored: boolean, error?: any) => {
        errored && setmessage(error?.message || error?.data.message);
        setLoading(false);
        setTimeout(() => {
            handleCloseDrawer();
            closeDisplayForm();
        }, 10000);
        clearTimeout(10000);
    }

    const handleSendTransaction = async() => {
        setLoading(true);
        await sendTransaction()
        .then(() => {
           callback_after(false);
           back?.();
        })
        .catch((error: any) => {
            callback_after(true, error?.message || error?.data.message);
        });
    }

    return (
        <Drawer 
            openDrawer={openDrawer} 
            setDrawerState={toggleDrawer}
            styles={{padding:'22px', borderLeft: '1px solid #2e3231', height: "100%"}}
        >
            <Stack className="p-4 space-y-4 text-orange-200 text-center">
                <button onClick={handleCloseDrawer} className="w-[fit-content] active:ring-1 bg-green1 rounded-full active:ring1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 lg:size-8 active:ring-1 text-orangec hover:text-orangec/70 rounded-lg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                <h1 className='pb-6 text-md'>{ loading? "Processing Transaction ..." : displayMessage || '' }</h1>
                <div className="w-full flex justify-around">
                    <button 
                        onClick={handleCloseDrawer}
                        className="border border-white2/30 px-3 py-2 rounded-xl text-red-400 w-[40%] hover:bg-gray1"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSendTransaction}
                        className="border border-white2/30 px-3 py-2 rounded-xl bg-gray1 text-cyan-400 w-[40%] hover:bg-gray1 place-items-center"
                    >
                        {loading ? <Spinner color={"white"} /> : "Proceed"}
                    </button>
                </div>
                <Message />
            </Stack>
        </Drawer>
    );
}
