import React, {
  useState,
  createContext,
  ReactNode,
  useEffect,
  useCallback,
} from 'react'

export const Context = createContext({ account: null, connectWallet: () => {}, chainId: null, logout: () => {} })
Context.displayName = 'EthereumProvider'
const Provider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [chainId, setChainId] = useState(null)

  const connectWallet = useCallback(async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        alert('Connect Your Metamask!')
        return
      }

      setChainId(ethereum.networkVersion)

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      console.log('Connected', accounts[0])
      setAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }, [])

  // Accounts changed
  useEffect(() => {
    window.ethereum.on('accountsChanged', (a) => setAccount(a[0]))

    return () => {
      window.ethereum.removeListener('accountsChanged', (a) => setAccount(a[0]))
    }
  }, [])

  // Chains changed
  useEffect(() => {
    window.ethereum.on('networkChanged', (a) => setChainId(a))

    return () => {
      window.ethereum.removeListener('networkChanged', (a) => setChainId(a))
    }
  }, [])

  const logout = useCallback(() => {
    setAccount(null)
    setChainId(null)
  }, [])

  return (
    <Context.Provider
      value={{ account, connectWallet, chainId, logout }}
    >
      {children}
    </Context.Provider>
  )
}

export default { Context, Provider }
