require("@babel/register");
({
  ignore: /node_modules/,
});
require("@babel/polyfill");

const HDWalletProvider = require("@truffle/hdwallet-provider");

let mnemonic =
  "inflict prison sugar spot tower ring remind concert hunt glide sun session";
let testAccounts = [
  "0x19803e35e3137a989cdcd401349285ab31eab12b7b88dbcb577f2503af7da2fe",
  "0xd9f8d6a6e52c3f2e0c36b9632d59f9d7f7ee8cef4a1261444940b43a693372f4",
  "0x79a029a8984a6a9c1fd5f839ea42a0f59e617d41f1131b604584ba5c9e3ef790",
  "0x9003e8821caf230a7d656beee52a76adc920ac7d2371b998bfade9e681a2831e",
  "0x20e8c927e60b0d13364b5bf43b1cb23708f5b9328a3c8b86739b03d4e94c5d86",
  "0x7ba5dba538be869ab6dc6df4f28362f5f6a4a0297050844890d99f08af2866f8",
  "0x73431b891b291dc1e3d64dd2f7ec8dcf7b650105c110a9f5c3be93bc9aa042ac",
  "0x1e7f288ecef84a1a003a0d9a817b3b34aae737ad2fdd4c6f13b610560d39c0d5",
  "0x78a236158a63e5271712c5901afd75fba8101285c3155d3cb4086c9201b6f45b",
  "0xbe05b48fabb8cba0b70e31851101e899575f65ed15d1b8fbb3895731a5d573b8",
];
let devUri = "https://api.avax-test.network/ext/bc/C/rpc";

module.exports = {
  testAccounts,
  mnemonic,
  networks: {
    development: {
      uri: devUri,
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          devUri, // provider url
          0, // address index
          6, // number of addresses
          true, // share nonce
          `m/44'/60'/0'/0/` // wallet HD path
        ),
      gas: 8000000,
      network_id: "*",
      chainId: 43113,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
};
