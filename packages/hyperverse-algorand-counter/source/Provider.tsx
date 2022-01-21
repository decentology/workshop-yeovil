import React from "react";

// import {} from '@hyperverse/hyperverse-algorand';
import { useAlgorand } from "@decentology/hyperverse-algorand";
import { useEnvironment } from "./environment";

import * as actions from "./actions";
import * as bundle from "./bundle";

const Context = React.createContext({});

function Provider(props) {
  const environment = useEnvironment();
  const algorand = useAlgorand();

  const boundActions = {};
  for (const actionName in actions) {
    boundActions[actionName] = actions[actionName].bind(null, {
      environment,
      algorand,
      account: algorand.state.account,
    });
  }

  const boundBundle = {};
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
        bundle: {
          ...boundBundle,
        },
        ...boundActions,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, Provider };
