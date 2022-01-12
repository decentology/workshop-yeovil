import '../styles/globals.css'
import type { AppProps } from 'next/app'
//@ts-ignore
import * as Hyperverse from "@hyperverse/hyperverse"
//@ts-ignore
import { networks } from "@hyperverse/hyperverse";
//@ts-ignore
import Ethereum from "@hyperverse/hyperverse-ethereum"
//@ts-ignore
import * as Tribes from "@hyperverse/hyperverse-ethereum-tribes"

const hyperverse = Hyperverse.initialize({
  blockchain: Ethereum,
  network: networks.TestNet,
  modules: [{ bundle: Tribes }],
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Hyperverse.Provider value={hyperverse}>
      <Component {...pageProps} />
    </Hyperverse.Provider>
  )
}

export default MyApp
