// import { getDefaultConfig } from 'connectkit';
// import { celoAlfajores, celo } from 'wagmi/chains';
// import createConfig from 'wagmi';

// const client = createConfig.WalletClient(
//   getDefaultConfig({
//     autoConnect: true,
//     appName: 'HiWork',
//     chains: [celoAlfajores, celo],
//     walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID!
//   })
// );

// export default client

// import "@rainbow-me/rainbowkit/styles.css"
import { configureChains, createConfig } from 'wagmi'
// import { celoAlfajores, celo } from 'wagmi/chains'
// import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultConfig } from 'connectkit';

const { chains, publicClient } = configureChains(
  [Alfajores, Celo],
  [publicProvider(),],
)

const connectors = [new InjectedConnector({chains})];
const appInfo = {
  appName: 'JobberCraft'
}                                                                       

export const client = createConfig(
  getDefaultConfig({
      walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID!,
      autoConnect: true,
      ...appInfo,
      connectors,
      publicClient,
    }
  )
)
// export const client = createConfig({
//   autoConnect: true,
//   connectors: [
//     new MetaMaskConnector({ chains }),
//     new InjectedConnector({
//       chains,
//       options: {
//         name: 'Injected',
//         shimDisconnect: true,
//       },
//     }),
//   ],
//   publicClient,
//   webSocketPublicClient,
// })