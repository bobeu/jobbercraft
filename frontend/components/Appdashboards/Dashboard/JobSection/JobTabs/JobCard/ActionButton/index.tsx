import React from "react";
import { TxnType, FormattedJobContent, TransactionCallback, ApproveCompletion, ApproveRequests, BecomeAJobber, CancelJob, PostJob, RequestToWork, SubmitAndSignCompletion, ButtonObj, } from "@/customTypes";
import { formatAddr, handleTransact } from "@/utilities";
import useAppStorage from '@/components/StateContextProvider/useAppStorage';
import { PreferredOffer } from "./PreferredOffer";
import { Confirmation } from "./Confirmation";
import { CustomButton } from "@/components/CustomButton";
import { useAccount, useConfig } from "wagmi";

export const ActionButton = (props: RenderActionsProps) => {
    const { address } = useAccount()
    const config = useConfig();
    const { 
        buttonObj,
        hirerOffer,
        jobId,
        functionName,
        inputModalOn,
        confirmationDrawerOn,
        setInputModal,
        setDrawerState,
    } = props;

    const openDrawer = () => setDrawerState(1);
    const { setPreferredoffer, setmessage, myBestPrice, proposedCompletionDate } = useAppStorage();
    const handleModalClose = () => {
        if(myBestPrice === '0') {
            setPreferredoffer(hirerOffer);
        }
        setInputModal(false);
        openDrawer();
    }
    
    const callback : TransactionCallback = (arg) => {
        if(arg.status === 'success' && confirmationDrawerOn) {
            closeConfirmationPopUp();
        }
        setmessage(arg.message);
    }
    const closeConfirmationPopUp = () => setDrawerState(0);
    const useHirerOffer = () => {
        setPreferredoffer(hirerOffer);
        setInputModal(false);
        openDrawer();
    };

    const common = {
        account: formatAddr(address),
        config,
        callback,
        jobId
    }
    const otherParam : OtherParam = {
        request_TWK: {...common, myBestPrice: BigInt(myBestPrice), proposedCompletionDateInDays: Number(proposedCompletionDate) },
        submit_ASC: {...common },
        cancel_JOB: {...common },
        approve_CMP: {...common },
    }


    const handleClick = () => {
        if(functionName === 'requestToWork') {
            if(hirerOffer != '0'){
                setInputModal(true);
            } else {
                openDrawer();
            }
        } else {
            openDrawer();
        }
    }

    const sendTransaction = async() => {
        await handleTransact(
            {
                account: formatAddr(address),
                functionName,
                ...otherParam,
            }
        ); 
    }

    return(
        <React.Fragment>
            <CustomButton
                disabled={buttonObj.disable}
                handleButtonClick={handleClick}
                overrideClassName="bg-gray1 text-cyan-200 rounded-2xl w-full"
            >
                {buttonObj.buttonText}
            </CustomButton>
            <PreferredOffer 
               {
                   ...{
                        handleModalClose,
                        useHirerOffer,
                        modalOpen: inputModalOn,
                        hirerOffer,
                    }
                } 
            />
            <Confirmation
                openDrawer={confirmationDrawerOn}
                toggleDrawer={(arg: number) => setDrawerState(arg)}
                displayMessage={buttonObj.displayMessage}
                sendTransaction={sendTransaction}
            
            />
        </React.Fragment>
    );
}

export interface RenderActionsProps extends FormattedJobContent{
    jobId: bigint;
    hirerOffer: string;
    functionName: TxnType;
    inputModalOn: boolean;
    buttonObj: ButtonObj;
    confirmationDrawerOn: number;
    setDrawerState: (arg: number) => void
    setInputModal: (arg: boolean) => void
}

export interface OtherParam {
    approve_CMP?: ApproveCompletion;
    approve_RQS?: ApproveRequests;
    become_JOBBER?: BecomeAJobber;
    cancel_JOB?: CancelJob;
    post_JOB?: PostJob;
    request_TWK?: RequestToWork;
    submit_ASC?: SubmitAndSignCompletion;
}
