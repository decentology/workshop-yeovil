import React from "react";
import { BlockchainList } from "./constants/blockchains";

const Context = React.createContext(null);

const Provider = (props) => {
  const [hyperverse, setHyperverse] = React.useState(null);

  React.useEffect(() => {
    props.hyperverse.then((hyperverse) => setHyperverse(hyperverse));
  }, [props.hyperverse]);

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
            {
              blockchain: hyperverse.blockchain.name,
              network: hyperverse.network,
              tenantId: module.tenantId,
              value: {
                blockchain: hyperverse.blockchain.name,
                network: hyperverse.network,
                tenantId: module.tenantId,
              },
            },
            children
          );
        }
        return children;
      }

      children = React.createElement(
        hyperverse.blockchain.Provider,
        {
          blockchain: hyperverse.blockchain.name,
          network: hyperverse.network,
          tenantId: module.tenantId,
          value: {
            blockchain: hyperverse.blockchain.name,
            network: hyperverse.network,
            tenantId: module.tenantId,
          },
        },
        renderModuleContexts(children)
      );
      // console.log(children);
      let blockchain = hyperverse.blockchain.context;
      return <Context.Provider value={hyperverse}>{children}</Context.Provider>;
    }
  } else {
    return null;
  }
};

export { Context, Provider };
