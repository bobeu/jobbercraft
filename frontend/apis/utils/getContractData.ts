import jobberCraft from "@/deployments/testnet/JobberCraft.json";
import jobber from "@/deployments/testnet/Jobber.json";
import tUSDT from "@/deployments/testnet/TestUSDT.json";
import { Address } from "@/customTypes";

export const formatAddr = (x: string | (Address | undefined)) : Address => {
    if(!x || x === "") return `0x${'0'.repeat(40)}`;
    return `0x${x.substring(2, 42)}`;
};

export const getContractData = () => {
    return {
        tUSDT: formatAddr(tUSDT.address),
        jCraft: formatAddr(jobberCraft.address),
        jobber: formatAddr(jobber.address)
    };
}
