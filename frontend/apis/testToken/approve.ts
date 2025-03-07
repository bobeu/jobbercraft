import { Config,} from "@/customTypes";
import { writeContract, simulateContract } from "wagmi/actions";
import { waitForConfirmation } from "../utils/waitForConfirmation";
import { getContractData } from "../utils/getContractData";
import { approveAbi } from "../abis";

export default async function approve(args: ApproveParam) {
  const { callback, config, account, amountToApprove } = args;
  const { tUSDT, jCraft} = getContractData();
    await simulateContract(config, {
      address: tUSDT,
      account,
      abi: approveAbi,
      functionName: "approve", 
      args: [jCraft, amountToApprove]
    })
    .then(async({request}) => {
        callback?.({message: "Approving spending limit..."});
        const hash = await writeContract(config, request );
        await waitForConfirmation({config, hash, callback: callback!});
  }).catch((error: any) => callback?.({message: error?.message || error?.data?.message || error}));       
}

export interface ApproveParam extends Config {
  amountToApprove: bigint;
}
