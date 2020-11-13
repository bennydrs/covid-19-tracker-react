import React from 'react';
import './Table.css';
import { numberPrintStat } from './../../util';

const Table = ({ countries }) => {
  return (
    <div className="table">
      {countries.map(({country, cases}) =>(
        <tr>
          <td>{country}</td>
          <td><strong>{numberPrintStat(cases)}</strong></td>
        </tr>
      ))}
    </div>
  )
}

export default Table;
