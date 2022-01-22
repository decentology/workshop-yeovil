import { Hyperverse, HyperverseModuleBase } from ".";

async function initialize(options: Hyperverse) {
  // const blockchain = await options.blockchain.initialize(options);
  // return {
  //   ...options,
  //   blockchain,
  // };
  return options;
}

export default initialize;
