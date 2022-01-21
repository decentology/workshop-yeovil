import React from 'react';
import algosdk from 'algosdk';

const approvalProgramSource = (
  `#pragma version 4
  txn ApplicationID
  int 0
  ==
  bnz main_l18
  txn OnCompletion
  int OptIn
  ==
  bnz main_l17
  txn OnCompletion
  int CloseOut
  ==
  bnz main_l16
  txn OnCompletion
  int UpdateApplication
  ==
  bnz main_l15
  txn OnCompletion
  int DeleteApplication
  ==
  bnz main_l14
  txn OnCompletion
  int NoOp
  ==
  bnz main_l7
  err
  main_l7:
  global GroupSize
  int 1
  ==
  txna ApplicationArgs 0
  byte "Add"
  ==
  &&
  bnz main_l13
  global GroupSize
  int 1
  ==
  txna ApplicationArgs 0
  byte "Deduct"
  ==
  &&
  bnz main_l10
  err
  main_l10:
  byte "Count"
  app_global_get
  store 0
  load 0
  int 0
  >
  bnz main_l12
  main_l11:
  int 1
  return
  main_l12:
  byte "Count"
  load 0
  int 1
  -
  app_global_put
  b main_l11
  main_l13:
  byte "Count"
  app_global_get
  store 0
  byte "Count"
  load 0
  int 1
  +
  app_global_put
  int 1
  return
  main_l14:
  int 0
  return
  main_l15:
  int 0
  return
  main_l16:
  int 0
  return
  main_l17:
  int 0
  return
  main_l18:
  byte "Count"
  int 0
  app_global_put
  int 1
  return`
);
const clearStateProgramSource = (
  `#pragma version 4
  int 1
  return`
);

async function deploy(props) {
  const {environment, algorand, account} = props;
  console.log(algorand.client);

  const suggestedParams = await algorand.client.getTransactionParams().do();
  const approvalProgram = await algorand.actions.compileProgram(approvalProgramSource);
  const clearProgram = await algorand.actions.compileProgram(clearStateProgramSource);

  const transaction = await algosdk.makeApplicationCreateTxnFromObject({
    from: account,
    suggestedParams: {
      ...suggestedParams,
      lastRound: suggestedParams.firstRound + 10
    },
    onComplete: algosdk.OnApplicationComplete.NoOpOC,
    approvalProgram,
    clearProgram,
    numLocalInts: 0,
    numLocalByteSlices: 0,
    numGlobalInts: 1,
    numGlobalByteSlices: 0
  });

  algorand.requestSignature(transaction);
}

export {deploy};