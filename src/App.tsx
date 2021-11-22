import React, { useState } from 'react';
import { ChooseBroker, CsvReader } from './components';
import './App.css';

function App() {
  const [broker, setBroker] = useState('');
  const [dividends, setDividends] = useState([]);

  return (
    <div>
      <ChooseBroker onNewBroker={setBroker} />

      <CsvReader onNewDividends={setDividends} />

      { JSON.stringify(dividends, null, 2) }
    </div>
  );
}

export default App;
