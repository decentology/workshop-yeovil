import React, { createContext, FC, useState } from "react";

import { DeviceDetectProvider } from "./components";
import Network from "./constants/networks";
import { Hyperverse } from "./types";

const Context = createContext<Hyperverse>({
  blockchain: null,
  network: Network.TestNet,
  modules: [],
});
Context.displayName = "HyperverseContext";

type ProviderProps = {
  hyperverse: Promise<Hyperverse>;
};

const Provider: FC<ProviderProps> = (props) => {
  const [hyperverse, setHyperverse] = useState<Hyperverse | null>(null);

  React.useEffect(() => {
    props.hyperverse.then((hyperverse) => {
      setHyperverse(hyperverse);
    });
  }, [props.hyperverse]);

  if (hyperverse?.blockchain) {
    let children = props.children;

    for (const module of hyperverse.modules.reverse()) {
      children = React.createElement(module.bundle.Provider, null, children);
    }
    const blockchain = React.createElement(
      hyperverse.blockchain.Provider,
      null,
      children
    );

    return (
      <Context.Provider value={hyperverse}>
        <DeviceDetectProvider>{blockchain}</DeviceDetectProvider>
      </Context.Provider>
    );
  }
  return null;
};

export { Context, Provider };
