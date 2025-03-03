import { config as dotconfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-web3";

dotconfig();

const PRIVATE_KEY = process.env.PRIVATE_KEY_0xD7c;
const UPGRADER_KEY = process.env.UPGRADER_KEY_0xF1;

const config: HardhatUserConfig = {
  paths: {
    deploy: 'deploy',
    deployments: 'deployments',
    imports: 'imports'
  },
  
  networks: {
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
};

export default config;
