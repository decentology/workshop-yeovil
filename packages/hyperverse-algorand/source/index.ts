import algosdk from "algosdk";

import * as Hyperverse from "@decentology/hyperverse";
import { Provider } from "./context/Algorand";
import { makeHyperverseBlockchain } from "@decentology/hyperverse";

const AlgorandBlockchain = makeHyperverseBlockchain({
  name: Hyperverse.blockchains.Algorand,
  Provider: Provider,
  initialize: async (options) => {
    return { client: "testing", explorer: "" };
  },
});

export { Address, Signature, Transactions } from "./components";
export { default as useAlgorand } from "./useAlgorand";

export default AlgorandBlockchain;
