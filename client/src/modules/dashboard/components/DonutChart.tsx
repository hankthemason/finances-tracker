import { useEffect, useRef, useState } from 'react'
import { Legend } from 'modules/dashboard/components'
import { Doughnut } from "react-chartjs-2";
import generateColors from 'utils/colorGen';
import parse from 'html-react-parser';

export const Donut = ({labelName, dataName, data}: DonutProps<CategoryTotalsObj>) => {

  let labels = data.map(e => e[labelName])
  let dataSet = data.map(e => Number(e[dataName].replace(/[^0-9.-]+/g,"")))
  const [legend, setLegend] = useState<any>()

  const chartEl = useRef<Doughnut>(null)

  const colors = generateColors(data.length)

  // const chart = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       label: 'expenses',
  //       backgroundColor: colors,
  //       borderColor: 'rgba(0,0,0,1)',
  //       borderWidth: 2,
  //       data: dataSet
  //     }
  //   ]
  // }

  // const options = {
  //   maintainAspectRatio: true,
  //   responsive: true,
  //   width: '30%',
  //   tooltips: {
  //     enabled: true,
  //     callbacks: {
  //       label: function(tooltipItems:any, data:any) {
  //         let i = tooltipItems.index
  //         let l = data.labels[i]
  //         let amount = data.datasets[0].data[i].toFixed(2)
  //         return `${l}: $${amount}`
  //       }
  //     }
  //   },
  //   legend: {
  //     position: 'left',
  //     labels: {
  //       boxWidth: 20,
  //       boxHeight: 10
  //     }
  //   }
  // }
  
  const chart = {
    labels: labels,
    datasets: [
      {
        label: 'expenses',
        backgroundColor: colors,
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: dataSet
      }
    ]
  }

  const options = {
    maintainAspectRatio: true,
    responsive: true,
    width: '30%',
    tooltips: {
      enabled: true,
      callbacks: {
        label: function(tooltipItems:any, data:any) {
          let i = tooltipItems.index
          let l = data.labels[i]
          let amount = data.datasets[0].data[i].toFixed(2)
          return `${l}: $${amount}`
        }
      }
    },
    legend: {
      display: false
    },
    legendCallback: (chartEl: any) => {
      let html = '<ul className="chart-legend">';
      let labels = chartEl.data.labels
      let clrs = chartEl.data.datasets[0].backgroundColor
      let borderWidth = chartEl.data.datasets[0].borderWidth
      let borderColor = chartEl.data.datasets[0].borderColor
      chartEl.data.datasets[0].data.forEach((ds: any, i: any) => {
        html += '<li>' +
          '<div style="vertical-align: middle; display: inline-block; width: 20px; height: 14px; background-color:' + clrs[i] + '; border:' + borderWidth + 'px solid ' + borderColor + '" onclick="onLegendClicked(event, \'' + i + '\')">&nbsp;</div>' +
          '<div style="margin-left: 10px; display: inline-block" id="legend-label-' + i + '" onclick="onLegendClicked(event, \'' + i + '\')">' +
          labels[i] + '</div>' +
          '</li>';
      });
      return html + '</ul>';
    },
  }

  useEffect(() => {
    if (chartEl.current) {
      setLegend(parse(chartEl.current.chartInstance.generateLegend()))
    }

  }, [chartEl.current])
  
  return (
    <div className='chart-wrapper' style={{width: '400px'}}>
      <Doughnut data={chart} options={options} ref={chartEl}/>
      {legend}
    </div>
  )
}