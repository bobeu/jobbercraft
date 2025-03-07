import { getContractData } from "../../utils/getContractData";
import { simulateContract, writeContract } from "wagmi/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { postJobAbi } from "@/apis/abis";
import { PostJob, TrxResult } from "@/customTypes";
import getAllowance from "@/apis/testToken/getAllowance";
import { toBN } from "@/utilities";
import approve from "@/apis/testToken/approve";

export default async function postJob(args: PostJob) : Promise<TrxResult> {
  const { curatorId, config, account, callback,  jobRef, jobType, offerPrice, proposedEndDateInDays, tags, title } = args;
  const address = getContractData().jCraft;
  console.log("Args", args)
  let returnValue : TrxResult = 'reverted';
  const allowance = await getAllowance({account, config, owner: account, spender: address});
  console.log("Allowance", allowance);
  await approve({
    account,
    amountToApprove: offerPrice,
    config,
    callback,
  });
  // if(toBN(allowance.toString()).lt(toBN(offerPrice.toString()))){
  // }
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
    console.log("error", error)
    callback?.({message: error?.message || error?.data?.message || error});
  });

  return returnValue;
}
