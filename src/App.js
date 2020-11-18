import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField } from '@material-ui/core';
import './App.css';
import InfoBox from './components/InfoBox/InfoBox';
import Map from './components/Map/Map';
import Table from './components/Table/Table';
import { sortData, prettyPrintStat, numberPrintStat } from './util';
import LineGraph from './components/LineGraph';
import 'leaflet/dist/leaflet.css';
import Autocomplete from '@material-ui/lab/Autocomplete';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([20.8628, 30.2176]);
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  const [value, setValue] = useState({ name: 'Worldwide', value: 'worldwide' });

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));
          const sortedData = sortData(data);
          const newCountries = [value].concat(countries)
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(newCountries)
        })
    }
    getCountriesData();
  }, []);

  useEffect(() => {
    const onCountryChange = async () => {
      const countryCode = value.value;

      const url = countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCountry(countryCode);
          setCountryInfo(data);
          countryCode === "worldwide"
            ? setMapCenter([20.8628, 30.2176])
            : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setTimeout(function () {
            countryCode === "worldwide" ? setMapZoom(2) : setMapZoom(5);
          }, 200);
        });
    };
    onCountryChange()
  }, [value])

  const refreshPage = () => {
    window.location.reload(false);
  }

  return (
    <div className="app">
      <div className="app__left">
        <Card className="app__cardHeader">
          <div className="app__header">
            <h2 onClick={refreshPage}>COVID-19</h2>
            <Autocomplete
              value={value}
              options={countries}
              getOptionLabel={option => option.name ? option.name : ''}
              getOptionSelected={(option, value) => {
                //nothing that is put in here will cause the warning to go away
                if (value === "") {
                  return true;
                } else if (value === option) {
                  return true;
                }
              }}
              onChange={(e, selectedObject) => {
                if (selectedObject !== null) {
                  setValue(selectedObject)
                }
              }}
              renderOption={option => option.name}
              style={{ width: 220 }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                />
              )}
            />
          </div>
        </Card>

        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numberPrintStat(countryInfo.cases)}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numberPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            isCopper
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numberPrintStat(countryInfo.deaths)}
          />
        </div>
        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} country={value.name} />
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
          </CardContent>
        </Card>
        <Card className="app__worldwide">
          <CardContent>
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

export default App;
