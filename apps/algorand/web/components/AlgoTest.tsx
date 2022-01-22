import React from "react";
import { useCounter } from "@decentology/hyperverse-algorand-counter";
import { useAlgorand } from "@decentology/hyperverse-algorand";

const AlgoTest = () => {
  const counter = useCounter();
  const algo = useAlgorand();
  return <div>Algo Test {counter.appID}</div>;
};

export default AlgoTest;
