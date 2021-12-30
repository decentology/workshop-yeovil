import React from "react";

const Context = React.createContext(null);

const Provider = (props) => {
  return <Context.Provider value={{}}></Context.Provider>;
};

export { Context, Provider };
