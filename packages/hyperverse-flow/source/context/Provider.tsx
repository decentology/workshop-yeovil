import React, { useReducer, useEffect, createContext } from "react";
import * as fcl from "@onflow/fcl";
import authenticate from "./authenticate";
import unauthenticate from "./unauthenticate";
import sendFlow from "./sendFlow";
import fetchBalance from "./fetchBalance";

type State = {
  user: {};
};

type Action =
  | { type: "setUser"; payload: fcl.User }
  | { type: "setBalance"; payload: number };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setUser": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "setBalance": {
      return {
        ...state,
        balance: action.payload,
      };
    }
    default:
      return state;
  }
}

type FlowContext = {
  state?: {};
  isInitialized?: boolean;
  authenticate?: typeof authenticate;
  unauthenticate?: typeof unauthenticate;
  fetchBalance?: typeof fetchBalance;
  updateBalance?: () => Promise<void>;
  sendFlow?: typeof sendFlow;
};

const Context = createContext<FlowContext>({});
Context.displayName = "FlowContext";

function Provider(props) {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
  });

  const isInitialized = state.user !== null;

  const updateBalance = async () => {
    const nextBalance = await fetchBalance(state.user.addr);
    dispatch({ type: "setBalance", payload: nextBalance });
  };

  useEffect(() => {
    fcl.currentUser().subscribe((nextUser) => {
      dispatch({ type: "setUser", payload: nextUser });
    });
  }, []);

  return (
    <Context.Provider
      value={{
        state,
        isInitialized,
        authenticate,
        unauthenticate,
        fetchBalance,
        updateBalance,
        sendFlow,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context as default, Provider };
