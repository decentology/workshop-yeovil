import React from 'react';

import {Context} from './Provider.jsx';

function useHyperverse() {
  const hyperverse = React.useContext(Context);
  return hyperverse;
}

export default useHyperverse;