import React, { FC, Provider, Context } from "react";
import { BlockchainList } from "./constants/blockchains";
import { Hyperverse } from './types';

const Context = React.createContext<Hyperverse>(null);

type ProviderProps = {
  hyperverse: Promise<Hyperverse>;
};

const Provider: FC<ProviderProps> = (props) => {
  const [hyperverse, setHyperverse] = React.useState<Hyperverse>(null);

  React.useEffect(() => {
    props.hyperverse.then((hyperverse) => setHyperverse(hyperverse));
  }, [props.hyperverse]);

  if (hyperverse) {
    const blockchain = BlockchainList.find(
      (chain) => chain == hyperverse.blockchain.name
    );
    if (blockchain) {
      let children = props.children;
      for (const module of hyperverse.modules) {
        children = React.createElement(
          module.bundle.Provider,
          {
            blockchain: hyperverse.blockchain.name,
            network: hyperverse.network,
            tenantId: module.tenantId,
          },
          children
        );
      }
      return <Context.Provider value={hyperverse}>{children}</Context.Provider>;
    }
  } else {
    return null;
  }
};

export { Context, Provider };
