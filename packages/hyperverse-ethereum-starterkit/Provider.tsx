import React, { FC } from "react";

type HookContext = {};

const Context = React.createContext<HookContext>(null);

const Provider: FC<any> = (props: any) => {
  return <Context.Provider value={{}}></Context.Provider>;
};

export { Context, Provider };
