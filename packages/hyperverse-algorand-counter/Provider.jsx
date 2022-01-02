import React from "react";
import useAlgorand from "../hyperverse-algorand/useAlgorand";

const Context = React.createContext({});
Context.displayName = "AlgorandCounterContext";

const Provider = ({ children, ...props }) => {
  const algorand = useAlgorand();
  return (
    <Context.Provider value={{ doCounter: null }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
