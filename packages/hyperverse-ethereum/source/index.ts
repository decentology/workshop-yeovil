export * from "wagmi";
import Ethereum from "./Provider";
import {
  blockchains,
  makeHyperverseBlockchain,
  networks,
} from "@decentology/hyperverse";

const EthereumBlockchain = makeHyperverseBlockchain({
  name: blockchains.Ethereum,
  Provider: Ethereum.Provider,
  initialize: async (options) => {
    return { client: "testing", explorer: "" };
  },
});

export default EthereumBlockchain;
