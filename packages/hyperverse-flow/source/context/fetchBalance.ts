import * as fcl from '@onflow/fcl';
import * as FlowTypes from '@onflow/types';

const fetchBalance = async (address) => {
  const balance = await fcl.send([
    fcl.script`
      import FungibleToken from 0xFungibleToken
      import FlowToken from 0xFlowToken

      pub fun main(address: Address): UFix64 {
        let vaultRef = getAccount(address)
          .getCapability(/public/flowTokenBalance)
          .borrow<&FlowToken.Vault{FungibleToken.Balance}>()
          ?? panic("Could not borrow reference to the vault.")

        return vaultRef.balance
      }
    `,
    fcl.args([
      fcl.arg(address, FlowTypes.Address)
    ])
  ]).then(fcl.decode);

  return balance;
};

export default fetchBalance;