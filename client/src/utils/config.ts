"use client";

import "@rainbow-me/rainbowkit/styles.css";
// import { createConfig, WagmiProvider, cookieStorage, createStorage, unstable_connector } from 'wagmi';
import { cookieStorage, createStorage } from "wagmi";

import {
  mainnet,
  polygon,
  //   optimism,
  //   arbitrum,
  //   base,
  //   zora,
  
  sepolia,
  //   bsc,
} from "wagmi/chains";

import {
  metaMaskWallet,
  binanceWallet,
  okxWallet,
  tokenPocketWallet,
  coinbaseWallet,
  walletConnectWallet,
  imTokenWallet,
  trustWallet,
  bitgetWallet,
  rainbowWallet,
  phantomWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

// Get the project ID from environment variables or use a default value
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || "default_project_id";


export const config = getDefaultConfig({
  appName: "BlinkPay",
  projectId,
  chains: [mainnet, polygon, sepolia],
  wallets: [
    {
      groupName: "Popular",
      wallets: [
        metaMaskWallet,
        binanceWallet,
        okxWallet,
        tokenPocketWallet,
        coinbaseWallet,
        walletConnectWallet,
        imTokenWallet,
        trustWallet,
        bitgetWallet,
        rainbowWallet,
        phantomWallet,
      ],
    },
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  // multiInjectedProviderDiscovery: false,
  // Warning: Make sure the transports configuration matches the enabled chains
  // transports: {
  //   [mainnet.id]: fallback([
  //     unstable_connector(injected),
  //     http()
  //   ]),
  //   [sepolia.id]: http(),
  // },
});