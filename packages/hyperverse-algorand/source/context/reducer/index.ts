import WalletConnect from "@walletconnect/client";

export type State = {
  isInitialized: boolean;
  connector: WalletConnect | null;
  account: string | null;
  isWaiting: boolean;
  pendingTransactions: Transaction[];
  completedTransactions: Transaction[];
  signatureRequests: any[];
};

type Transaction = {
  ID: string;
  block: number;
};

type Action =
  | { type: "setInitialized", payload: boolean }
  | { type: "didConnect"; payload: WalletConnect }
  | { type: "didDisconnect" }
  | { type: "startWaiting" }
  | { type: "stopWaiting" }
  // | { type: "setAccount"; payload: string }
  | { type: "addPendingTransaction"; payload: Transaction }
  | { type: "removePendingTransaction"; payload: Transaction }
  | { type: "addSignatureRequest"; payload: any }
  | { type: "removeSignatureRequests" }

function reducer(state: State, action: Action) {

  switch (action.type) {
    case 'setInitialized': {
      return {
        ...state,
        isInitialized: true
      };
    }
    case 'didConnect': {
      const connector = action.payload;

      return {
        ...state,
        connector,
        account: connector.accounts[0]
      };
    }
    case 'didDisconnect': {
      return {
        ...state,
        connector: null,
        account: null
      };
    }
    case 'startWaiting': {
      return {
        ...state,
        isWaiting: true
      };
    }
    case 'stopWaiting': {
      return {
        ...state,
        isWaiting: false
      };
    }
    case 'addPendingTransaction': {
      return {
        ...state,
        pendingTransactions: [
          ...state.pendingTransactions,
          action.payload
        ]
      };
    }
    case 'removePendingTransaction': {
      const transaction = {
        ID: action.payload.ID,
        block: action.payload.block
      };
      return {
        ...state,
        pendingTransactions: state.pendingTransactions.filter((candidate) => candidate.ID !== transaction.ID),
        completedTransactions: [
          ...state.completedTransactions,
          transaction
        ]
      };
    }
    case 'addSignatureRequest': {
      return {
        ...state,
        signatureRequests: [
          ...state.signatureRequests,
          action.payload
        ]
      };
    }
    case 'removeSignatureRequests': {
      return {
        ...state,
        signatureRequests: [],
      };
    }
    default:
      return action;
  }
}

export default reducer;