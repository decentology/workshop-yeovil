import React from "react";

import * as Counter from "@hyperverse/hyperverse-algorand-counter";
import useAlgorand from "@hyperverse/hyperverse-algorand/useAlgorand";
export default function Inner() {
	const counter = Counter.useCounter();
	const algo = useAlgorand();
  return <div>Hello</div>;
}
