import React, { useState } from 'react';
import { ChooseBroker, CsvReader, DividendsTable } from './components';
import './App.css';

function App() {
  const [broker, setBroker] = useState('');
  const [dividends, setDividends] = useState([]);

  return (
    <div className="container">
      <ChooseBroker onNewBroker={setBroker} />

      {broker !== '' && <CsvReader onNewDividends={setDividends} />}

      {dividends.length && <DividendsTable data={dividends} />}
    </div>
  );
}

export default App;
