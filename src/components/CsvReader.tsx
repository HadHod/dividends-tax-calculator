import { useState } from 'react'

const DELIM: string = ';';
const EMPTY_PREFIX: string = 'empty_';

function getHeaders(firstRow: string): string[] {
  const getRandomString = () => EMPTY_PREFIX + (Math.random() + 1).toString(36).substring(7);

  return firstRow
    .slice(0, firstRow.indexOf('\n'))
    .split(DELIM)
    .map((h: string) => h === '' ? getRandomString() : h);
}

function filterFields(a: any): any {
  const emptyKeys: string[] = Object.keys(a).filter((key: string) => key.startsWith(EMPTY_PREFIX));
  const div1: number = parseFloat(a[emptyKeys[0]].replace(',', '.'));
  const div2: number = parseFloat(a[emptyKeys[1]].replace(',', '.'));

  return {
    Data: a['Data'],
    ISIN: a['ISIN'],
    Produkt: a['Produkt'],
    Zmiana: a['Zmiana'],
    brutto: div1 > div2 ? div1 : div2,
    netto: div1 > div2 ? div2 : div1,
  }
}

interface ICsvReader {
  onNewDividends: any;
}

export function CsvReader({ onNewDividends }: ICsvReader) {
  const [csvFile, setCsvFile] = useState({});

  const processCSV = (str: any, delim = ';') => {
    const headers: string[] = getHeaders(str);
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');

    const data = rows.map((row: string) => {
      const values = row.split(delim);
      return headers.reduce((obj: any, header: any, i: any) => {
        obj[header] = values[i];
        return obj;
      }, {});
    })

    onNewDividends(data.filter((a: any) => a['Opis'] === 'Dywidenda').map((a: any) => filterFields(a)));
  }

  const submit = () => {
    const file: Blob = csvFile as Blob;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target?.result;
      processCSV(text)
    }

    reader.readAsText(file);
  }

  const onChange = (e: any) => {
    setCsvFile(e.target?.files[0])
  };

  const onSubmit = (e: any) => {
    e.preventDefault()
    if (csvFile) {
      submit();
    }
  }

  return (
    <form id='csv-form'>
      <input type='file' accept='.csv' id='csvFile' onChange={onChange} />
      <br />
      <button onClick={onSubmit}>
        Calculate
      </button>
    </form>
  );
}
