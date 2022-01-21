import { useContext } from "react";
import Algorand from "./Provider";
function useAlgorand() {
  return useContext(Algorand.Context);
}
export default useAlgorand;
