async function initialize(options) {
  // Pass network to initial blockchain client
  const { network } = options;
  // const result = await options.blockchain.initialize({ network });
  // console.log('Options and blockchain initialized', options, result);
  return {
    ...options,
    // ...result,
  };
}

export default initialize;
