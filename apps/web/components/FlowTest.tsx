import { FC } from "react";
import { useFlow } from "@decentology/hyperverse-flow";
const FlowTest: FC<any> = () => {
  const data = useFlow();
  return <div>Flow Test</div>;
};

export default FlowTest;
