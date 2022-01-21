import {networks, useHyperverse} from '@decentology/hyperverse';

const environment = {
  [networks.MainNet]: {
    appID: 448458617
  },
  [networks.TestNet]: {
    appID: 45445115
  }
};

function useEnvironment() {
  const hyperverse = useHyperverse();
  return environment[hyperverse.network];
}

export {
  environment,
  useEnvironment
};