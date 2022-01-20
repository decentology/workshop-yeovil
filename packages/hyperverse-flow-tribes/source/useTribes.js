import React from 'react';

import { Context } from './Provider.jsx';

function useTribes() {
  const context = React.useContext(Context);
  return context;
}

export default useTribes;