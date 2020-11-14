import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

const casesTypeColors = {
  cases: {
    hex: '#ff0000',
    rgb: "rgb(255, 0, 0)",
    // half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 600,
  },
  recovered: {
    hex: "#008000",
    rgb: "rgb(0, 128, 0)",
    // half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1000,
  },
  deaths: {
    hex: "#B00020",
    rgb: "rgb(176, 0, 32)",
    // half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 1200,
  }
}

export const prettyPrintStat = (stat) => stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const numberPrintStat = (stat) => stat ? `${numeral(stat).format("0,0")}` : "+0";


export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
}

const showToMap = (country, name, lat, long, casesType, flag, cases, recovered, deaths) => {
  return (
    <Circle
      key={name}
      center = {[lat, long]}
      color = {casesTypeColors[casesType].hex}
      fillColor = {casesTypeColors[casesType].hex}
      fillOpacity = {0.4}
      radius = {
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${flag})` }}
          >
          </div>
          <div className="info-name">{name}</div>
          <div className="info-confirmed">
            Cases: {numeral(cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  )
}

// draw circles on the map
export const showDataOnMap = (data, casesType = 'cases', countrySelect) => 
  data.map((country) => (
    countrySelect === country.country ? 
    showToMap(country, country.country, country.countryInfo.lat, country.countryInfo.long, casesType, country.countryInfo.flag, country.cases, country.recovered, country.deaths) : ''
  ))


export const showDataOnMapWW = (data, casesType = 'cases') => 
  data.map((country) => (
    showToMap(country, country.country, country.countryInfo.lat, country.countryInfo.long, casesType, country.countryInfo.flag, country.cases, country.recovered, country.deaths)
  ))