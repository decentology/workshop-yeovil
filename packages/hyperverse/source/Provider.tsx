import React, { FC } from "react";

import { DeviceDetectProvider } from "./components";
import { Hyperverse } from "./types";

const Context = React.createContext(null);

type ProviderProps = {
  hyperverse: Promise<Hyperverse>;
};

const Provider: FC<ProviderProps> = (props) => {
  const [hyperverse, setHyperverse] = React.useState(null);

  React.useEffect(() => {
    props.hyperverse.then((hyperverse) => {
      setHyperverse(hyperverse);
    });
  }, [props.hyperverse]);

  if (hyperverse) {
    let children = props.children;

    for (const module of hyperverse.modules.reverse()) {
      children = React.createElement(
        module.bundle.Provider,
        {
          blockchain: hyperverse.blockchain,
          network: hyperverse.network,
          tenantID: module.tenantID,
        },
        children
      );
    }

    const blockchain = React.createElement(
      hyperverse.blockchain.Provider,
      hyperverse.blockchain.props,
      children
    );

    return (
      <Context.Provider value={hyperverse}>
        <DeviceDetectProvider>{blockchain}</DeviceDetectProvider>
      </Context.Provider>
    );
  } else {
    return null;
  }
};

export { Context, Provider };
