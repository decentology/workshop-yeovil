export * from "wagmi";
import useEthereum from "./useEthereum";
import Ethereum from "./Provider";
import {
  blockchains,
  makeHyperverseBlockchain,
  networks,
} from "@hyperverse/hyperverse";

const EthereumBlockchain = makeHyperverseBlockchain({
  name: blockchains.Ethereum,
  context: useEthereum,
  Provider: Ethereum.Provider,
  initialize: async (options) => {
    return { client: "testing", explorer: "" };
  },
});

export default EthereumBlockchain;
