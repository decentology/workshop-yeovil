import React, { createContext, FC } from "react";
import {
  chain,
  Connector,
  defaultChains,
  InjectedConnector,
  Provider as WagmiProvider,
} from "wagmi";
import { providers } from "ethers";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
type EthereumContext = {};
const Context = createContext<EthereumContext>({});
Context.displayName = "EthereumContext";

const Provider: FC<any> = ({ children, ...props }) => {
  const infuraId = props.infuraId || "fb9f66bab7574d70b281f62e19c27d49";

  // Chains for connectors to support
  const chains = defaultChains;
  const defaultChain = chain.ropsten;
  const connectors = ({ chainId }: { chainId?: number }) => {
    return [
      new InjectedConnector({ chains }),
      new WalletConnectConnector({
        options: {
          infuraId,
          qrcode: true,
          rpc: {
            1: `https://rinkeby.infura.io/v3/${infuraId}`,
          },
        },
      }),
    ];
  };

  type ProviderConfig = { chainId?: number; connector?: Connector };
  const isChainSupported = (chainId?: number) =>
    chains.some((x) => x.id === chainId);

  const provider = ({ chainId }: ProviderConfig) =>
    providers.getDefaultProvider(
      isChainSupported(chainId) ? chainId : defaultChain.id,
      {
        infuraId,
      }
    );

  const webSocketProvider = ({ chainId }: ProviderConfig) =>
    isChainSupported(chainId)
      ? new providers.InfuraWebSocketProvider(chainId, infuraId)
      : undefined;
  return (
    <WagmiProvider
      autoConnect
      provider={provider}
      connectors={connectors}
      webSocketProvider={webSocketProvider}
    >
      {children}
    </WagmiProvider>
  );
};

export default { Context, Provider };
