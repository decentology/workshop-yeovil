import React, { VFC, FC } from "react";
import useAlgorand from "@hyperverse/hyperverse-algorand";
import {useEnvironment} from './environment.js';
import * as actions from './actions';
import * as bundle from './bundle';


const Context = React.createContext({});
Context.displayName = "AlgorandCounterContext";

function Provider(props) {
  const environment = useEnvironment();
  const algorand = useAlgorand();

  const boundActions = {};
  for (const actionName in actions) {
    boundActions[actionName] = actions[actionName].bind(
      null,
      {
        environment,
        algorand,
        account: algorand.state.account
      }
    );
  }

  const boundBundle = {};
  for (const actionName in bundle) {
    boundBundle[actionName] = bundle[actionName].bind(
      null,
      {
        environment,
        algorand,
        account: algorand.state.account
      }
    );
  }

  return (
    <Context.Provider
      value={{
        bundle: {
          ...boundBundle
        },
        ...boundActions
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export {
  Context,
  Provider
};