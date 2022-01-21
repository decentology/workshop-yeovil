import React from 'react';

import {Context} from './Provider';

function useCounter() {
  const context = React.useContext(Context);
  return context;
}

export default useCounter;