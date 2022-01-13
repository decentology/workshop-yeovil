export * from 'wagmi'
import Ethereum from './Provider'
import { blockchains, networks } from '@hyperverse/hyperverse'

const EthereumBlockchain = {
  name: blockchains.Ethereum,
  context: Ethereum.Context,
  Provider: Ethereum.Provider,
  initialize: async (options) => {
    return { client: 'testing' }
  },
}

export default EthereumBlockchain
