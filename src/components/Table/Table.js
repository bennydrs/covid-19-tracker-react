import { numberPrintStat, sortData } from "./../../util"
import "./Table.css"

const Table = ({ countries, casesType = "cases" }) => {
  const countiesSorted = sortData(countries, casesType)

  const color = () => {
    if (casesType === "cases") {
      return "table__cases_col"
    } else if (casesType === "recovered") {
      return "table__recovered_col"
    }
    return "table__deaths_col"
  }

  return (
    <div className="table">
      <table>
        <tbody>
          {countiesSorted.map(({ country, cases, recovered, deaths }) => (
            <tr key={country}>
              <td>{country}</td>
              <td className="table__cases">
                <strong className={color()}>
                  {numberPrintStat(
                    casesType === "cases" ? cases : casesType === "recovered" ? recovered : deaths
                  )}
                </strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
