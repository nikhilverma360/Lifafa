//import { OktoConnector } from "@okto_wallet/okto-connect-sdk";
import { createConfig } from "wagmi";
import { appChains, wagmiConnectors } from "~~/services/web3/wagmiConnectors";

// const oktoConnector = new NewOktoConnector({
//   chains,
//   options: {
//     projectId: "WALLET_CONNECT_PROJECT_ID",
//   },
// });
export const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: wagmiConnectors,
  publicClient: appChains.publicClient,
});
