import React, { FC } from "react";
import Blockchain, { BlockchainList } from "./constants/blockchains";
import Network from "./constants/networks";

const Context = React.createContext(null);

type Hyperverse = {
  blockchain: Blockchain;
  network: Network;
  modules: HyperverseModule[];
};

type HyperverseModule = {
  bundle: {
    Provider: FC<HyperverseModuleInstance>;
  };
  tenantId: string;
  network: Network;
  blockchain: Blockchain;
};

type HyperverseModuleInstance = {
  tenantId: string;
  network: Network;
  blockchain: Blockchain;
};

type ProviderProps = {
  hyperverse: Promise<Hyperverse>;
}

const Provider: FC<ProviderProps> = (props) => {

  const [hyperverse, setHyperverse] = React.useState<Hyperverse>(null);

  React.useEffect(() => {
    props.hyperverse.then((hyperverse) => setHyperverse(hyperverse));
  }, [props.hyperverse]);

  if (hyperverse) {
    const blockchain = BlockchainList.find(
      (chain) => chain == hyperverse.blockchain
    );
    if (blockchain) {
      let children = props.children;
      for (const module of hyperverse.modules) {
        children = React.createElement(
          module.bundle.Provider,
          {
            blockchain: hyperverse.blockchain,
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
}

export { Context, Provider };
