import React, { useState } from 'react';
import './App.css';
import { ChooseBroker } from './ChooseBroker';
import { CsvReader } from './CsvReader';

function App() {
  const [broker, setBroker] = useState('');

  return (
    <div>
      <ChooseBroker onNewBroker={setBroker} />

      CHOSEN BROKER: { broker }

      <CsvReader />

      <ol>
        <li>Choose broker</li>
        <li>Upload file</li>
        <li>Results</li>
      </ol>
    </div>
  );
}

export default App;
