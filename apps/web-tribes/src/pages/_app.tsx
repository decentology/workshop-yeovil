import '../styles/globals.css'
import type { AppProps } from 'next/app'
//@ts-ignore
import { Provider } from '@hyperverse/hyperverse-ethereum-tribes'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
