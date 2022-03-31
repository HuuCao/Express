import React from 'react'
// import { Bar } from "@reactchartjs/react-chart.js";
import { Bar } from 'react-chartjs-2'
export default function ChartPage(props) {
  var labelsData = []
  var labelsRevenue = []
  var labelsProfit = []
  props.chartRevenue.forEach((values, index) => {
    labelsData.push(values.date)
    labelsRevenue.push(values.revenue)
    labelsProfit.push(values.profit)
  })

  const datas = {
    labels: labelsData,
    datasets: [
      {
        label: 'Revenue',
        data: [0.6, 0.7, 1],
        backgroundColor: '#007BFF',
      },
      {
        label: 'Profit',
        data: [0.9, 0.6, 1.6],
        backgroundColor: '#D3E8FF',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return <Bar data={datas} options={options} />
}
