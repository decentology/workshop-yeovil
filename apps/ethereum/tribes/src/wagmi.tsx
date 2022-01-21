import { ReactNode } from 'react'
import {
  Provider,
  WalletConnectConnector,
  defaultChains,
  InjectedConnector,
} from 'wagmi'

const infuraId = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!

// Chains for connectors to support
const chains = defaultChains
type Config = { chainId?: number }

const connectors = ({ chainId }:Config) => {
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
  ]
}

export const App = ({ children }: { children: ReactNode }) => (
  <Provider connectors={connectors}>
    {children}
  </Provider>
)

export default App
