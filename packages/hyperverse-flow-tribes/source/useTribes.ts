import React from 'react';

import { Context } from './Provider';

function useTribes() {
  const context = React.useContext(Context);
  return context;
}

export default useTribes;