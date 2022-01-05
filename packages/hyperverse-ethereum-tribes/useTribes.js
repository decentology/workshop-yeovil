import { useContext, useState, useEffect } from 'react'
import { useQuery, useMutation } from 'react-query'
import { useEthereum } from '@hyperverse/hyperverse-ethereum'
import { Contract, ethers } from 'ethers'
import ABI from './utils/Tribes.json'
import { context, TENANT_ADDRESS } from './context'
export const ContractABI = ABI.abi

export const useTribes = () => {
  const [tribesContract, setTribesContract] = useState(null)
  const { account } = useEthereum()
  const { contractAddress } = useContext(context)

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, ContractABI, signer)
    setTribesContract(contract)
  }, [setTribesContract])

  const checkInstance = async (account) => {
    try {
      const instance = await tribesContract.instance(account)
      return instance
    } catch (err) {
      return false
    }
  }
  const createInstance = async () => {
    try {
      const createTxn = await tribesContract.createInstance()
      return createTxn.wait()
    } catch (err) {
      throw err
    }
  }
  const addTribe = async (metadata) => {
    try {
      const addTxn = await tribesContract.addNewTribe(metadata)
      return addTxn.wait()
    } catch (err) {
      throw err
    }
  }
  const getTribeId = async (account) => {
    try {
      const id = await tribesContract.getUserTribe(TENANT_ADDRESS, account)
      return id.toNumber()
    } catch (err) {
      throw err
    }
  }
  const getTribe = async (id) => {
    try {
      if (!tribesContract) {
        return
      }
      const userTribeTxn = await tribesContract.getTribeData(TENANT_ADDRESS, id)
      return userTribeTxn
    } catch (err) {
      throw err
    }
  }
  const leaveTribe = async () => {
    try {
      const leaveTxn = await tribesContract.leaveTribe(TENANT_ADDRESS)
      await leaveTxn.wait()
      return leaveTxn.hash
    } catch (err) {
      throw err
    }
  }
  const getAllTribes = async () => {
    try {
      if (!tribesContract) {
        return
      }
      const tribesData = await tribesContract.totalTribes(TENANT_ADDRESS)
      const tribes = []
      for (let i = 1; i <= tribesData.toNumber(); ++i) {
        // eslint-disable-next-line no-await-in-loop
        const txn = await tribesContract.getTribeData(TENANT_ADDRESS, i)
        tribes.push({
          id: i,
          txn: txn,
        })
      }
      return tribes
    } catch (err) {
      console.log('err', tribesContract, err)
      throw err
    }
  }
  const joinTribe = async (id) => {
    try {
      const joinTxn = await tribesContract.joinTribe(TENANT_ADDRESS, id)
      return joinTxn.wait()
    } catch (err) {
      throw err
    }
  }

  return {
    context,
    CheckInstance: () =>
      useQuery(['checkInstance', account], () => checkInstance(account), {
        enabled: !!account,
      }),
    NewInstance: (options) => useMutation(createInstance, options),
    AddTribe: (options) =>
      useMutation((metadata) => addTribe(metadata), options),
    Tribes: () =>
      useQuery(['tribes', tribesContract?.address], () => getAllTribes(), {
        enabled: !!tribesContract?.address,
      }),
    Join: (options) => useMutation((id) => joinTribe(id), options),
    Leave: (options) => useMutation(() => leaveTribe(), options),
    TribeId: () =>
      useQuery(['getTribeId', account, tribesContract?.address], () => getTribeId(account), {
        enabled: !!account,
        enabled: !!tribesContract?.address,
      }),
    Tribe: () => {
      const { data: tribeId } = useQuery(
        ['getTribeId', account],
        () => getTribeId(account),
        { enabled: !!account },
      )
      return useQuery(['getTribeData', tribeId], () => getTribe(tribeId), {
        enabled: !!tribeId,
      })
    },
  }
}

export default useTribes
