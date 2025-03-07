import { getContractData } from "../../utils/getContractData";
import { simulateContract, writeContract } from "wagmi/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { submitAndSignCompleteionAbi } from "@/apis/abis";
import { SubmitAndSignCompletion, TrxResult  } from "@/customTypes";

export default async function submitAndSignCompletion(param: SubmitAndSignCompletion) {
  const { config, account, callback, jobId } = param;
  const address = getContractData().jCraft;
  let returnValue : TrxResult = 'reverted';
  await simulateContract(config, {
    address,
    account,
    abi: submitAndSignCompleteionAbi,
    functionName: 'submitAndSignCompletion',
    args: [jobId],
  }).then(async({request}) => {
    callback?.({message: "Completing transaction"});
    const hash = await writeContract(config, request );
    returnValue = await waitForConfirmation({config, hash, callback: callback!});
  }).catch((error: any) => callback?.({message: error?.message || error?.data?.message || error}));
  
  return returnValue;
}
