import { useEffect } from "react";
import useStorage from "@hyperverse/hyperverse-db";
export default function Inner() {
  const storage = useStorage("http://localhost:3005/gun");
  useEffect(() => {
    if (storage.ready) {
      storage.getModules().then((modules) => {
        console.log(modules);
      });
    }
  }, [storage?.ready]);

  return <div>Hello</div>;
}
