import { getContractData } from "../../utils/getContractData";
import { simulateContract, writeContract } from "wagmi/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { becomeAJobberAbi } from "@/apis/abis";
import { errorMessage } from "../formatError";
import { BecomeAJobber, TrxResult } from "@/customTypes";

export default async function becomeAJobber(args: BecomeAJobber ) {
  const { config, callback, account, value, aka, avatarUrl, field, name, profileURI } = args;
  const address = getContractData().jobber;
  let returnValue : TrxResult = 'success'; 
  await simulateContract(config, {
    address,
    account,
    abi: becomeAJobberAbi,
    functionName: 'becomeAJobber',
    args: [name, aka, field, profileURI, avatarUrl],
    value
  }).then(async({request}) => {
    const hash = await writeContract(config, request );
    callback?.({message: "Creating a new profile"});
        returnValue = await waitForConfirmation({config, hash, callback: callback!});
      }).catch((error: any) => {
        returnValue = 'reverted';
        callback?.({message: errorMessage(error)});
      });
  
    return returnValue;
}

