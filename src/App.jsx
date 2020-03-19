import React from 'react';
import './styles.scss';
import { getBlocks, getBlock } from './apiRequests'

import Blocks from './components/Blocks';

function App() {
  return (
    <Blocks getBlocks={getBlocks} getBlock={getBlock} />

  );
}

export default App;
