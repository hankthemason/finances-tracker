import { Donut } from './DonutChart'

export const DashboardHome = ({expensesCategoryTotals, incomeCategoryTotals}: DashboardHomeProps) => {

  return (
    <div>
      {expensesCategoryTotals && <Donut labelName='category_name' dataName='total' data={expensesCategoryTotals}/>}
      {incomeCategoryTotals && <Donut labelName='category_name' dataName='total' data={incomeCategoryTotals}/>}
    </div>
  )
}