import { Button } from "ui";
import * as Hyperverse from "@hyperverse/hyperverse";
import { networks } from "@hyperverse/hyperverse";
import Algorand from "@hyperverse/hyperverse-algorand";
import * as Counter from "@hyperverse/hyperverse-algorand-counter";
import useAlgorand from "@hyperverse/hyperverse-algorand/useAlgorand";
import Inner from "../components/inner";

const hyperverse = Hyperverse.initialize({
  blockchain: Algorand,
  network: networks.TestNet,
  modules: [{ bundle: Counter }],
});

export default function Web() {
  return (
    <Hyperverse.Provider hyperverse={hyperverse}>
      <div>
        <h1>Web</h1>
        <Inner />
        <Button />
      </div>
    </Hyperverse.Provider>
  );
}
