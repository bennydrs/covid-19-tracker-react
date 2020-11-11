import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import './App.css';
import InfoBox from './components/InfoBox/InfoBox';
import Map from './components/Map/Map';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

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
          setCountries(countries)
        })
    }
    getCountriesData();
  }, []);

  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid 19</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country} >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value} key={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={12} total={200} />
          <InfoBox title="Recovered" cases={12} total={200} />
          <InfoBox title="Deaths" cases={124} total={200} />
        </div>
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
