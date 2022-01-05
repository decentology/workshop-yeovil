import Ethereum from './Provider'
import { blockchains, networks } from '@hyperverse/hyperverse'
const EthereumBlockchain = {
  name: blockchains.Ethereum,
  context: Ethereum.Context,
  Provider: Ethereum.Provider,
  initialize: async (options) => {
    return null
  },
}
export const name = blockchains.Ethereum
export const context = Ethereum.Context
export default EthereumBlockchain
export { default as useEthereum } from './useEthereum'
