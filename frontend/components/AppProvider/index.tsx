import { WagmiProvider } from "wagmi";
import { getDefaultConfig, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { str } from "@/utilities";
import { ReactNode } from "react";
import { Chain } from "viem";
import {  } from 'wagmi/chains';

const projectId = str(process.env.NEXT_PUBLIC_PROJECT_ID);
if (!projectId) throw new Error('Project ID is undefined');

const electroneum_testnet : Chain = {
  id: 5201420,
  name: "Testnet",
  nativeCurrency: {
    name: "ETN Token",
    symbol: "ETN",
    decimals: 18
  },
  blockExplorers: {
    default: {
      name: "ETN",
      url: ""
    }
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.ankr.com/electroneum_testnet", "https://testnet-rpc.electroneum.com"],
      webSocket: []
    }
  }
}

const config = getDefaultConfig({
  appName: 'Simplifinance',
  projectId,
  appIcon: '/favicon-32x32.png',
  appDescription: 'A decentralized freelancing protocol',
  appUrl: '',
  chains: [ electroneum_testnet],
  
});

const theme = lightTheme(
  {
    ...lightTheme.accentColors.purple,
    accentColorForeground: 'rgb(58, 188, 220)',
    borderRadius: 'large',
    fontStack: 'system',
    overlayBlur: 'small',
    accentColor: '#2E3231'
  }
)

export default function AppProvider({children} : {children: ReactNode}) {
  return(
    <WagmiProvider config={config}>
      <QueryClientProvider client={new QueryClient()}>
        <RainbowKitProvider modalSize="compact" theme={theme} initialChain={electroneum_testnet.id} showRecentTransactions={true}>
          { children }
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}