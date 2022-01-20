import React, {useReducer, useEffect} from 'react';
import * as fcl from '@onflow/fcl';
import * as FlowTypes from '@onflow/types';

import authenticate from './authenticate.js';
import unauthenticate from './unauthenticate.js';
import sendFlow from './sendFlow.js';
import fetchBalance from './fetchBalance.js';

const Context = React.createContext({});

function reducer(state, action) {
  switch (action.type) {
    case 'setUser': {
      return {
        ...state,
        user: action.payload
      };
    }
    case 'setBalance': {
      return {
        ...state,
        balance: action.payload
      };
    }
    default:
      return state;
  }
}

function Provider(props) {
  const [state, dispatch] = useReducer(reducer, {
    user: null
  });

  const isInitialized = state.user !== null;

  const updateBalance = async () => {
    const nextBalance = await fetchBalance(state.user.addr);
    dispatch({type: 'setBalance', payload: nextBalance});
  };

  useEffect(() => {
    fcl.currentUser().subscribe((nextUser) => {
      dispatch({type: 'setUser', payload: nextUser});
    });
  }, []);

  return (
    <Context.Provider
      value={{
        state,
        isInitialized,
        authenticate,
        unauthenticate,
        fetchBalance,
        updateBalance,
        sendFlow
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export {
  Context as default,
  Provider
};