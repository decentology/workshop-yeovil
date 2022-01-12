import { createContext } from 'react'
import useEthereum from '../hyperverse-ethereum/useEthereum'
import { QueryClientProvider, QueryClient } from 'react-query'
import ABI from './utils/Tribes.json'
const client = new QueryClient()

const Context = createContext({})
Context.displayName = 'EthereumTribesContext'

export const ContractABI = ABI.abi
export const CONTRACT_ADDRESS = '0x0d3a67ea4c7AC49dB4AC0DefFe44Cf5905329383'
export const TENANT_ADDRESS = '0xD847C7408c48b6b6720CCa75eB30a93acbF5163D'

Context.displayName = 'EthereumTribesContext'

const Provider = ({ children }) => {
  const ethereum = useEthereum()
  return (
    <QueryClientProvider client={client}>
      <Context.Provider>{children}</Context.Provider>
    </QueryClientProvider>
  )
}

export { Context, Provider }
