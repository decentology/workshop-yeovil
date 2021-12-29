import { Button } from "ui";
import * as Hyperverse from "@hyperverse/hyperverse";
import { networks } from "@hyperverse/hyperverse";
import Algorand from "@hyperverse/hyperverse-algorand";
import {useCounter } from '@hyperverse/hyperverse-algorand-counter'
import useAlgorand from "@hyperverse/hyperverse-algorand/useAlgorand";

Algorand.initialize(null).then(x => x.extra)

const hyperverse = Hyperverse.initialize({
  blockchain: Algorand,
  network: networks.TestNet,
  modules: [
  ]
});


export default function Web() {
  const { state, dispatch } = useCounter();
  const { client } = useAlgorand();

  return (
    <Hyperverse.Provider hyperverse={hyperverse}>
      <div>
        <h1>Web</h1>
        <Button />
      </div>
    </Hyperverse.Provider>
  );
}
