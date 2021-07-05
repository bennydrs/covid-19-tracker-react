import PublicIcon from "@material-ui/icons/Public"
import { numberPrintStat, sortData } from "./../../util"
import "./Table.css"

const Table = ({ countries, casesType = "cases", global }) => {
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
    <>
      <div className="table_global">
        <span>
          <PublicIcon className="table_global_icon" /> Worldwide
        </span>
        <strong className={color()}>{numberPrintStat(global[casesType])}</strong>
      </div>
      <div className="table">
        <table>
          <tbody>
            {countiesSorted.map(({ country, countryInfo, cases, recovered, deaths }) => (
              <tr key={country}>
                <td className="country__table">
                  <img src={countryInfo.flag} alt="" loading="lazy" width="25" height="15" />
                  {country}
                </td>
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
    </>
  )
}

export default Table
