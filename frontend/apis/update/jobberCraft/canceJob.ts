import { getContractData } from "../../utils/getContractData";
import { simulateContract, writeContract } from "wagmi/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { cancelJobAbi } from "@/apis/abis";
import { CancelJob, TrxResult } from "@/customTypes";

export default async function cancelJob(param: CancelJob) {
  const { config, account, callback, jobId } = param;
  const address = getContractData().jCraft;
  let returnValue : TrxResult = 'reverted';  
  await simulateContract(config, {
    address,
    account,
    abi: cancelJobAbi,
    functionName: 'cancelJob',
    args: [jobId],
  }).then(async({request}) => {
      callback?.({message: "Completing cancellation request"});
      const hash = await writeContract(config, request );
      returnValue = await waitForConfirmation({config, hash, callback: callback!});
    }).catch((error: any) => callback?.({message: error?.message || error?.data?.message || error}));

  return returnValue;
}
