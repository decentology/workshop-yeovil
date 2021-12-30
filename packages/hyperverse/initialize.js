
async function initialize(options) {
  const result = await options.blockchain.initialize(options);
  return {
    ...options,
    ...result,
  };
}

export default initialize;
