import { useEffect } from "react";

import * as Counter from "@hyperverse/hyperverse-algorand-counter";
import useAlgorand from "@hyperverse/hyperverse-algorand/useAlgorand";
import useStorage from "@hyperverse/hyperverse-db";
export default function Inner() {
  const storage = useStorage("http://localhost:3005/gun");
  const counter = Counter.useCounter();
  const algo = useAlgorand();
  useEffect(() => {
    if (storage.ready) {
      storage.getModules().then((modules) => {
        console.log(modules);
      });
    }
  }, [storage?.ready]);

  return <div>Hello</div>;
}
