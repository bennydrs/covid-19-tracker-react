import numeral from "numeral"
import { Circle, Popup } from "react-leaflet"

const schemeColor = {
  casesCol: {
    hex: "#ff5722",
    rgbNum: "255, 87, 34",
  },
  recoveredCol: {
    hex: "#2e7d32",
    rgbNum: "46, 125, 50",
  },
  deathsCol: {
    hex: "#c62828",
    rgbNum: "198, 40, 40",
  },
}
export const { casesCol, recoveredCol, deathsCol } = schemeColor

const casesTypeColors = {
  cases: {
    hex: casesCol.hex,
    rgb: `rgb(${casesCol.rgbNum})`,
    // half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 600,
  },
  recovered: {
    hex: recoveredCol.hex,
    rgb: `rgb(${recoveredCol.rgbNum})`,
    // half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1000,
  },
  deaths: {
    hex: deathsCol.hex,
    rgb: `rgb(${deathsCol.rgbNum})`,
    // half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 1200,
  },
}

export const prettyPrintStat = (stat) => (stat ? `+${numeral(stat).format("0.0a")}` : "+0")

export const numberPrintStat = (stat) => (stat ? `${numeral(stat).format("0,0")}` : "+0")

export const sortData = (data, casesType = "cases") => {
  const sortedData = [...data]
  return sortedData.sort((a, b) => (a[casesType] > b[casesType] ? -1 : 1))
}

const showToMap = (country, casesType) => {
  return (
    <Circle
      key={country.country}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
        </div>
      </Popup>
    </Circle>
  )
}

// draw circles on the map
export const showDataOnMap = (data, casesType = "cases", countrySelect) =>
  data.map((country) => (countrySelect === country.country ? showToMap(country, casesType) : ""))

export const showDataOnMapWW = (data, casesType = "cases") =>
  data.map((country) => showToMap(country, casesType))

export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)
