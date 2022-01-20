
async function initialize(options) {
  const blockchain = await options.blockchain.initialize(options.network);
  return {
    ...options,
    blockchain,
  };
}

export default initialize;
