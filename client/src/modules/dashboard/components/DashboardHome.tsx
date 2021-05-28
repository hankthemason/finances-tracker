import { useState, useEffect } from 'react'
import { useAuth } from 'context/authContext'
import { GetUserInfo } from 'context/userInfoContext'
import { Donut } from './DonutChart'
import { DateAndTime } from 'modules/dashboard/components/Date'
import { Expenses } from 'modules/dashboard/components/Expenses'
import { Income } from 'modules/dashboard/components/Income'

export const DashboardHome = () => {
  const { user, setUser } = useAuth()
  const { userIncomeInfo, userExpensesInfo } = GetUserInfo()
  
  const d = new Date()
  const m = d.getMonth() + 1
  const month = '0'.concat(m.toString())
  const year = d.getFullYear().toString()

  return (
    <div>
      <p>{`Hello, ${user.info.username}!`}</p>
      <div className='textWrapper'>
      <DateAndTime />
      {userExpensesInfo && <Expenses total={userExpensesInfo.total}/>}
      {userIncomeInfo && <Income total={userIncomeInfo.total}/>}
      </div>
      <div className='chart-container' style={{display: 'inline-block', width: '80%'}}>
        <div style={{display: 'inline-block', width: '50%'}}>
        <h3>Expenses: </h3>
        {userExpensesInfo && userExpensesInfo.total && <Donut labelName='category_name' dataName='total' data={userExpensesInfo.category_totals}/>}
        </div>
        <div style={{display: 'inline-block', width: '50%', verticalAlign: 'top'}}>
        <h3>Income: </h3>
        {userIncomeInfo && userIncomeInfo.total && <Donut labelName='category_name' dataName='total' data={userIncomeInfo.category_totals}/>}
        </div>
      </div>
    </div>
  )
}