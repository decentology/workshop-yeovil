import {useContext} from 'react';

import Algorand from './context/Algorand';

function useAlgorand() {
  return useContext(Algorand);
}

export default useAlgorand;