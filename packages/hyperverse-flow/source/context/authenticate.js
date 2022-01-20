import * as fcl from '@onflow/fcl';

const authenticate = async () => {
  await fcl.logIn();
};

export default authenticate;