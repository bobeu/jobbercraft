import assert from "assert";
import BigNumber from "bignumber.js";
import { 
  Address, 
  AllJobs, 
  FormattedJob, 
  FormattedJobberContent, 
  FormattedJobContent, 
  HandleTransactionParam, 
  Jobber, 
  JobMetadata, 
  Metadata 
} from "./customTypes";
import postJob from "./apis/update/jobberCraft/postJob";
import becomeAJobber from "./apis/update/jobberCraft/becomeAJobber";
import approveCompletion from "./apis/update/jobberCraft/approveCompletion";
import cancelJob from "./apis/update/jobberCraft/canceJob";
import approveRequest from "./apis/update/jobberCraft/approveRequest";
import requestToWork from "./apis/update/jobberCraft/requestToWork";
import submitAndSignCompletion from "./apis/update/jobberCraft/submitAndSignCompletion";
import { formatEther } from "viem";

export type Operation = 'Open' | 'Closed';

/**
 * Converts value of 'value' of type string to 'ether' representation.
 * @param value : Value to convert.
 * @returns Formatted value.
 */
export const formatValue = (value: string | undefined): string => {
  return formatEther(BigInt(value || '0'));
}

export const str = (arg: string | undefined) => String(arg);
export const num = (arg: number | undefined) => Number(arg);

export const formatAddr = (x: string | (Address | undefined)) : Address => {
  if(!x || x === "") return `0x${'0'.repeat(40)}`;
  return `0x${x.substring(2, 42)}`;
};

export const toBigInt = (x: string | number | undefined) : bigint => {
  return BigInt(x || '0');
} 

export const toBN = (x: string | number ) => {
  return new BigNumber(x);
}

export function getTimeFromEpoch(onchainUnixTime: number) {
  var date = new Date(onchainUnixTime * 1000);
  return (onchainUnixTime === 0? 'Not Set' : `${date.toLocaleDateString("en-GB")} ${date.toLocaleTimeString("en-US")}`);
}

export const commonStyle = (props?: {}) => {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    p: 2,
    ...props
  };
} 

export const handleTransact = async(param: HandleTransactionParam) => {
  const { functionName, post_JOB, request_TWK, approve_CMP, approve_RQS, become_JOBBER, cancel_JOB, submit_ASC} = param;

  switch (functionName) {
    case 'postJob':
      assert(post_JOB, "post_JOB: Args not found")
      await postJob(post_JOB);
      break;
    case 'becomeAJobber':
      assert(become_JOBBER, "become_JOBBER: Args not found")
      const get = await becomeAJobber(become_JOBBER);
      break;
    case 'approveCompletion':
      assert(approve_CMP, "approve_CMP: Args not found");
      await approveCompletion(approve_CMP);  
      break;
    case 'cancel':
      assert(cancel_JOB, "cancel_JOB: Args not found");
      await cancelJob(cancel_JOB); 
      break;
    case 'approveRequestToWork':
      assert(approve_RQS, "approve_RQS: Args not found");
      await approveRequest(approve_RQS);
      break;
    case 'requestToWork':
      assert(request_TWK, "request_TWK: Arg not found");
      await requestToWork(request_TWK)
      break;
    case 'submitAndSignCompletion':
      assert(submit_ASC, "submit_ASC: Arg not found");
      await submitAndSignCompletion(submit_ASC)
    default:
      break;
  }
}

const formattedJobber = (data: Jobber) : FormattedJobberContent => {
  return {
    acceptance: data.acceptance,
    identifier: formatAddr(data.identifier),
    myBestPrice: formatEther(data.myBestPrice),
    proposedJobEnd: toBN(data.proposedJobEnd.toString()).toNumber(),
    signed: data.signed
  }
}

const formatJob = (data: Metadata) : FormattedJob => {
  return {
    datePosted: toBN(data.datePosted.toString()).toNumber(),
    hirer: formatAddr(data.hirer),
    jobRef: data.jobRef,
    jobType: data.jobType,
    jStatus: data.jStatus,
    offerPrice: toBN(formatEther(data.offerPrice)).decimalPlaces(0).toString(),
    proposeEnd: toBN(data.proposeEnd.toString()).toNumber(),
    signature: data.signature,
    title: data.title
  }
}

/**
 * Converts raw job data to displayable data 
 * @param jobMetadata : Job metadata array
 * @returns : Formatted data
*/
export const formatJobContent = (jobMetadata: AllJobs, currentUser: Address) : {userJob: FormattedJobContent[], result: FormattedJobContent[]} => {
  let userJob : FormattedJobContent[] = [];
  const result = jobMetadata.map((item) => {
    const {
      curator,
      job,
      requests,
      tags
    } = item;

    const res : {
      curator: Address, 
      job: FormattedJob, 
      requests: FormattedJobberContent[], 
      tags: string[],
      isCollab: boolean,
      isHirer: boolean
    } = {
      curator: formatAddr(curator),
      job: formatJob(job),
      requests: [],
      tags: tags.map((tag) => {
        return tag.toString();
      }),
      isCollab: false,
      isHirer: job.hirer.toLowerCase() === currentUser.toLowerCase()
    }
    if(requests && requests.length > 0) {
      requests.forEach((data) => {
        res.requests.push(formattedJobber(data));
        if(data.identifier.toLowerCase() === currentUser.toLowerCase()){
          res.isCollab = true;
          userJob.push(res);
        }
      });
    }
    return res
  });
  return {
    userJob,
    result
  }
}

// export const formatProfileData = (param: C3.ContributorStruct) : FormattedData => {
//   const { payDate, colBals, turnTime, durOfChoice, expInterest, sentQuota, id, loan, } = param;
//   const payDate_InSec = toBN(payDate.toString()).toNumber();
//   const turnTime_InSec = toBN(turnTime.toString()).toNumber();
//   const durOfChoice_InSec = toBN(durOfChoice.toString()).toNumber();
//   const colBals_InEther = formatEther(toBigInt(toBN(colBals.toString()).toString()));
//   const loan_InEther = formatEther(toBigInt(toBN(loan.toString()).toString()));
//   const loan_InBN = toBN(loan.toString());
//   const expInterest_InEther = formatEther(toBigInt(toBN(expInterest.toString()).toString()));
//   const payDate_InDateFormat = getTimeFromEpoch(payDate_InSec);
//   const turnTime_InDateFormat = getTimeFromEpoch(turnTime_InSec);
//   const id_lowerCase = id.toString().toLowerCase()

//   return {
//     payDate_InDateFormat,
//     payDate_InSec,
//     turnTime_InDateFormat,
//     turnTime_InSec,
//     durOfChoice_InSec,
//     colBals_InEther,
//     loan_InEther,
//     expInterest_InEther,
//     id_lowerCase,
//     id_toString: id.toString(),
//     loan_InBN,
//     sentQuota
//   }
// }
