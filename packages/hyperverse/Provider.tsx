import React, { createContext, useState, FC } from "react";
import Blockchain, { BlockchainList } from "./constants/blockchains";
import Network from "./constants/networks";
import { Hyperverse } from "./types";

const Context = createContext<Hyperverse>({
  blockchain: null,
  network: Network.TestNet,
  modules: [],
});
Context.displayName = "HyperverseContext";

type ProviderProps = {
  hyperverse?: Promise<Hyperverse>;
  value?: Promise<Hyperverse>;
};

const Provider: FC<ProviderProps> = (props) => {
  const [hyperverse, setHyperverse] = useState<Hyperverse>({
    blockchain: null,
    modules: [],
    network: Network.TestNet,
  });

  React.useEffect(() => {
    props.value?.then((hyperverse) => setHyperverse(hyperverse));
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
        hyperverse?.blockchain?.Provider,
        null,
        renderModuleContexts(children)
      );
      return <Context.Provider value={hyperverse}>{children}</Context.Provider>;
    }
  }
  return null;
};

export { Context, Provider };
