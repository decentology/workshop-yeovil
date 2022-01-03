import React, { useReducer } from "react";
import { useHyperverse, networks } from "@hyperverse/hyperverse";
import reducer from "./reducer";
import { useAsync } from "react-async-hook";
import { Algodv2, Indexer } from "algosdk";
const Context = React.createContext({});
Context.displayName = "AlgorandContext";

const Initialize = async (network) => {
  if (network != null) {
    let client, explorer, indexer;
    if (network == networks.MainNet) {
      client = new Algodv2("", "https://algoexplorerapi.io/", "");
      indexer = new Indexer("", "https://algoexplorerapi.io/idx2", "");
      explorer = "https://algoexplorer.io";
    } else if (network == networks.TestNet) {
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
    return null;
  }
};

const Provider = ({ children }) => {
  const { network } = useHyperverse();
  const { result } = useAsync(Initialize, [network]);
  const [state, dispatch] = useReducer(reducer, {
    connector: null,
    account: null,
    isInitialized: false,
    isWaiting: false,
    pendingTransactions: [
      // 'U2XBAFIRE4DQJP6VUUFZ7XLY664HMCBKQJ4MKSQ3D2RW73JGF5LA',
    ],
    completedTransactions: [
      // {
      //   ID: 'U2XBAFIRE4DQJP6VUUFZ7XLY664HMCBKQJ4MKSQ3D2RW73JGF5LA',
      //   block: '17528707'
      // }
    ],
    signatureRequests: [],
  });
  const isConnected = state.account !== null;

  return (
    <React.Fragment>
      <Context.Provider
        value={{
          client: result?.client,
          explorer: result?.explorer,
          extra: result?.extra,
          isConnected,
        }}
      >
        {children}
      </Context.Provider>
    </React.Fragment>
  );
};

export default { Context, Provider };
