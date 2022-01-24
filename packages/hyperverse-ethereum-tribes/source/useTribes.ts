import { useState, useEffect, useCallback } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "react-query";
import { ethers } from "ethers";
import { useAccount } from "@decentology/hyperverse-ethereum";
import { ContractABI, TENANT_ADDRESS, CONTRACT_ADDRESS } from "./Provider";
import { useEvent } from "react-use";

type Transaction = {
  wait: () => void;
};
type ContractState = {
  createInstance: () => Transaction;
  instance: (account: string) => void;
  addNewTribe: (metadata: any) => Transaction;
  getUserTribe: (tenant: string, account: string) => any;
  getTribeData: (tenant: string, id: number) => any;
  leaveTribe: (tenant: string) => any;
  totalTribes: (tenant: string) => any;
  tenantCount: () => any;
  joinTribe: (tenant: string, tribeId: string) => Transaction;
  address: string;
} | null;
export const useTribes = () => {
  const [contract, setTribesContract] = useState<ContractState>(null);
  const queryClient = useQueryClient();
  const [{ data }] = useAccount();

  const setup = async () => {
    const signer = await data?.connector?.getSigner();
    const ctr = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, signer);
    // @ts-ignore
    setTribesContract(ctr);
  };

  useEffect(() => {
    if (!data?.connector) {
      return;
    }
    setup();
  }, [data?.connector]);

  const checkInstance = useCallback(
    async (account: any) => {
      try {
        if (!contract) {
          return;
        }
        const instance = await contract.instance(account);
        return instance;
      } catch (err) {
        return false;
      }
    },
    [contract]
  );

  const createInstance = useCallback(async () => {
    try {
      if (!contract) {
        return;
      }
      const createTxn = await contract.createInstance();
      return createTxn.wait();
    } catch (err) {
      throw err;
    }
  }, [contract]);

  const getTotalTenants = useCallback(async () => {
    try {
      if (!contract) {
        return;
      }
      const tenantCount = await contract.tenantCount();

      return tenantCount.toNumber();
    } catch (err) {
      throw err;
    }
  }, [contract]);

  const addTribe = useCallback(
    async (metadata) => {
      try {
        if (!contract) {
          return;
        }
        const addTxn = await contract.addNewTribe(metadata);
        return addTxn.wait();
      } catch (err) {
        throw err;
      }
    },
    [contract]
  );

  const getTribeId = useCallback(
    async (account) => {
      if (!contract) {
        return;
      }
      try {
        const id = await contract.getUserTribe(TENANT_ADDRESS, account);
        return id.toNumber();
      } catch (err) {
        throw err;
      }
    },
    [contract]
  );

  const getTribe = useCallback(
    async (id) => {
      try {
        if (!contract) {
          return;
        }
        const userTribeTxn = await contract.getTribeData(TENANT_ADDRESS, id);
        return userTribeTxn;
      } catch (err) {
        throw err;
      }
    },
    [contract]
  );

  const leaveTribe = useCallback(async () => {
    try {
      if (!contract) {
        return;
      }
      const leaveTxn = await contract.leaveTribe(TENANT_ADDRESS);
      await leaveTxn.wait();
      return leaveTxn.hash;
    } catch (err) {
      throw err;
    }
  }, [contract]);

  const getAllTribes = useCallback(async () => {
    try {
      if (!contract) {
        return;
      }
      const tribesData = await contract.totalTribes(TENANT_ADDRESS);
      const tribes = [];
      for (let i = 1; i <= tribesData.toNumber(); ++i) {
        // eslint-disable-next-line no-await-in-loop
        const txn = await contract.getTribeData(TENANT_ADDRESS, i);
        tribes.push({
          id: i,
          txn: txn,
        });
      }
      return tribes;
    } catch (err) {
      throw err;
    }
  }, [contract]);

  const joinTribe = useCallback(
    async (id) => {
      try {
        if (!contract) {
          return;
        }
        const joinTxn = await contract.joinTribe(TENANT_ADDRESS, id);
        return joinTxn.wait();
      } catch (err) {
        throw err;
      }
    },
    [contract]
  );

  const useTribeEvents = (eventName: string, callback: any) => {
    // @ts-ignore
    return useEvent(eventName, useCallback(callback, [contract]), contract);
  };

  return {
    contract,
    useTribeEvents,
    CheckInstance: () =>
      useQuery(
        ["checkInstance", data?.address, contract?.address],
        () => checkInstance(data?.address),
        {
          enabled: !!data?.address && !!contract?.address,
        }
      ),
    NewInstance: (
      options?: Omit<
        UseMutationOptions<unknown, unknown, void, unknown>,
        "mutationFn"
      >
    ) => useMutation(createInstance, options),
    TotalTenants: () =>
      useQuery(["totalTenants", contract?.address], () => getTotalTenants(), {
        enabled: !!contract?.address,
      }),
    AddTribe: (
      options?: Omit<
        UseMutationOptions<unknown, unknown, unknown, unknown>,
        "mutationFn"
      >
    ) => useMutation((metadata) => addTribe(metadata), options),
    Tribes: () =>
      useQuery(["tribes", contract?.address], () => getAllTribes(), {
        enabled: !!contract?.address,
      }),
    Join: (
      options?: Omit<
        UseMutationOptions<unknown, unknown, unknown, unknown>,
        "mutationFn"
      >
    ) => useMutation((id) => joinTribe(id), options),
    Leave: (
      options?: Omit<
        UseMutationOptions<unknown, unknown, void, unknown>,
        "mutationFn"
      >
    ) =>
      useMutation(() => leaveTribe(), {
        ...options,
        onSuccess: (...args) => {
          queryClient.clear();
          const fn = options?.onSuccess;
          if (fn) fn(...args);
        },
      }),
    TribeId: () =>
      useQuery(
        ["getTribeId", data?.address, contract?.address],
        () => getTribeId(data?.address),
        {
          enabled: !!data?.address && !!contract?.address,
          retry: false,
        }
      ),
    Tribe: () => {
      const { data: tribeId } = useQuery(
        ["getTribeId", data?.address, contract?.address],
        () => getTribeId(data?.address),
        { enabled: !!data?.address && !!contract?.address }
      );
      return useQuery(["getTribeData", tribeId], () => getTribe(tribeId), {
        enabled: !!tribeId,
      });
    },
  };
};

export default useTribes;
