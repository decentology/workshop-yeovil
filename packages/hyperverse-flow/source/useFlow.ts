import { useContext } from "react";

import Context from "./context";

function useFlow(options: any = null) {
  const context = useContext(Context);
  return context;
}

export default useFlow;
