// @ts-nocheck
import { Card, CardContent, Grid } from "@material-ui/core"
import "leaflet/dist/leaflet.css"
import { useEffect, useRef, useState } from "react"
import "./App.css"
import Header from "./components/Header/Header"
import InfoBox from "./components/InfoBox/InfoBox"
import LineGraph from "./components/LineGraph"
import Map from "./components/Map/Map"
import Table from "./components/Table/Table"
import { capitalize, numberPrintStat, sortData } from "./util"

function App() {
  const [countries, setCountries] = useState([])
  const [, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState([20.8628, 30.2176])
  const [mapZoom, setMapZoom] = useState(2)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases")
  const [value, setValue] = useState({ name: "Worldwide", value: "worldwide" })
  const [global, setGlobal] = useState(0)
  const ref = useRef()

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
        setGlobal(data)
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
    // eslint-disable-next-line
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

  useEffect(() => {
    const updateVisitor = () => {
      fetch("https://api.countapi.xyz/update/tracking-covid19/website-bd/?amount=1")
    }
    updateVisitor()
  }, [])

  const [scrollWidth, setScrollWidth] = useState(0)

  useEffect(() => {
    setScrollWidth(ref.current.scrollWidth - ref.current.clientWidth)
  }, [ref])

  return (
    <div className="app">
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Header
            value={value}
            countries={countries}
            setValue={setValue}
            countryInfo={countryInfo}
          />
          <div className="app__stats" ref={ref}>
            <InfoBox
              isRed
              active={casesType === "cases"}
              onClick={() => {
                setCasesType("cases")
                ref.current.scrollLeft = 0
              }}
              title="Cases"
              cases={countryInfo.todayCases}
              total={numberPrintStat(countryInfo.cases)}
            />
            <InfoBox
              active={casesType === "recovered"}
              onClick={() => {
                setCasesType("recovered")
                ref.current.scrollLeft = scrollWidth / 2
              }}
              title="Recovered"
              cases={countryInfo.todayRecovered}
              total={numberPrintStat(countryInfo.recovered)}
            />
            <InfoBox
              isCopper
              active={casesType === "deaths"}
              onClick={() => {
                setCasesType("deaths")
                ref.current.scrollLeft = scrollWidth
              }}
              title="Deaths"
              cases={countryInfo.todayDeaths}
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
              <h3>{capitalize(casesType)} by Country</h3>
              <Table countries={tableData} casesType={casesType} global={global} />
            </CardContent>
          </Card>
          <Card className="app__worldwide">
            <CardContent>
              <h3>Worldwide {capitalize(casesType)}</h3>
              <LineGraph casesType={casesType} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default App
