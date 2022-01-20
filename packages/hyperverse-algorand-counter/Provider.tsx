import React, { VFC } from "react";
import useAlgorand from "@hyperverse/hyperverse-algorand/useAlgorand";

type AlgoCounterContext = {
  doCounter: number;
};
const Context = React.createContext<AlgoCounterContext>({
  doCounter: 0,
});
Context.displayName = "AlgorandCounterContext";

const Provider: VFC<any> = ({ children }) => {
  const algorand = useAlgorand();
  return (
    <Context.Provider value={{ doCounter: 1 }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
