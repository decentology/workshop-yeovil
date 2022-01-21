import "../styles/globals.css";
import type { AppProps } from "next/app";
import * as Hyperverse from "@hyperverse/hyperverse";
import { networks } from "@hyperverse/hyperverse";
import Ethereum from "@hyperverse/hyperverse-ethereum";
import Tribes from "@hyperverse/hyperverse-ethereum-tribes";

//@ts-ignore
import { useTribes } from "@hyperverse/hyperverse-ethereum-tribes";
import InnerComponent from "../components/InnerComponent";
const hyperverse = Hyperverse.initialize({
  blockchain: Ethereum,
  network: networks.TestNet,
  modules: [{ bundle: Tribes, tenantId: "tribes" }],
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
