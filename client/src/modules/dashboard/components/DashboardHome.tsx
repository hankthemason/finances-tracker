import { useState, useEffect } from 'react'
import { useAuth } from 'context/authContext'
import { Donut } from './DonutChart'
import { DateAndTime } from 'modules/dashboard/components/Date'
import { Expenses } from 'modules/dashboard/components/Expenses'
import { Income } from 'modules/dashboard/components/Income'

export const DashboardHome = () => {
  const { user, setUser } = useAuth()
  
  const d = new Date()
  const m = d.getMonth() + 1
  const month = '0'.concat(m.toString())
  const year = d.getFullYear().toString()

  const [expensesCategoryTotals, setExpensesCategoryTotals] = useState<TotalsObj[]>()
  const [incomeCategoryTotals, setIncomeCategoryTotals] = useState<TotalsObj[]>()
  
  const getExpensesCategoryTotals = async(user_id: number, month: string, year: string) => {
    await fetch(`/api/getExpensesCategoryTotals?user_id=${user_id}&month=${month}&year=${year}`)
    .then(result => result.json())
    .then(result => setExpensesCategoryTotals(result))
  }

  const getIncomeCategoryTotals = async(user_id: number, month: string, year: string) => {
    await fetch(`/api/getIncomeCategoryTotals?user_id=${user_id}&month=${month}&year=${year}`)
    .then(result => result.json())
    .then(result => setIncomeCategoryTotals(result))
  }
  
  useEffect(() => {
    if (user.info.user_id) {
      //getCategories(user.info.user_id)
      getExpensesCategoryTotals(user.info.user_id, month, year)
      getIncomeCategoryTotals(user.info.user_id, month, year)
    }
  }, [])
  return (
    <div>
      <p>{`Hello, ${user.info.username}!`}</p>
      <DateAndTime />
      <Expenses date={d}/>
      <Income date={d}/>
      {expensesCategoryTotals && <Donut labelName='category_name' dataName='total' data={expensesCategoryTotals}/>}
      {incomeCategoryTotals && <Donut labelName='category_name' dataName='total' data={incomeCategoryTotals}/>}
    </div>
  )
}