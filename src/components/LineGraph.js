import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import numeral from 'numeral';

const options = {
  responsive: true,
  maintainAspectRatio: true,
  legend: {
    display: false
  },
  elements: {
    point: {
      radius: 0
    }
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      }
    }
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: "MM/DD/YY",
          tooltipFormat: 'll'
        }
      }
    ],
    yAxes: [
      {
        gridLine: {
          display: false
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format('0a');
          }
        }
      }
    ]
  }
}

const LineGraph = ({ casesType = 'cases' }) => {
  const [data, setData] = useState({});

  // build data format for chart
  const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;
    
    for(let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint
        }
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetch(' https://disease.sh/v3/covid-19/historical/all?lastday=120')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          const chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    }

    fetchData();
  }, [casesType]);

  const backgroundColor = () => {
    if (casesType === "cases") {
      return "255, 0, 0"
    } else if (casesType === "recovered") {
      return "0, 128, 0"
    } 
    return '176, 0, 32'
  }

  return (
    <div className="app__graph">
      {data?.length > 0 && (
        <Line className="graph" options={options} data={{ 
          datasets: [
            {
              backgroundColor: `rgba(${backgroundColor()}, 0.6)`,
              borderColor: `rgb(${backgroundColor()})`,
              data: data
            }
          ]
         }} />
      )}
    </div>
  )
}

export default LineGraph;
