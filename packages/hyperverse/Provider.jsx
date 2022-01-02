import React from "react";
import { BlockchainList } from "./constants/blockchains";

const Context = React.createContext(null);
Context.displayName = "HyperverseContext";

const Provider = (props) => {
  const [hyperverse, setHyperverse] = React.useState(null);

  React.useEffect(() => {
    props.value.then((hyperverse) => setHyperverse(hyperverse));
  }, [props.value]);

  if (hyperverse) {
    const blockchainName = BlockchainList.find(
      (chain) => chain == hyperverse.blockchain.name
    );
    if (blockchainName) {
      let children = props.children;

      function renderModuleContexts(children) {
        for (const module of hyperverse.modules.reverse()) {
          children = React.createElement(
            module.bundle.Provider,
            null,
            children
          );
        }
        return children;
      }

      children = React.createElement(
        // hyperverse.blockchain.context.Provider,
        hyperverse.blockchain.Provider,
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
