enum Network {
  MainNet = "mainnet",
  TestNet = "testnet",
}
export default Network;
export const NetworkList: string[] = Object.values(Network).filter(
  (v) => typeof v === "string"
);
