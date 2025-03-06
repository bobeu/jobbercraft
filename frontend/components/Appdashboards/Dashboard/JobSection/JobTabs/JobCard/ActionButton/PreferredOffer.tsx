import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { flexSpread } from "@/constants";
import Tooltip from "@mui/material/Tooltip";
import { VoidFunc } from "@/customTypes";
import { PopUp } from "@/components/PopUp";
import { CustomButton } from "@/components/CustomButton";
import useAppStorage from "@/components/StateContextProvider/useAppStorage";

export const PreferredOffer : 
    React.FC<MyBestPriceInputProp> = 
        ({modalOpen, handleModalClose, hirerOffer, useHirerOffer}) => 
{
    const { proposedCompletionDate, myBestPrice, setPreferredoffer, setProposedCompletiondate } = useAppStorage();
    const title = `You have the option to negotiate your price. This is one way you can express your worth for the offer. However this is not the final offer. The Hirer will review it and you can check back later. Remember the job offer is $${hirerOffer}`;
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>, opType: OptType) => {
        e.preventDefault();
        const value = e.target.value;
        switch (opType) {
            case 'setoffer':
                setPreferredoffer(value);
                break;
            case 'setproposedtime':
                setProposedCompletiondate(value);
            default:
                break;
        }
    }

    return (
        <PopUp { ...{modalOpen, handleModalClose } } > 
            <Container maxWidth="xs" className="space-y-4">
                <Stack className="p-4 md:p-8 rounded-lg space-y-12 text-md bg-gray1 text-orange-300 shadow shadow-orange-200 text-center text-wrap ">
                    <div className={`${flexSpread}`}>
                        <button onClick={() => handleModalClose()} className="w-2/4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 lg:size-8 active:ring-1 text-orangec hover:text-orangec/70 rounded-lg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <Tooltip title={title}>
                            <h3 className="text-xl font-bold opacity-80">{"How long do you want to use the fund? (In hrs) "}</h3>
                        </Tooltip>
                    </div>
                    <Stack>
                    <Box className={`${flexSpread}`}>
                        <input 
                            id="MyBestPrice"
                            onChange={(e) => onChange(e, 'setoffer')}
                            type='text'
                            placeholder='Name your price'
                            className="bg-green1 rounded-[26px] p-3 text-xs w-[70%] text-white1/50"
                        />
                        <button className="w-[30%] p-3 rounded-lg text-sm text-orange-200">
                            {`${myBestPrice} hrs`}
                        </button>
                    </Box>
                    <Box className={`${flexSpread}`}>
                        <input 
                            id="ProposedCompletionDate"
                            onChange={(e) => onChange(e, 'setproposedtime')}
                            type='text'
                            placeholder='How long will you complete the job? (in hrs)'
                            className="bg-green1 rounded-[26px] p-3 text-xs w-[70%] text-white1/50"
                        />
                        <button className="w-[30%] p-3 rounded-lg text-sm text-orange-200">
                            {`${proposedCompletionDate} hrs`}
                        </button>
                    </Box>

                    </Stack>
                    <div className="flex justify-between items-center p-1 bg-green1 rounded-[26px]">
                        <CustomButton
                            handleButtonClick={useHirerOffer}
                            disabled={false}
                            overrideClassName="rounded-l-[26px] hover:shadow-sm hover:shadow-orange-200 p-3"
                        >
                            Use Epoch Duration
                        </CustomButton>
                        <CustomButton
                            handleButtonClick={handleModalClose}
                            disabled={false}
                            overrideClassName="bg-gray1 rounded-r-[26px] hover:shadow-sm hover:shadow-orange-200 p-3"
                        >
                            Submit
                        </CustomButton>
                    </div>
                </Stack>
            </Container>
        </PopUp>
    );
}

interface MyBestPriceInputProp {
    modalOpen: boolean;
    hirerOffer: string;
    handleModalClose: VoidFunc;
    useHirerOffer: VoidFunc
}

type OptType = 'setoffer' | 'setproposedtime';