import { createContext } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import Ethereum from '@hyperverse/hyperverse-ethereum'
import ABI from './utils/Tribes.json'

const client = new QueryClient()

export const ContractABI = ABI.abi
export const CONTRACT_ADDRESS = '0x0d3a67ea4c7AC49dB4AC0DefFe44Cf5905329383'
export const TENANT_ADDRESS = '0x9809ABAfe657533F4Fd409a4DDf442B093A8AEAe'
export const context = createContext({
  tenantAddress: TENANT_ADDRESS,
  contractAddress: CONTRACT_ADDRESS,
})
context.displayName = 'HyperverseEthereumTribesContext'

export const Provider = ({
  contractAddress = CONTRACT_ADDRESS,
  tenantAddress = TENANT_ADDRESS,
  children,
}) => (
  <Ethereum.Provider>
    <QueryClientProvider client={client}>
      <context.Provider
        value={{
          contractAddress,
          tenantAddress,
        }}
      >
        {children}
      </context.Provider>
    </QueryClientProvider>
  </Ethereum.Provider>
)
