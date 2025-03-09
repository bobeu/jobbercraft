import { config as dotconfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-web3";
import { BigNumber } from "ethers";

dotconfig();

console.log(BigNumber.from(50).toString())
const PRIVATE_KEY = process.env.PRIVATE_KEY_0xD7c;
const UPGRADER_KEY = process.env.UPGRADER_KEY_0xF1;

const config: HardhatUserConfig = {
  paths: {
    deploy: 'deploy',
    deployments: 'deployments',
    imports: 'imports'
  },
  
  networks: {
    'electroneum-testnet': {
        url: 'https://rpc.ankr.com/electroneum_testnet'
      },
    testnet: {
      url: "https://rpc.ankr.com/electroneum_testnet",
      accounts: [`${PRIVATE_KEY}`],
      chainId: 5201420,
    },
  },

  namedAccounts: {
    deployer: {
      default: 0,
      5201420: `privatekey://${PRIVATE_KEY}`,
    },
    upgrader:{
      default: 0,
      5201420: `privatekey://${UPGRADER_KEY}`,
    }
  },

  solidity: {
    version: "0.8.24",
    settings: {          // See the solidity docs for advice about optimization and evmVersion
      optimizer: {
        enabled: true,
        runs: 200
      },
      // evmVersion: "byzantium"
      }
    },

    etherscan: {
      apiKey: {
        'electroneum-testnet': String(process.env.ETHERSCAN_API_KEY),
      },
      customChains: [
        {
          network: "electroneum-testnet",
          chainId: 5201420,
          urls: {
            apiURL: "https://testnet-blockexplorer.electroneum.com/api",
            browserURL: "https://testnet-blockexplorer.electroneum.com"
          }
        }
      ]
    }
};

export default config;

// npx hardhat verify --network electroneum-testnet 0x9F9f09832942E8A9030C089A589e4Be8AccC190C [50, 0xe09e23F8a8032BB39326098802c970f9b48D726C, 0xe09e23F8a8032BB39326098802c970f9b48D726C, 0x3cEF6b4a818fC29F7E5046DB55C50B226Df38934]
// https://testnet-blockexplorer.electroneum.com/address/0x3cEF6b4a818fC29F7E5046DB55C50B226Df38934/
// https://testnet-blockexplorer.electroneum.com/address/0x3cEF6b4a818fC29F7E5046DB55C50B226Df38934/

// https://testnet-blockexplorer.electroneum.com/address/0x9F9f09832942E8A9030C089A589e4Be8AccC190C/

// https://testnet-blockexplorer.electroneum.com/address/0x6c0DB3faE880a23f6b31e3DDa68866E3Ba2Bb57B/

// https://testnet-blockexplorer.electroneum.com/address/0xe09e23F8a8032BB39326098802c970f9b48D726C/