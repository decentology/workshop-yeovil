import React, { useReducer, useEffect, useMemo, useCallback } from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import algosdk, { Algodv2, Indexer } from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { useAsync } from "react-async-hook";
import { Signature } from "../components";
import { Initialize } from "./initialize";
import reducer, { State } from "./reducer";
import { useHyperverse } from "@decentology/hyperverse";

type AlgorandContext = {
  state: State;
  isConnected: boolean;
  hasPendingTransactions: boolean;
  hasSignatureRequests: boolean;
  hasTransactions: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  transferAlgo: (
    receipient: string,
    amount: number,
    note: string
  ) => Promise<void>;
  fetchAccount: () => Promise<void>;
  waitForTransaction: (transactionId: string) => Promise<void>;
  requestSignature: (transaction: any) => void;
  createFungibleToken: () => Promise<void>;
  optIn: () => Promise<void>;
  sendAsset: (
    recipient: string,
    assetIndex: number,
    amount: number
  ) => Promise<void>;
  client: Algodv2;
  indexer: Indexer;
  explorer: string;
  actions: {
    compileProgram: (program: string) => Promise<Uint8Array>;
  };
} | null;

const Context = React.createContext<AlgorandContext>(null);
Context.displayName = "AlgorandContext";

const constants = {
  walletConnectOptions: {
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: QRCodeModal,
  },
  transactionTimeout: 10, // rounds
};

function Provider(props) {
  const { network } = useHyperverse();
  const {
    result: { client, explorer, extra: { indexer } = {} } = {},
    status,
    error,
    loading,
  } = useAsync(Initialize, [network], {
    initialState: () => {
      return {
        error: null,
        loading: true,
        status: null,
        result: {
          client: null,
          explorer: null,
          extra: { indexer: null },
        },
      };
    },
  });

  const [state, dispatch] = useReducer(reducer, {
    connector: null,
    account: null,
    isInitialized: false,
    isWaiting: false,
    pendingTransactions: [
      // 'U2XBAFIRE4DQJP6VUUFZ7XLY664HMCBKQJ4MKSQ3D2RW73JGF5LA',
    ],
    completedTransactions: [
      // {
      //   ID: 'U2XBAFIRE4DQJP6VUUFZ7XLY664HMCBKQJ4MKSQ3D2RW73JGF5LA',
      //   block: '17528707'
      // }
    ],
    signatureRequests: [],
  });

  const isConnected = state.account !== null;

  const compileProgram = async (sourceCode) => {
    const compiled = await client.compile(sourceCode).do();
    const buffer = Uint8Array.from(Buffer.from(compiled.result, "base64"));
    return buffer;
  };

  const waitForTransaction = async (transactionID) => {
    dispatch({
      type: "addPendingTransaction",
      payload: transactionID,
    });

    const status = await client.status().do();
    let currentRound = status["last-round"];
    const timeoutRound = currentRound + constants.transactionTimeout;

    while (currentRound < timeoutRound) {
      const information = await client
        .pendingTransactionInformation(transactionID)
        .do();
      const poolError = information["pool-error"];
      if (poolError) {
        // There was an error and this transaction is now dead.
        throw poolError;
      }
      const confirmedRound = information["confirmed-round"];
      if (confirmedRound) {
        // This transaction has been included in the blockchain.
        dispatch({
          type: "removePendingTransaction",
          payload: {
            ID: transactionID,
            block: confirmedRound,
          },
        });
        return confirmedRound;
      }

      const nextRound = currentRound + 1;
      await client.statusAfterBlock(nextRound).do();
      currentRound = nextRound;
    }
  };

  const onSignatureSuccess = async (signedTransaction) => {
    dispatch({ type: "removeSignatureRequests" });

    // Once we have a signed transaction, submit it to the network.
    const decodedTransaction = signedTransaction.map((element) => {
      return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
    });
    try {
      // Person signed in their wallet.
      const response = await client.sendRawTransaction(decodedTransaction).do();
      waitForTransaction(response.txId);
    } catch (error) {
      // TODO: Find out when this can happen.
      console.error(error);
    }
  };
  const onSignatureFailure = (result) => {
    // Person declined to sign in their wallet.
    // TODO: Implement what happens when user rejects to sign in the Algorand Wallet.
    dispatch({ type: "removeSignatureRequests" });
  };

  const requestSignature = (transaction: any) => {
    const encodedTransaction = Buffer.from(
      algosdk.encodeUnsignedTransaction(transaction)
    ).toString("base64");
    const request = formatJsonRpcRequest("algo_signTxn", [
      [
        {
          txn: encodedTransaction,
          message: "Just testing.",
        },
      ],
    ]);
    const response = state.connector
      .sendCustomRequest(request)
      .then(onSignatureSuccess)
      .catch(onSignatureFailure);

    dispatch({
      type: "addSignatureRequest",
      payload: response,
    });
  };

  const onCancelSignature = () => {
    dispatch({ type: "removeSignatureRequests" });
  };

  const fetchAccount = useCallback(async () => {
    const account = await indexer.lookupAccountByID(state.account).do();
    return account;
  }, [state.account]);

  const transferAlgo = useCallback(
    async (recipient, amount, note) => {
      const suggestedParams = await client.getTransactionParams().do();
      const transaction =
        await algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from: state.account,
          to: recipient,
          amount,
          note: note ? Uint8Array.from(Buffer.from(note, "utf-8")) : undefined,
          suggestedParams: {
            ...suggestedParams,
            lastRound: suggestedParams.firstRound + 10,
          },
        });

      requestSignature(transaction);
    },
    [state.account]
  );

  const createFungibleToken = useCallback(async () => {
    const metadataResponse = await fetch("/assets/metadata/pixel.json");
    const metadataJSON = await metadataResponse.json();
    const metadataString = JSON.stringify(metadataJSON);

    const textEncoder = new TextEncoder();

    const metadataDigest = await crypto.subtle.digest(
      "SHA-256",
      textEncoder.encode(metadataString)
    );
    const metadataHash = new Uint8Array(metadataDigest);

    const suggestedParams = await client.getTransactionParams().do();
    const transaction =
      await algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        defaultFrozen: true, // I don't know what this is but it's required now.
        from: state.account,
        total: 100000000000,
        decimals: 2,
        assetName: "Pixel",
        unitName: "PIXEL",
        assetURL: "https://algorand.dev/assets/metadata/pixel.json#arc3",
        assetMetadataHash: metadataHash,
        manager: state.account,
        reserve: state.account,
        freeze: state.account,
        clawback: state.account,
        suggestedParams: {
          ...suggestedParams,
          lastRound: suggestedParams.firstRound + 10,
        },
      });

    requestSignature(transaction);
  }, [state.account]);

  const optIn = useCallback(async () => {
    const suggestedParams = await client.getTransactionParams().do();
    const transaction =
      await algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: state.account,
        to: state.account,
        closeRemainderTo: undefined,
        revocationTarget: undefined,
        amount: 0,
        assetIndex: 47378896,
        suggestedParams: {
          ...suggestedParams,
          lastRound: suggestedParams.firstRound + 10,
        },
      });

    requestSignature(transaction);
  }, [state.account]);

  const sendAsset = useCallback(
    async (recipient, assetIndex, amount) => {
      const suggestedParams = await client.getTransactionParams().do();
      const transaction =
        await algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: state.account,
          to: recipient,
          closeRemainderTo: undefined,
          revocationTarget: undefined,
          amount: Math.floor(amount * 100),
          assetIndex: assetIndex,
          suggestedParams: {
            ...suggestedParams,
            lastRound: suggestedParams.firstRound + 10,
          },
        });

      requestSignature(transaction);
    },
    [state.account]
  );

  const attachConnectorListeners = (connector) => {
    connector.on("connect", (error, payload) => {
      dispatch({ type: "didConnect", payload: connector });
    });
    connector.on("disconnect", (error, payload) => {
      dispatch({ type: "didDisconnect" });
      console.log(error, payload);
    });
    connector.on("session_request", (error, payload) => {
      console.log("session_request");
      console.log(error, payload);
    });
    connector.on("session_update", (error, payload) => {
      console.log("session_update");
      console.log(error, payload);
    });
    connector.on("call_request", (error, payload) => {
      // Once a signature request is performed, this is triggered.
      console.log("call_request");
      console.log(error, payload);
    });
    connector.on("wc_sessionRequest", (error, payload) => {
      console.log("wc_sessionRequest");
      console.log(error, payload);
    });
    connector.on("wc_sessionUpdate", (error, payload) => {
      console.log("wc_sessionUpdate");
      console.log(error, payload);
    });
  };

  const connect = async () => {
    const connector = new WalletConnect(constants.walletConnectOptions);
    console.log(connector);
    await connector.createSession();
    attachConnectorListeners(connector);
    if (!connector.connected) {
      await connector.createSession();
      if (connector.connected) {
        dispatch({ type: "didConnect", payload: connector });
      }
    }
  };
  const reconnect = () => {
    const connector = new WalletConnect(constants.walletConnectOptions);
    attachConnectorListeners(connector);
    if (connector.connected) {
      dispatch({ type: "didConnect", payload: connector });
    }
    dispatch({ type: "setInitialized", payload: true });
  };
  const disconnect = async () => {
    if (state.connector) {
      await state.connector.killSession();
    }
  };

  useEffect(() => {
    reconnect();
  }, []);

  const hasPendingTransactions = state.pendingTransactions.length > 0;
  const hasTransactions =
    hasPendingTransactions || state.completedTransactions.length > 0;
  const hasSignatureRequests = state.signatureRequests.length > 0;

  return (
    <Context.Provider
      value={{
        state,
        isConnected,
        hasPendingTransactions,
        hasTransactions,
        hasSignatureRequests,
        client,
        indexer,
        explorer,
        actions: {
          compileProgram,
        },
        connect,
        disconnect,
        transferAlgo,
        fetchAccount,
        waitForTransaction,
        requestSignature,
        createFungibleToken,
        optIn,
        sendAsset,
      }}
    >
      {hasSignatureRequests && <Signature onCancel={onCancelSignature} />}
      {state.isInitialized && props.children}
    </Context.Provider>
  );
}

export { Context as default, Provider };
