import React, { useReducer } from "react";
import { useHyperverse } from "@hyperverse/hyperverse";
import reducer from "./reducer";

const Context = React.createContext({});

const Provider = (props) => {
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

  return (
    <Context.Provider value={{ client: 'test2', isConnected }}>{props.children}</Context.Provider>
  );
};

export default { Context, Provider };
