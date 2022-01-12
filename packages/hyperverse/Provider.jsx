import React from "react";
import { BlockchainList } from "./constants/blockchains";

const Context = React.createContext({});
Context.displayName = "HyperverseContext";

const Provider = (props) => {
  /**
   * @typedef {{blockchain?: {name: string, Provider: any}, modules?: any}} Hyperverse
   * @typedef {function(Hyperverse): void} HyperverseSetter
   * @type {[Hyperverse, HyperverseSetter]} hyperverseState
   * @description Holds the Hyperverse state and the function to update it.
   */
  const [hyperverse, setHyperverse] = React.useState({});

  React.useEffect(() => {
    props.value.then((hyperverse) => setHyperverse(hyperverse));
  }, [props.value]);

  if (hyperverse?.blockchain) {
    const blockchainName = BlockchainList.find(
      (chain) => chain == hyperverse?.blockchain?.name
    );
    if (blockchainName) {
      let children = props.children;

      function renderModuleContexts(children) {
        for (const module of hyperverse.modules.reverse()) {
          if (!module.autoLoadContext) {
            children = React.createElement(
              module.bundle.Provider,
              null,
              children
            );
          }
        }
        return children;
      }

      children = React.createElement(
        // hyperverse.blockchain.context.Provider,
        hyperverse?.blockchain?.Provider,
        null,
        renderModuleContexts(children)
      );
      return (
        <Context.Provider value={{ ...hyperverse }}>
          {children}
        </Context.Provider>
      );
    }
  } else {
    return null;
  }
};

export { Context, Provider };
