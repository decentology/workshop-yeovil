import * as fcl from '@onflow/fcl';

const unauthenticate = async () => {
  await fcl.unauthenticate();
};

export default unauthenticate;