import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  WalletConnectConnector,
  defaultChains,
  InjectedConnector,
  Provider,
  //@ts-ignore
} from '@hyperverse/hyperverse-ethereum-tribes'

const infuraId = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!

// Chains for connectors to support
const chains = defaultChains
type Config = { chainId?: number }

const connectors = ({ chainId }: Config) => {
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider connectors={connectors}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
