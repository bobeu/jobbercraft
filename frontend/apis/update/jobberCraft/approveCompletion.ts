import { getContractData } from "../../utils/getContractData";
import { simulateContract, writeContract } from "wagmi/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { approveCompletionAbi } from "@/apis/abis";
// import { errorMessage } from "../formatError";
import { ApproveCompletion, TrxResult } from "@/customTypes";

export default async function approveCompletion(args: ApproveCompletion) {
  const { config, callback, account, jobId } = args;
  const address = getContractData().jCraft;
  let returnValue : TrxResult = 'reverted'; 
  await simulateContract(config, {
    address,
    account,
    abi: approveCompletionAbi,
    functionName: "approveCompletion",
    args: [jobId]
  }).then(async({request}) => {
    const hash = await writeContract(config, request );
    callback?.({message: "Completing transaction"});
    returnValue = await waitForConfirmation({config, hash, callback: callback!});
  }).catch((error: any) => callback?.({message: error?.message || error?.data?.message || error}));
    
  return returnValue;
}

