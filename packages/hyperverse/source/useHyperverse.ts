import React from "react";

import { Context } from "./Provider";

function useHyperverse() {
  const hyperverse = React.useContext(Context);
  return hyperverse;
}

export default useHyperverse;
