enum Blockchain {
  Algorand = "algorand",
  Flow = "flow",
  Ethereum = "ethereum",
  Avalanche = "avalanche",
}

export default Blockchain;
export const BlockchainList: string[] = Object.values(Blockchain).filter(
  (v) => typeof v === "string"
);
