/**
 * @dev 
 * Celo : cUSD
 * BSC : BUSD
 * Polygon : MATIC
 */
const chains = {
  hardhat: {
    usd: "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747",
    keyHash: "0xcc294a196eeeb44da2888d17c0625cc88d70d9760a69d58d853ba6581a9ab0cd",
    vrfCoordinator: "0xAE975071Be8F8eE67addBC1A82488F1C24858067",
  },
  celo: {
    testnet: {
      chainId: 44787,
      url: "https://alfajores-forno.celo-testnet.org",
      usd: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
      keyHash: "",
      vrfCoordinator: ""
    },
    mainnet: {
      chainId: 42220,
      url: "https://forno.celo.org",
      usd: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
      keyHash:"",
      vrfCoordinator: ""
    }
  },
  bsc: {
    testnet: {
      chainId: 97,
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      usd: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
      keyHash: "0xd4bb89654db74673a187bd804519e65e3f71a52bc55f11da7601a13dcf505314",
      vrfCoordinator: "0x6A2AAd07396B36Fe02a22b33cf443582f682c82f",
      subId: 3169
    },
    mainnet: {
      chainId: 56,
      url: "https://bsc-dataseed1.binance.org/",
      56: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      keyHash: "",
      cvrfCoordinator: "",
      subId: 0
    }
  },
  polygon: {
    testnet: {
      chainId: 80001,
      url: "https://rpc-mumbai.maticvigil.com/",
      usd: "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747",
      keyHash: "0xcc294a196eeeb44da2888d17c0625cc88d70d9760a69d58d853ba6581a9ab0cd",
      vrfCoordinator: "0xAE975071Be8F8eE67addBC1A82488F1C24858067",
      subId: 3169
    },
    mainnet: {
      chainId: 137,
      url: "https://polygon-mainnet.infura.io/",
      usd: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      keyHash: "",
      vrfCoordinator: ""
    }
  },
}
export default chains;