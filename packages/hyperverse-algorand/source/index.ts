import algosdk from 'algosdk';

import * as Hyperverse from '@decentology/hyperverse';
import {Provider} from './context/Algorand.jsx';
import useAlgorand from './useAlgorand.js';

const metadata = {
  name: 'Algorand'
};

function initialize(network) {
  return new Promise(async (resolve, reject) => {
    let client = null;
    let indexer = null;
    let explorer = null;

    if (network === Hyperverse.networks.MainNet) {
      client = new algosdk.Algodv2('', 'https://algoexplorerapi.io/', '');
      indexer = new algosdk.Indexer('', 'https://algoexplorerapi.io/idx2', '');
      explorer = 'https://algoexplorer.io';
    } else if (network === Hyperverse.networks.TestNet) {
      client = new algosdk.Algodv2('', 'https://testnet.algoexplorerapi.io', '');
      indexer = new algosdk.Indexer('', 'https://testnet.algoexplorerapi.io/idx2', '');
      explorer = 'https://testnet.algoexplorer.io';
    }
    
    // TODO: Make sure we're ready.
    const status = await client.status().do();
    const isReady = true; // status['last-round'] > 0;
    if (isReady) {
      resolve({
        Provider,
        props: {
          client,
          indexer,
          explorer
        }
      });
    } else {
      reject();
    }
  });
}

export {
  useAlgorand,
  initialize,
  metadata,
  Provider
};

export {
  Address,
  Signature,
  Transactions
} from './components';