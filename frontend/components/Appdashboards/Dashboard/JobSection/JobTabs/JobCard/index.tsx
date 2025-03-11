import React from "react";
import type {ButtonObj, FormattedJobContent,} from "@/customTypes";
import { JOBSTATUS, JOBTYPE, } from "@/constants";
import { CustomButton } from "@/components/CustomButton";
import { ActionButton, } from "./ActionButton";
import { InfoDisplay, JobbersInfo } from "./ActionButton/JobberInfo/JobbersInfo";
import { getTimeFromEpoch } from "@/utilities";

export const JobCard = ({jobDetail, jobId}: {jobDetail: FormattedJobContent, jobId: bigint}) => {
    const [inputModalOn, setInputModal] = React.useState<boolean>(false);
    const [confirmationDrawerOn, setDrawerState] = React.useState<number>(0);
    const [infoDrawer, setShowInfo]= React.useState<number>(0);
    const [providerDrawer, setProviderDrawer]= React.useState<number>(0);
    const[buttonObj, setButtonObj] = React.useState<ButtonObj>({functionName: 'null', buttonText: '',  disable: false});

    const { 
        job: { datePosted, jStatus, jobRef, jobType, offerPrice, proposeEnd, title},
        requests,
        isCollab,
        isHirer
    } = jobDetail;
    const status = JOBSTATUS[jStatus]
    const showProviderDetails = (arg:number) => setProviderDrawer(arg);

    React.useEffect(() => {
        switch (status) {
            case 'OPEN':
                if(!isCollab) setButtonObj({buttonText: 'Request Collab', functionName: 'requestToWork', disable: false, displayMessage: "Requesting collaboration"});
                else setButtonObj({buttonText: 'WAIT', functionName: 'null', disable: false});
                if(isHirer) setButtonObj({buttonText: 'Approve Request', functionName: 'approveRequestToWork', disable: false, displayMessage: "Approving request to work"});
                break;
    
            case 'TAKEN':
                if(isCollab) setButtonObj({functionName: 'submitAndSignCompletion', buttonText: 'Sign Completion', disable: false});
                else setButtonObj({functionName: 'null', buttonText: 'Not a Collab', disable: true});
                if(isHirer) setButtonObj({buttonText: 'Cancel?', functionName: 'cancel', disable: false});
                break;
            
            case 'COMPLETED':
                if(isHirer) setButtonObj({buttonText: 'Approve Completion', functionName: 'approveCompletion', disable: false});
                else setButtonObj({buttonText: 'WAIT', functionName: 'null', disable: true});
                break;
            default:
                setButtonObj({buttonText: 'NOT ALLOWED', functionName: 'null', disable: true});
                break;
        }    
    }, [status]);

    return(
        <React.Fragment>
            <div className={`relative shadow-lg bg-green1 space-y-4 shadow-green1 p-4 rounded-[26px] text-[14px]`}>
                <div className="flex gap-2 items-center ">
                    {/* <button onClick={() => showPermissionDetail(1)} className="bg-gray1 p-3 rounded-full hover:shadow-md hover:shadow-orange-200 focus:shadow-md focus:shadow-orange-200">{renderIcon(isPermissionless)}</button> */}
                    <div className="relative ">
                        <h3 className="absolute -top-2 left-0 text-orange-200 text-[10px]">{requests.length}</h3>
                        <button onClick={() => showProviderDetails(1)} className="bg-gray1 p-3 rounded-full hover:shadow-md hover:shadow-orange-200 focus:shadow-md focus:shadow-orange-200">
                            { 
                                status === 'OPEN'?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-cyan-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                    </svg> 
                                        : 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-cyan-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                    </svg>            
                            }
                        </button>
                    </div>
                </div>
                <div className="text-cyan-100 font-medium">
                    <span className="flex items-center gap-2 text-lg font-semibold text-cyan-500">
                        {/* <h1>{'Title:'}</h1> */}
                        <h1>{'Frontend Developer'}</h1>
                    </span>
                    <div className="flex items-center gap-2">
                        <h3>{'Posted:'}</h3>
                        <h3>{getTimeFromEpoch(datePosted)}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <h3>{'Proposed end:'}</h3>
                        <h3>{getTimeFromEpoch(proposeEnd)}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <h3>{'JobType:'}</h3>
                        <h3>{JOBTYPE[jobType]}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <h3 className="">{'Ref:'}</h3>
                        <h3 className="">Locked</h3>
                    </div>
                    <h2 className="absolute right-0 top-[1px] text-lg lg:text-2xl p-2 font-black text-cyan-500 bg-gray1 border-r border-r-green1 rounded-tr-[26px] rounded-bl-[">
                        {`$${offerPrice}`}
                    </h2>
                </div>
                <div className="w-full flex flex-col justify-between items-center">
                    <div className="w-full flex flex-col justify-between items-center space-y-2">
                        <CustomButton
                            disabled={false}
                            handleButtonClick={() => setShowInfo(1)}
                            overrideClassName="bg-green1 border border-gray1 w-full rounded-2xl text-white1/60"
                        >
                            More Info
                        </CustomButton>
                        <ActionButton
                            {
                                ...{
                                    ...jobDetail,
                                    jobId: BigInt(jobId),
                                    buttonObj,
                                    inputModalOn,
                                    hirerOffer: offerPrice,
                                    functionName: "becomeAJobber",
                                    confirmationDrawerOn,
                                    setDrawerState: (arg: number) => setDrawerState(arg),
                                    setInputModal: (arg: boolean) => setInputModal(arg)
                                }
                            }                        
                        />
                    </div>
                </div>
            </div>
            <JobbersInfo
                popUpDrawer={providerDrawer}
                toggleDrawer={showProviderDetails}
                jobber_formatted={requests}
            />
            {
                (!confirmationDrawerOn && !inputModalOn) && 
                    <InfoDisplay 
                        formattedJob={jobDetail}
                        popUpDrawer={infoDrawer}
                        toggleDrawer={(arg) => setShowInfo(arg)}
                        actions={
                            <ActionButton 
                                {
                                    ...{
                                        ...jobDetail,
                                        jobId: BigInt(jobId),
                                        buttonObj,
                                        inputModalOn,
                                        hirerOffer: offerPrice,
                                        functionName: "becomeAJobber",
                                        confirmationDrawerOn,
                                        setDrawerState: (arg: number) => setDrawerState(arg),
                                        setInputModal: (arg: boolean) => setInputModal(arg),
                                    }
                                }
                            />
                        } 
                    />
            }
        </React.Fragment>
    )
}
