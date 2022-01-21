import { useState } from "react";
import GUN from "gun";
import "gun/sea";
import "gun/lib/open";
import "gun/lib/load";
import "gun/lib/then";
const hyperverseUser =
  "q_L0TOz1LXLvdFF_K7OemqkOzI6DFLnpj_7OvKiOtG0.fF83VNl5EjVr7uXGJIrAgt6tSjBTWA2CaOICQCnlyD8";
const useStorage = (url) => {
  if (url === undefined) {
    url = "https://hyperverse.dev/gun";
  }
  const [gun] = useState(new GUN(url));
  // const [gun, setGun] = useState(null);
  // useEffect(() => {
  //   setGun(new GUN(url));
  //  }, [url]);

  const getModules = async () => {
    // @ts-ignore
    const result = await gun.user(hyperverseUser).get("modules").load().then();
    return result;
  };

  return {
    gun,
    ready: !!gun,
    getModules,
  };
};
export default useStorage;
