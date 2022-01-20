import "../styles/globals.css";
import type { AppProps } from "next/app";
//@ts-ignore
import * as Hyperverse from "@hyperverse/hyperverse";
//@ts-ignore
import { networks } from "@hyperverse/hyperverse";
//@ts-ignore
import Ethereum from "@hyperverse/hyperverse-ethereum";
//@ts-ignore
import * as Tribes from "@hyperverse/hyperverse-ethereum-tribes";

//@ts-ignore
import { useTribes } from "@hyperverse/hyperverse-ethereum-tribes";
import InnerComponent from "../components/InnerComponent";
const hyperverse = Hyperverse.initialize({
  blockchain: Ethereum,
  network: networks.TestNet,
  modules: [{ bundle: Tribes }],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Hyperverse.Provider value={hyperverse}>
      <InnerComponent>
        <Component {...pageProps} />
      </InnerComponent>
    </Hyperverse.Provider>
  );
}

export default MyApp;
