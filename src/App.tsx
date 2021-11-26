import React, { useState } from 'react';
import { ChooseBroker, CsvReader, DividendsTable } from './components';
import './App.css';

function App() {
  const [broker, setBroker] = useState('');
  const [dividends, setDividends] = useState([]);

  return (
    <div className="container">
      <p>
        Prosty program pomagający poglądowo wyliczyć pozostały podatek do zapłacenia dla raportów z wybranych brokerów.
      </p>

      <p>
        Weryfikuj wszystkie obliczenia, program może zawierać błędy. Nie ponosze za nie odpowiedzialności. Obliczasz na własną rękę.
      </p>

      <p>
        Jezeli znalazłes jakiś błąd to stwórz ticket tutaj: <a href="https://github.com/HadHod/dividends-tax-calculator">https://github.com/HadHod/dividends-tax-calculator</a>
      </p>

      <ChooseBroker onNewBroker={setBroker} />

      {broker !== '' && <CsvReader onNewDividends={setDividends} />}

      {dividends.length !== 0 && <DividendsTable data={dividends} />}
    </div>
  );
}

export default App;
