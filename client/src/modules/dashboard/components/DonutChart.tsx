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
      let labels = chartEl.data.labels
      console.log(chartEl.data)
      return (
        labels.map((l: any, i: any) => (
          <div>{labels[i]}</div>
        ))
      )
    },
  }
  
  return (
    <div className='chart-wrapper' style={{width: '400px'}}>
      <Doughnut data={chart} options={options} ref={onRefChange}/>
      {legend}
    </div> 
  )
}