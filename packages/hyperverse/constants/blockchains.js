const Blockchain = {
  Algorand : "algorand",
  Flow : "flow",
  Ethereum : "ethereum",
  Avalanche : "avalanche",
}

const BlockchainList = Object.values(Blockchain).filter(
  (v) => typeof v === "string"
);

export {
  Blockchain as default,
  BlockchainList,
}
