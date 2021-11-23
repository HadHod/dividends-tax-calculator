import React, { useState } from 'react';
import './DividendsTable.css';

function getTaxInit(currency: string): number {
  switch(currency) {
    case 'PLN': return 0;
    case 'EUR': return 19;
    case 'USD': return 19;
    default: return 19;
  }
}

async function getExchangeRate(date: string, currency: string, setExchangeRate: any): Promise<void> {
  const swappedDate = date.split('-').reverse().join('-');
  fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${currency}/${swappedDate}/?format=json`)
    .then(response => response.json())
    .then(data => setExchangeRate(parseFloat(data.rates[0]['mid'])));
}

const TableRow = ({ row }: { row: any }) => {
  const [additionalTax, setAdditionalTax] = useState(getTaxInit(row.Zmiana));
  const [exchangeRate, setExchangeRate] = useState(1);
  const [toPay, setToPay] = useState(0);

  const withholdingTax: number = Math.round((1 - row.netto / row.brutto) * 100);
  if (row.Zmiana !== 'PLN') {
    getExchangeRate(row.Data, row.Zmiana, setExchangeRate);
  }

  return (
    <tr>
      <td>{ row.Data }</td>
      <td>{ row.Produkt } ({ row.ISIN })</td>
      <td>{ row.Zmiana }</td>
      <td>{ row.brutto }</td>
      <td>{ row.netto }</td>
      <td>{ withholdingTax }%</td>
      <td><input type="number" min="0" max="100" value={additionalTax} onChange={e => setAdditionalTax(parseInt(e.target.value || '0', 10))} />%</td>
      <td>{ exchangeRate }</td>
      <td>{ toPay }</td>
    </tr>
  )
}

export function DividendsTable({ data }: { data: any[] }) {
  return (
    <table>
      <tr>
        <th>Data</th>
        <th>Produkt</th>
        <th>Waluta</th>
        <th>Brutto</th>
        <th>Netto</th>
        <th>Payed tax</th>
        <th>Missing tax</th>
        <th>Exchange rate</th>
        <th>To pay tax</th>
      </tr>
      {data.map((row, i) => <TableRow key={i} row={row} />)}
    </table>
  )
}
