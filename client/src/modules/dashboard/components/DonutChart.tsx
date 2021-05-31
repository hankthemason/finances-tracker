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
  const [, forceUpdate] = useState(null);

  const onRefChange = useCallback(node => {

    // ref value changed to node
    setRef(node); // e.g. change ref state to trigger re-render
    if (node !== null) {
      setLegend(node.chartInstance.generateLegend())
    }
  }, []);

  const handleLegendClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, datasetIndex: number, chartEl: any) => {
    
    let e = event.target as Element
    chartEl.getDatasetMeta(0).data[datasetIndex].hidden = 
    chartEl.getDatasetMeta(0).data[datasetIndex].hidden ? false : true
    e.classList.toggle("crossed-line")

    chartEl.update()
  };
  
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
      let clrs = chartEl.data.datasets[0].backgroundColor
      let borderWidth = chartEl.data.datasets[0].borderWidth
      return (
        <ul className="chart-legend">
          {labels.map((l: any, i: any) => (
            <li onClick={(event) => handleLegendClick(event, i, chartEl)}>
              <div className="legend-block" style={{backgroundColor: colors[i], border: `${borderWidth}px solid`}} />
              <div className="legend-label">{labels[i]}</div>
            </li>
          ))}
        </ul>
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