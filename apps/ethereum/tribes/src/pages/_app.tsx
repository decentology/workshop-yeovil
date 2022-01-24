//contract code : 0x410E22b393B3A90953c0677F2282E331580ed45b

import "../styles/globals.css";
import type { AppProps } from "next/app";
import * as Hyperverse from "@decentology/hyperverse";
import { networks } from "@decentology/hyperverse";
import Ethereum from "@decentology/hyperverse-ethereum";
import * as Tribes from "@decentology/hyperverse-ethereum-tribes";

//@ts-ignore
import InnerComponent from "../components/InnerComponent";

function MyApp({ Component, pageProps }: AppProps) {
  const hyperverse = Hyperverse.initialize({
    blockchain: Ethereum,
    network: networks.TestNet,
    modules: [{ bundle: Tribes, tenantId: "tribes" }],
  });
  return (
    <Hyperverse.Provider hyperverse={hyperverse}>
      <InnerComponent>
        <Component {...pageProps} />
      </InnerComponent>
    </Hyperverse.Provider>
  );
}

export default MyApp;
