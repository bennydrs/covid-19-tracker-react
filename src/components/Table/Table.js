import React from 'react';
import './Table.css';
import { numberPrintStat } from './../../util';

const Table = ({ countries }) => {
  return (
    <div className="table">
      <table>
        <tbody>
          {countries.map(({ country, cases }) => (
            <tr key={country}>
              <td>{country}</td>
              <td className="table__cases"><strong>{numberPrintStat(cases)}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table;
