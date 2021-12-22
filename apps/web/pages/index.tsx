import { Button } from "ui";
import * as Hyperverse from "@hyperverse/hyperverse";
import { networks } from "@hyperverse/hyperverse";
import Algorand from "@hyperverse/hyperverse-algorand";

Algorand.initialize(null).then(x => x.extra)

const hyperverse = Hyperverse.initialize({
  blockchain: Algorand,
  network: networks.TestNet,
  modules: []
});


export default function Web() {
  return (
    <Hyperverse.Provider hyperverse={hyperverse}>
      <div>
        <h1>Web</h1>
        <Button />
      </div>
    </Hyperverse.Provider>
  );
}
