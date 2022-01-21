
async function initialize(options) {
  const blockchain = await options.blockchain.initialize(options);
  return {
    ...options,
    blockchain,
  };
}

export default initialize;
