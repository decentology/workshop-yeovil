import React from "react";
import * as Counter from "@decentology/hyperverse-algorand-counter";
import { useAlgorand } from "@decentology/hyperverse-algorand";

const AlgoTest = () => {
  const counter = Counter.useCounter();
  const algo = useAlgorand();
  return <div>Algo Test</div>;
};

export default AlgoTest;
