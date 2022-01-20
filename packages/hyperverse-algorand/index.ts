import useAlgorand from "./useAlgorand";
import Algorand from "./Provider";
import { Algodv2, Indexer } from "algosdk";
import {
  blockchains,
  makeHyperverseBlockchain,
  networks,
} from "@hyperverse/hyperverse";
export type { AlgorandContext } from "./Provider";

export type AlgorandFeatures = {
  indexer: Indexer | null;
};

const AlgorandBlockchain = makeHyperverseBlockchain({
  name: blockchains.Algorand,
  context: useAlgorand,
  Provider: Algorand.Provider,
  initialize: async (options) => {
    return null;
  },
});

export default AlgorandBlockchain;
