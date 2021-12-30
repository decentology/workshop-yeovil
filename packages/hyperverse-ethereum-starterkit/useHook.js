import React from "react";

import { Context } from "./Provider";

function useHook() {
  const context = React.useContext(Context);
  return context;
}

export default useHook;
