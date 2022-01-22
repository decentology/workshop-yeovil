// @strictBindCallApply: true

import React from "react";

// import {} from '@hyperverse/hyperverse-algorand';
import { useAlgorand } from "@decentology/hyperverse-algorand";
import { useEnvironment } from "./environment";

import * as actions from "./actions";
import * as bundle from "./bundle";

type AlgorandConterContext = {
  appID: number;
  add: typeof actions.add;
  deduct: typeof actions.deduct;
  fetchCount: typeof actions.fetchCount;
  deploy: typeof bundle.deploy;
} | null;

const Context = React.createContext<AlgorandConterContext>(null);
Context.displayName = "AlgorandCounterContext";

function Provider(props) {
  const environment = useEnvironment();
  const algorand = useAlgorand();

  const boundActions = {} as typeof actions;
  for (const actionName in actions) {
    boundActions[actionName] = actions[actionName].bind(null, {
      environment,
      algorand,
      account: algorand.state.account,
    });
  }

  const boundBundle = {} as typeof bundle;
  for (const actionName in bundle) {
    boundBundle[actionName] = bundle[actionName].bind(null, {
      environment,
      algorand,
      account: algorand.state.account,
    });
  }

  return (
    <Context.Provider
      value={{
        appID: environment.appID,
        ...boundBundle,
        ...boundActions,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, Provider };
