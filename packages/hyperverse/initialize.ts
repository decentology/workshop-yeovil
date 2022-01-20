import { Hyperverse } from "./types";

async function initialize<T extends Hyperverse>(options: T): Promise<T> {
  const result = await options.blockchain?.initialize(options);
  return {
    ...options,
    ...result,
  };
}

export default initialize;
