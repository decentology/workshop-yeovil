import { useContext } from "react";
import Algorand from "./Algorand";
function useAlgorand() {
  return useContext(Algorand.Context);
}
export default useAlgorand;
