import { Card, CardContent, Grid, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import GeoChartVaccine from "./GeoChartVaccine/GeoChartVaccine"
import TableDataVaccine from "./TableDataVaccine"

const Vaccine = ({ value, countries }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getVaccine = async () => {
      const res = await fetch(
        "https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1&fullData=true"
      )
      const result = await res.json()
      let dataVaccine = []
      // eslint-disable-next-line
      result.map((row) => {
        // eslint-disable-next-line
        countries.map((country) => {
          const persen = ((row.timeline[0].total / country.population) * 100) / 2
          if (row.country === country.name) {
            const replaceCountry = row.country
              .replace("USA", "United States")
              .replace("UK", "United Kingdom")
              .replace("Libyan Arab Jamahiriya", "Libya")
              .replace("Czechia", "Czech Republic")
              .replace("Côte d'Ivoire", "Ivory Coast")
              .replace("Lao People's Democratic Republic", "Laos")
              .replace("S. Korea", "South Korea")
              .replace("Congo", "CD")
              .replace("South Sudan", "SS")
            dataVaccine.push([replaceCountry, persen, row.timeline[0].total])
          }
        })
      })
      setData(dataVaccine)
    }
    getVaccine()
  }, [countries])

  return (
    <Grid container spacing={2} style={{ marginTop: "10px" }}>
      <Grid item xs={12} sm={12} md={8} lg={9}>
        <Card className="geoChartVaccine">
          <CardContent>
            <Typography variant="h5" component="h2" className="header_geoChartVaccine">
              {value.name} Vaccinations
            </Typography>
            <GeoChartVaccine value={value} data={data} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={3}>
        <TableDataVaccine data={data} />
      </Grid>
    </Grid>
  )
}

export default Vaccine
