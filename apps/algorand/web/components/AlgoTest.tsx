import React from "react";
import * as Counter from "@decentology/hyperverse-algorand-counter";
import Algorand from "@decentology/hyperverse-algorand";

const AlgoTest = () => {
  const counter = Counter.useCounter();
  const algo = Algorand.useAlgorand();
  return <div>Algo Test</div>;
};

export default AlgoTest;
