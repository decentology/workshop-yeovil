async function fetchCount(props) {
  const {environment, algorand} = props;

  const response = await algorand.client.getApplicationByID(environment.appID).do();
  const globalState = response.params['global-state'];

  const parsedState = globalState
    .map((item) => {
      const key = Buffer.from(item.key, 'base64').toString();
      // Decode value based on type...
      const value = item.value.bytes.length === 0 ? item.value.uint : item.value.bytes;
      return {
        [key]: value
      };
    })
    .reduce((previous, current) => ({...previous, ...current}), {});
  
  return parsedState.Count;
};

export {fetchCount};