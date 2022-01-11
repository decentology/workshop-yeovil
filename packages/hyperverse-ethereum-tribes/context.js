import { createContext } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import ABI from './utils/Tribes.json'
import { Provider as WagmiProvider } from 'wagmi'
const client = new QueryClient()

export const ContractABI = ABI.abi
export const CONTRACT_ADDRESS = '0x0d3a67ea4c7AC49dB4AC0DefFe44Cf5905329383'
export const TENANT_ADDRESS = '0xD847C7408c48b6b6720CCa75eB30a93acbF5163D'
export const context = createContext({
  tenantAddress: TENANT_ADDRESS,
  contractAddress: CONTRACT_ADDRESS,
})
context.displayName = 'HyperverseEthereumTribesContext'

export const Provider = ({
  tenantAddress = TENANT_ADDRESS,
  children,
  ...props,
}) => (
  <WagmiProvider {...props}>
    <QueryClientProvider client={client}>
      <context.Provider
        value={{
          contractAddress: CONTRACT_ADDRESS,
          tenantAddress,
        }}
      >
        {children}
      </context.Provider>
    </QueryClientProvider>
  </WagmiProvider>
)