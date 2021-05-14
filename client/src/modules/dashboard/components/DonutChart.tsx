import { Doughnut } from "react-chartjs-2";
import { isFunctionDeclaration } from "typescript";

export const Donut = ({labelName, dataName, data}: DonutProps<CategoryTotalsObj>) => {
  let labels = data.map(e => e[labelName])
  let dataSet = data.map(e => Number(e[dataName].replace(/[^0-9.-]+/g,"")))

  const colors = [
    'rgb(239, 71, 111)',
    'rgb(255, 209, 102)',
    'rgb(6, 214, 160)',
    'rgb(17, 138, 178)',
    'rgb(7, 59, 76)'
  ]

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
    }
  }
  
  return (
    <div style={{width: '400px'}} className='donut-wrapper'>
      <Doughnut data={chart} options={options}/>
    </div>
  )
}