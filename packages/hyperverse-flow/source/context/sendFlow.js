import * as fcl from '@onflow/fcl';
import * as FlowTypes from '@onflow/types';

const fixedPoint = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  useGrouping: false
});

const sendFlow = async (recipient, amount) => {
  try {
    const transactionId = await fcl.send([
      fcl.transaction`
        import FungibleToken from 0xFungibleToken
        import FlowToken from 0xFlowToken

        transaction(amount: UFix64, recipientAddress: Address) {
          let vault: @FungibleToken.Vault

          prepare(account: AuthAccount) {
            let senderTokenVault = account
              .borrow<&FungibleToken.Vault>(from: /storage/flowTokenVault)!
            self.vault <- senderTokenVault.withdraw(amount: amount)
          }

          execute {
            let recipient = getAccount(recipientAddress)
            let recipientTokenVault = recipient
              .getCapability(/public/flowTokenReceiver)
              .borrow<&FlowToken.Vault{FungibleToken.Receiver}>()
              ?? panic("Couldn't borrow a reference to recipient vault.")

            recipientTokenVault.deposit(from: <- self.vault)
          }
        }
      `,
      fcl.args([
        fcl.arg(fixedPoint.format(amount), FlowTypes.UFix64),
        fcl.arg(recipient, FlowTypes.Address),
      ]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999)
    ]).then(fcl.decode);

    return transactionId;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default sendFlow;