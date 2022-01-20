import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

async function getCurrentTribe(tenantID, accountAddress) {
  try {
    const allTribes = await fcl.send([
      fcl.script`
      import Tribes from 0xTribes
          
      pub fun main(tenantID: Address, accountAddress: Address): {String: String}? {
                              
          let identity = getAccount(accountAddress).getCapability(Tribes.IdentityPublicPath)
                                      .borrow<&Tribes.Identity{Tribes.IdentityPublic}>()
                                      ?? panic("Could not get the Identity.")
      
          let tribe = identity.currentTribeName(tenantID)
      
          if tribe == nil {
              return nil
          }
      
          let returnObject: {String: String} = {}
          let tenantData = Tribes.getTribeData(tenantID, tribeName: tribe!)
          returnObject["name"] = tribe
          returnObject["ipfsHash"] = tenantData.ipfsHash
          returnObject["description"] = tenantData.description
      
          return returnObject
      }
      `,
      fcl.args([
        fcl.arg(tenantID, t.Address),
        fcl.arg(accountAddress, t.Address)
      ])
    ]).then(fcl.decode);

    return allTribes;
  } catch (error) {
    console.error(error);
  }
}

export {
  getCurrentTribe
};