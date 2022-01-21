import { createContext, FC } from "react";
import useEthereum from "@hyperverse/hyperverse-ethereum/useEthereum";
import { QueryClientProvider, QueryClient } from "react-query";
import ABI from "./utils/Tribes.json";
const client = new QueryClient();

const Context = createContext({});
Context.displayName = "EthereumTribesContext";

export const ContractABI = ABI.abi;
export const CONTRACT_ADDRESS = "0xB58253d0F33ac34312949d450f1ec82FD87d92Ce";
export const TENANT_ADDRESS = "0xD847C7408c48b6b6720CCa75eB30a93acbF5163D";

Context.displayName = "EthereumTribesContext";

const Provider: FC<any> = ({ children }) => {
  const ethereum = useEthereum();
  return (
    <QueryClientProvider client={client}>
      <Context.Provider value={{}}>{children}</Context.Provider>
    </QueryClientProvider>
  );
};

export { Context, Provider };
