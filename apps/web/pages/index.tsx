import { Button } from "ui";
// import * as Hyperverse from "@hyperverse/hyperverse";
// import { networks } from "@hyperverse/hyperverse";
import * as Hyperverse from "@decentology/hyperverse";
import * as Flow from "@decentology/hyperverse-flow";
// import Algorand from "@hyperverse/hyperverse-algorand";
import FlowTest from "../components/FlowTest";

export default function Web() {
  const hyperverse = Hyperverse.initialize({
    blockchain: Flow,
    network: Hyperverse.networks.TestNet,
    modules: [],
  });

  return (
    <Hyperverse.Provider hyperverse={hyperverse}>
      <div>
        <h1>Web</h1>
        <FlowTest />
        {/* <Inner /> */}
        <Button />
      </div>
    </Hyperverse.Provider>
  );
}
