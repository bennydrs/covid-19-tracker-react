import React from 'react';
import './Table.css';
import { numberPrintStat } from './../../util';

const Table = ({ countries }) => {
  return (
    <div className="table">
      {countries.map(({country, cases}) =>(
        <tr>
          <td>{country}</td>
          <td className="table__cases"><strong>{numberPrintStat(cases)}</strong></td>
        </tr>
      ))}
    </div>
  )
}

export default Table;
