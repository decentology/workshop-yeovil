import React, { FC } from "react";
import useAlgorand from "../hyperverse-algorand/useAlgorand";

const Context = React.createContext(null);

const Provider: FC<any> = (props: any) => {
  const algorand = useAlgorand();
  const { client } = algorand;
  return <Context.Provider value={{}}></Context.Provider>;
};

export { Context, Provider };
