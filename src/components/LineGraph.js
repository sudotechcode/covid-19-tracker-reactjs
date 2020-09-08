import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

const options = {
    legend: {
        display: false,
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
            label: function(tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0")
            }
        }
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: false
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a")
                    }
                }
            }
        ]
    }
}

function LineGraph({ casesType = 'cases', ...props }) {
    const [data, setData] = useState([])
    
    const buildChartData = (data, type='cases') => {
        const chartData = []
        let lastDataPoint

        for (let date in data[type]) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[type][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[type][date]
        }
        return chartData
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastDays=120')
            .then(resp => resp.json())
            .then(data => {
                const chartData = buildChartData(data, casesType)
                setData(chartData)
            })
        }
        fetchData()
    }, [casesType])

    return (
        <div className={props.className}>
            <Line 
                data={{
                    datasets: [{
                        backgroundColor: "rgba(204, 16, 52, 0.5",
                        borderColor: "#CC1034",
                        data: data
                    }]
                }}
                options={options}
            />
        </div>
    )
}

export default LineGraph
