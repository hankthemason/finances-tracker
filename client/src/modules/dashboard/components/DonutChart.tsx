import { useRef, useState, useCallback } from 'react'
import { Doughnut } from "react-chartjs-2";
import generateColors from 'utils/colorGen';
import parse from 'html-react-parser';

export const Donut = ({labelName, dataName, data}: DonutProps<CategoryTotalsObj>) => {

  let labels = data.map(e => e[labelName])
  let dataSet = data.map(e => Number(e[dataName].replace(/[^0-9.-]+/g,"")))
  const chartEl = useRef<Doughnut>(null)
  const [ref, setRef] = useState<Doughnut>()
  const colors = generateColors(data.length)
  const [legend, setLegend] = useState<any>()

  const onRefChange = useCallback(node => {

    // ref value changed to node
    setRef(node); // e.g. change ref state to trigger re-render
    if (node !== null) {
      console.log('change')
      setLegend(node.chartInstance.generateLegend())
    }
  }, []);
  
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
    layout: {
      padding: {
        bottom: 5
      }
    },
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
      let labels
      return 'yo'
      
      /*let html = '<ul className="chart-legend">';
      let labels = chartEl.data.labels
      let clrs = chartEl.data.datasets[0].backgroundColor
      let borderWidth = chartEl.data.datasets[0].borderWidth
      let borderColor = chartEl.data.datasets[0].borderColor
      chartEl.data.datasets[0].data.forEach((ds: any, i: any) => {
        html += '<li>' +
          '<div style="vertical-align: middle; display: inline-block; width: 20px; height: 14px; background-color:' + clrs[i] + '; border:' + borderWidth + 'px solid ' + borderColor + '" onclick="onLegendClicked(event, \'' + i + '\')">&nbsp;</div>' +
          '<div style="margin-left: 1px; display: inline-block" class="legend-label" id="legend-label-' + i + '" onclick="onLegendClicked(event, \'' + i + '\')">' +
          labels[i] + '</div>' +
          '</li>';
      });
      return html + '</ul>';*/
    },
  }
  
  return (
    <div className='chart-wrapper' style={{width: '400px'}}>
      <Doughnut data={chart} options={options} ref={onRefChange}/>
      {legend}
    </div> 
  )
}