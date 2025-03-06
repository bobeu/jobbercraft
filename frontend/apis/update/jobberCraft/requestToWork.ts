import { RequestToWork, TrxResult } from "@/customTypes";
import { getContractData } from "../../utils/getContractData";
import { simulateContract, writeContract } from "wagmi/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { requestWorkAbi } from "@/apis/abis";
import { errorMessage } from "../formatError";

export default async function requestToWork(args: RequestToWork) {
  const { config, callback, account, jobId, myBestPrice, proposedCompletionDateInDays } = args;
  const address = getContractData().jCraft;
  let returnValue : TrxResult = 'reverted'; 
  await simulateContract(config, {
    address,
    account,
    abi:requestWorkAbi,
    functionName: "requestToWork",
    args: [jobId, proposedCompletionDateInDays, myBestPrice]
  }).then(async({request}) => {
    const hash = await writeContract(config, request );
    callback?.({message: "Sending your request"});
    returnValue = await waitForConfirmation({config, hash, callback: callback!});
  }).catch((error: any) => callback?.({message: errorMessage(error)}));
      
  return returnValue;
}

