import { useContext } from "react";

import Context from "./context";

function useFlow(options) {
  console.log("Testing");
  const context = useContext(Context);
  return context;
}

export default useFlow;
