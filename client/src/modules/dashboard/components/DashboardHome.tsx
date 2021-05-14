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
  const [userExpensesInfo, setUserExpensesInfo] = useState<UserFinancesInfo>()
  const [userIncomeInfo, setUserIncomeInfo] = useState<UserFinancesInfo>()
  
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

  const getUserExpensesInfo = async(user_id: number, month: string, year: string) => {
    await fetch(`/api/getUserExpensesInfo?user_id=${user_id}&month=${month}&year=${year}`)
    .then(result => {
      if(!result.ok) throw new Error(result.status.toString())
      return result.json()
    })
    .then(result => { 
      setUserExpensesInfo(result)
      localStorage.setItem('userExpensesInfo', JSON.stringify(result))
    })
    .catch((error) => {
      console.log('error: ' + error);
    });
  }
  
  const getUserIncomeInfo = async(user_id: number, month: string, year: string) => {
    await fetch(`/api/getUserIncomeInfo?user_id=${user_id}&month=${month}&year=${year}`)
    .then(result => {
      if(!result.ok) throw new Error(result.status.toString())
      return result.json()
    })
    .then(result => {
      setUserIncomeInfo(result)
      localStorage.setItem('userIncomeInfo', JSON.stringify(result))
    })
    .catch((error) => {
      console.log('error: ' + error);
    });
  }

  useEffect(() => {
    if (user.info.user_id) {
      getExpensesCategoryTotals(user.info.user_id, month, year)
      getIncomeCategoryTotals(user.info.user_id, month, year)

      let expensesFromLocalStorage = localStorage.getItem('userExpensesInfo')
      let incomeFromLocalStorage = localStorage.getItem('userIncomeInfo')

      if (expensesFromLocalStorage) {
        setUserExpensesInfo(JSON.parse(expensesFromLocalStorage))
      } else {
        getUserExpensesInfo(user.info.user_id, month, year)
      }
      if (incomeFromLocalStorage) {
        setUserIncomeInfo(JSON.parse(incomeFromLocalStorage))
      } else {
        getUserIncomeInfo(user.info.user_id, month, year)
      }
    }
  }, [])

  return (
    <div>
      <p>{`Hello, ${user.info.username}!`}</p>
      <DateAndTime />
      {userExpensesInfo && <Expenses total={userExpensesInfo.total}/>}
      {userIncomeInfo && <Income total={userIncomeInfo.total}/>}
      {userExpensesInfo && userExpensesInfo.total && <Donut labelName='category_name' dataName='total' data={userExpensesInfo.category_totals}/>}
      {userIncomeInfo && userIncomeInfo.total && <Donut labelName='category_name' dataName='total' data={userIncomeInfo.category_totals}/>}
    </div>
  )
}