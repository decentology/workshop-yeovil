import React from "react";
import * as Counter from "@hyperverse/hyperverse-algorand-counter";
import useAlgorand from "@hyperverse/hyperverse-algorand/useAlgorand";

const AlgoTest = () => {
  const counter = Counter.useCounter();
  const algo = useAlgorand();
  return <div>Algo Test {counter.doCounter}</div>;
};

export default AlgoTest;
