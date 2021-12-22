import useAlgorand from "./useAlgorand";
import Algorand from "./Algorand";
import { Algodv2, Indexer } from "algosdk";
import {
  blockchains,
  makeHyperverseBlockchain,
  networks,
} from "@hyperverse/hyperverse";
export type { AlgorandContext } from "./Algorand";

export type AlgorandFeatures = {
  indexer: Indexer | null;
};

const AlgorandBlockchain = makeHyperverseBlockchain({
  name: blockchains.Algorand,
  context: useAlgorand,
  provider: Algorand.Provider,
  initialize: async (options) => {
    let client: Algodv2 | null;
    let explorer: string | null;
    let indexer: Indexer | null;
    if (options.network == networks.MainNet) {
      client = new Algodv2("", "https://algoexplorerapi.io/", "");
      indexer = new Indexer("", "https://algoexplorerapi.io/idx2", "");
      explorer = "https://algoexplorer.io";
    } else if (options.network == networks.TestNet) {
      client = new Algodv2("", "https://testnet.algoexplorerapi.io", "");
      indexer = new Indexer("", "https://testnet.algoexplorerapi.io/idx2", "");
      explorer = "https://testnet.algoexplorer.io";
    }
    const status = await client.status().do();
    if (status.getLastRound() > 0) {
      return {
        client,
        explorer,
        extra: {
          indexer,
        },
      };
    }
    throw new Error("Algorand client not initialized");
  },
});

export default AlgorandBlockchain;
