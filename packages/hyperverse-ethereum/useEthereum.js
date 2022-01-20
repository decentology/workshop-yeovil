import { useContext } from "react";
import Ethereum from "./Provider";
function useEthereum() {
  return useContext(Ethereum.Context);
}
export default useEthereum;
