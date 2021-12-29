import React, { FC, useState, useReducer } from "react";
import { useHyperverse } from "@hyperverse/hyperverse";
import reducer from "./reducer";
import { Algodv2 } from "algosdk";

export type AlgorandContext = {
  client?: Algodv2;
	isConnected?: boolean;
	taco: boolean;
};

type ProviderProps = {};

const Context = React.createContext<AlgorandContext>({});

const Provider: FC<ProviderProps> = (props) => {
  const hyperverse = useHyperverse();
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
  const {} = hyperverse.blockchain;

  return (
    <Context.Provider value={{ client: null, isConnected }}></Context.Provider>
  );
};

export default { Context, Provider };
