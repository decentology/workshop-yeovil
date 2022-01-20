import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

async function leaveTribe(tenantID) {
  try {
    const transactionID = await fcl.send([
      fcl.transaction`
      import Tribes from 0xTribes

      transaction(tenantID: Address) {
          let TribesIdentity: &Tribes.Identity
          prepare(signer: AuthAccount) {
              self.TribesIdentity = signer.borrow<&Tribes.Identity>(from: Tribes.IdentityStoragePath)
                                      ?? panic("Could not borrow the Tribes.Identity")
          }
          execute {
              self.TribesIdentity.leaveTribe(tenantID)
              log("This signer left their Tribe.")
          }
      }
      `,
      fcl.args([
        fcl.arg(tenantID, t.Address)
      ]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999)
    ]).then(fcl.decode);

    return transactionID;
  } catch (error) {
    console.error(error);
  }
}

export {
  leaveTribe
};