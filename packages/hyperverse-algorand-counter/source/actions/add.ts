import algosdk from 'algosdk';

async function add(props: any) {
  const {environment, algorand, account} = props;

  const suggestedParams = await algorand.client.getTransactionParams().do();
  const transaction = await algosdk.makeApplicationNoOpTxnFromObject({
    from: account,
    suggestedParams,
    appIndex: environment.appID,
    appArgs: [
      Uint8Array.from('Add', character => character.charCodeAt(0))
    ]
  });

  algorand.requestSignature(transaction);
}

export {add};