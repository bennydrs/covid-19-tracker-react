import { useEffect, useState } from "react"
import Chart from "react-google-charts"
import "./GeoChartVaccine.css"

const GeoChartVaccine = ({ value, data }) => {
  const [width, setWidth] = useState(0)
  const [sizeMap, setSizeMap] = useState(0)

  const dataSliced = data.map((d) => d.slice(0, 3))

  const dataChart = [["Country", "Enough for people", "Doses administered"], ...dataSliced]

  useEffect(() => {
    setWidth(window.innerWidth)
    if (width < 400) {
      setSizeMap(300)
    } else {
      setSizeMap(760)
    }
  }, [width])

  return (
    <Chart
      chartType="GeoChart"
      width="100%"
      height={`${sizeMap}px`}
      className="geoChartVaccine__map"
      data={dataChart}
      formatters={[
        {
          type: "NumberFormat",
          column: 1,
          options: {
            suffix: "%",
            negativeColor: "red",
            negativeParens: true,
          },
        },
      ]}
      options={{
        region: value.value === "worldwide" ? "world" : value.value,
        keepAspectRatio: true,
        colorAxis: {
          values: [0, 20, 40, 60, 80, 100],
          colors: ["#b7e4c7", "#74c69d", "#52b788", "#40916c", "#2d6a4f", "#1b4332"],
        },
        backgroundColor: "#333",
        datalessRegionColor: "#a1a1a1",
        // defaultColor: '#f5f5f5',
        tooltip: {
          textStyle: { color: "#ddd" },
        },
      }}
      mapsApiKey="AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
      rootProps={{ "data-testid": "3" }}
    />
  )
}

export default GeoChartVaccine
