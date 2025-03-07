import { getContractData } from "../../utils/getContractData";
import { simulateContract, writeContract } from "wagmi/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { approveRequestAbi } from "@/apis/abis";
import { ApproveRequests, TrxResult } from "@/customTypes";

export default async function approveRequest(args: ApproveRequests) {
  const { config, callback, account, selectedPositions, jobId} = args;
  const address = getContractData().jCraft;
  let returnValue : TrxResult = 'reverted'; 
  await simulateContract(config, {
    address,
    account,
    abi: approveRequestAbi,
    functionName: 'approveRequests',
    args: [jobId, selectedPositions]
  }).then(async({request}) => {
    const hash = await writeContract(config, request );
    callback?.({message: `Approving request`});
    returnValue = await waitForConfirmation({config, hash, callback: callback!});
  }).catch((error: any) => callback?.({message: error?.message || error?.data?.message || error}));
        
  return returnValue;
}

