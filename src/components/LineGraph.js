// @ts-nocheck
import { Alert } from "@material-ui/lab"
import numeral from "numeral"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { casesCol, deathsCol, recoveredCol } from "../util"

const options = {
  responsive: true,
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0")
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLine: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a")
          },
        },
      },
    ],
  },
}

const LineGraph = ({ casesType = "cases", value }) => {
  const [data, setData] = useState({})
  const [errMessage, setErrMessage] = useState("")

  // build data format for chart
  const buildChartData = (data, casesType) => {
    const chartData = []
    let lastDataPoint

    for (let date in data?.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        }
        chartData.push(newDataPoint)
      }
      lastDataPoint = data[casesType][date]
    }
    return chartData
  }

  useEffect(() => {
    const fetchData = async () => {
      setErrMessage("")
      const countryCode = value.value

      const url =
        countryCode === "worldwide"
          ? "https://disease.sh/v3/covid-19/historical/all?lastday=120"
          : `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=60`

      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const chartData = buildChartData(
            countryCode === "worldwide" ? data : data?.timeline,
            casesType
          )
          setData(chartData)
          if (data.message) {
            setErrMessage(data.message)
          }
        })
    }
    fetchData()
  }, [casesType, value])

  const backgroundColor = () => {
    if (casesType === "cases") {
      return casesCol.rgbNum
    } else if (casesType === "recovered") {
      return recoveredCol.rgbNum
    }
    return deathsCol.rgbNum
  }

  return (
    <div className="app__graph">
      {data?.length > 0 && (
        // @ts-ignore
        <Line
          className="graph"
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: `rgba(${backgroundColor()}, 0.6)`,
                borderColor: `rgb(${backgroundColor()})`,
                data: data,
              },
            ],
          }}
        />
      )}
      {errMessage && (
        <Alert icon={false} severity="success">
          {errMessage}
        </Alert>
      )}
    </div>
  )
}

export default LineGraph
