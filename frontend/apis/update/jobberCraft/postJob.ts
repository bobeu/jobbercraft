import { getContractData } from "../../utils/getContractData";
import { simulateContract, writeContract } from "wagmi/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { postJobAbi } from "@/apis/abis";
import { errorMessage } from "../formatError";
import { PostJob, TrxResult } from "@/customTypes";

export default async function postJob(args: PostJob) : Promise<TrxResult> {
  const { curatorId, config, account, callback,  jobRef, jobType, offerPrice, proposedEndDateInDays, tags, title } = args;
  const address = getContractData().jCraft;
  let returnValue : TrxResult = 'reverted';
  await simulateContract(config, {
    address,
    account,
    abi: postJobAbi,
    functionName: 'postJob',
    args: [jobType, title, tags, jobRef, proposedEndDateInDays, offerPrice, curatorId]
  }).then(async({request}) => {
    callback?.({message: `Posting job onchain`});
    const hash = await writeContract(config, request );
    returnValue = await waitForConfirmation({config, hash, callback})
  }).catch((error: any) => {  
    callback?.({message: errorMessage(error)});
  });

  return returnValue;
}
