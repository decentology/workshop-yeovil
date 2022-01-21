export * from "wagmi";
import useEthereum from "./useEthereum";
import Ethereum from "./Provider";
import {
  blockchains,
  makeHyperverseBlockchain,
  networks,
} from "@decentology/hyperverse";

const EthereumBlockchain = makeHyperverseBlockchain({
  name: blockchains.Ethereum,
  context: Ethereum.Context,
  Provider: Ethereum.Provider,
  initialize: async (options) => {
    return { client: "testing", explorer: "" };
  },
});

export default EthereumBlockchain;
