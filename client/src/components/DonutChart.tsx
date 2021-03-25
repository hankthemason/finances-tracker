import { Doughnut } from "react-chartjs-2";

export const Donut = ({labelName, dataName, data}: DonutProps<TotalsObj>) => {
  let labels = data.map(e => e[labelName])
  let dataSet = data.map(e => e[dataName])

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
  
  return (
    <div style={{width: '400px'}} className='donut-wrapper'>
      <Doughnut data={chart}/>
    </div>
  )
}