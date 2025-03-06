import { getJobberAbi } from "@/apis/abis";
import { getContractData } from "@/apis/utils/getContractData";
// import { Address } from "@/customTypes";

export default function getReadFunctions() {
    const { jCraft, jobber }= getContractData();

    const readAllJobs = () => {
        const contractConfig = {
            address: jCraft,
            abi: getJobberAbi,
            functionName: 'viewJobs',
            args: [],
        } as const;
        return contractConfig;
    }
    
    // const readUserDataConfig = ({user, bank, rId}: {user: Address, bank: Address, rId: bigint}) => {
    //     const contractConfig = {
    //         address: bank,
    //         abi: getUserDataAbi,
    //         functionName: "getUserData",
    //         args: [user, rId],
    //     } as const;
    //     return contractConfig;
    // }
    
    // const readAllowanceConfig = ({owner, spender}: {owner: Address, spender: Address}) => {
    //     const contractConfig = {
    //         address: token,
    //         abi: allowanceAbi,
    //         functionName: 'allowance',
    //         args: [owner, spender],
    //     } as const;
    //     return contractConfig;
    // } 
    
    // const readSymbolConfig = () => {
    //     const contractConfig = {
    //         abi: symbolAbi,
    //         address: token,
    //         functionName: 'symbol',
    //     } as const;
    //     return contractConfig;
    // }

    // const readBalanceConfig = ({account}: {account: Address}) => {
    //     const contractConfig = {
    //         address: token,
    //         abi: balanceOfAbi,
    //         functionName: 'balanceOf',
    //         args: [account],
    //     } as const;
    //     return contractConfig;
    // }
    
    // const readPoolConfig = ({unitId} : {unitId: bigint}) => {
    //     const contractConfig = {
    //         address: factory,
    //         abi: getPoolDataAbi,
    //         functionName: "getPoolData",
    //         args: [unitId]
    //     } as const;
    //     return contractConfig;
    // }
    
    // const readRecordConfig = ({rId} : {rId: bigint}) => {
    //     const contractConfig = {
    //         address: factory,
    //         abi: getRecordAbi,
    //         functionName: "getRecord",
    //         args: [rId]
    //     } as const;
    //     return contractConfig;
    // }
    
    // const collateralQuoteConfig = ({unit} : {unit: bigint}) => {
    //     const contractConfig = {
    //         address: factory,
    //         abi: getCollateralQuoteAbi,
    //         functionName: "getCollaterlQuote",
    //         args: [unit]
    //     } as const;
    //     return contractConfig;
    // }
    
    // const getFactoryDataConfig = () => {
    //     const contractConfig = {
    //         address: factory,
    //         abi: getFactoryDataAbi,
    //         functionName: 'getFactoryData',
    //         // query: {
    //         //     enabled: !!isConnected
    //         // },
    //     } as const;
    //     return contractConfig;
    // }

    return {
       readAllJobs
    }
}




