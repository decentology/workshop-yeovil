import React from "react";
import useAlgorand from "../hyperverse-algorand/useAlgorand";

const Context = React.createContext({});

const Provider = ({ children, ...props }) => {
  const algorand = useAlgorand();
  console.log("algorand", algorand);
  return (
    <Context.Provider value={{ doCounter: null }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
