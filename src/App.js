// @ts-nocheck
import { Card, CardContent, Grid, Hidden, TextField } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import "leaflet/dist/leaflet.css"
import React, { useEffect, useState } from "react"
import "./App.css"
import InfoBox from "./components/InfoBox/InfoBox"
import LineGraph from "./components/LineGraph"
import Map from "./components/Map/Map"
import Table from "./components/Table/Table"
import { capitalize, numberPrintStat, prettyPrintStat, sortData } from "./util"

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState([20.8628, 30.2176])
  const [mapZoom, setMapZoom] = useState(2)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases")
  const [value, setValue] = useState({ name: "Worldwide", value: "worldwide" })

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))
          const sortedData = sortData(data)
          const newCountries = [value].concat(countries)
          setTableData(sortedData)
          setMapCountries(data)
          setCountries(newCountries)
        })
    }
    getCountriesData()
  }, [])

  useEffect(() => {
    const onCountryChange = async () => {
      const countryCode = value.value

      const url =
        countryCode === "worldwide"
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${countryCode}`

      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCountry(countryCode)
          setCountryInfo(data)
          countryCode === "worldwide"
            ? setMapCenter([20.8628, 30.2176])
            : setMapCenter([data.countryInfo.lat, data.countryInfo.long])
          setTimeout(function () {
            countryCode === "worldwide" ? setMapZoom(2) : setMapZoom(5)
          }, 200)
        })
    }
    onCountryChange()
  }, [value])

  const refreshPage = () => {
    window.location.reload(false)
  }

  return (
    <div className="app">
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Card className="app__cardHeader">
            <div className="app__header">
              <h2 onClick={refreshPage}>
                <Hidden mdDown>COVID</Hidden>
                <Hidden mdUp>C</Hidden>
                <span className="dash">-</span>
                <span className="nineteen">19</span>
              </h2>
              <Autocomplete
                value={value}
                options={countries}
                getOptionLabel={(option) => (option.name ? option.name : "")}
                getOptionSelected={(option, value) => {
                  //nothing that is put in here will cause the warning to go away
                  if (value === "") {
                    return true
                  } else if (value === option) {
                    return true
                  }
                }}
                onChange={(e, selectedObject) => {
                  if (selectedObject !== null) {
                    setValue(selectedObject)
                  }
                }}
                renderOption={(option) => option.name}
                style={{ width: 220 }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
              />
            </div>
          </Card>

          <div className="app__stats">
            <InfoBox
              isRed
              active={casesType === "cases"}
              onClick={() => setCasesType("cases")}
              title="Cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={numberPrintStat(countryInfo.cases)}
            />
            <InfoBox
              active={casesType === "recovered"}
              onClick={() => setCasesType("recovered")}
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={numberPrintStat(countryInfo.recovered)}
            />
            <InfoBox
              isCopper
              active={casesType === "deaths"}
              onClick={() => setCasesType("deaths")}
              title="Deaths"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={numberPrintStat(countryInfo.deaths)}
            />
          </div>
          <Map
            casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
            country={value.name}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="app__table">
            <CardContent>
              <h3>Live {capitalize(casesType)} by Country</h3>
              <Table countries={tableData} casesType={casesType} />
            </CardContent>
          </Card>
          <Card className="app__worldwide">
            <CardContent>
              <h3>Worldwide New {capitalize(casesType)}</h3>
              <LineGraph casesType={casesType} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default App
