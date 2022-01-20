import useAlgorand from "./useAlgorand";
import Algorand from "./Provider";
import { Algodv2, Indexer } from "algosdk";
import { blockchains, networks } from "@hyperverse/hyperverse";
const AlgorandBlockchain = {
  name: blockchains.Algorand,
  context: Algorand.Context,
  Provider: Algorand.Provider,
  initialize: async (options) => {
    let client;
    let explorer;
    let indexer;
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
    if (status["last-round"] > 0) {
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
};

export default AlgorandBlockchain;
