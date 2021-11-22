import { useState } from 'react'

function getRandomString(): string {
  return (Math.random() + 1).toString(36).substring(7);
}

export function CsvReader() {
  const [csvFile, setCsvFile] = useState({});
  const [csvArray, setCsvArray] = useState([]);

  const processCSV = (str: any, delim = ';') => {
    const headers = str.slice(0, str.indexOf('\n')).split(delim).map((h: string) => h === '' ? getRandomString() : h);
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');

    const newArray = rows.map((row: any) => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj: any, header: any, i: any) => {
        obj[header] = values[i];
        return obj;
      }, {})
      return eachObject;
    })

    console.log(newArray.filter((a: any) => a['Opis'] === 'Dywidenda'));
    setCsvArray(newArray)
  }

  const submit = () => {
    const file: Blob = csvFile as Blob;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target?.result;
      console.log(text);
      processCSV(text)
    }

    reader.readAsText(file);
  }

  return (
    <form id='csv-form'>
      <input
        type='file'
        accept='.csv'
        id='csvFile'
        onChange={(e: any) => {
          setCsvFile(e.target?.files[0])
        }}
      >
      </input>
      <br />
      <button
        onClick={(e) => {
          e.preventDefault()
          if (csvFile) submit()
        }}
      >
        Submit
      </button>
    </form>
  );

}
