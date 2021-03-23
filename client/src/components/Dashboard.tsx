import React, { useEffect, useState } from 'react';
import { Logout } from './Logout'
import { Expenses } from './Expenses'
import { Income } from './Income'
import { AddExpense } from './AddExpense'
import { useAuth } from '../context/authContext'
import { DateAndTime } from './Date'

export const Dashboard = () => {

  const d = new Date()

  const { user } = useAuth()
  const [categories, setCategories] = useState([])

  const getCategories = async(user_id: number) => {
    await fetch(`/api/getExpenseCategories?user_id=${user_id}`)
    .then(result => result.json())
    .then(result => setCategories(result))
  }

  useEffect(() => {
    if (user.info.user_id) {
      getCategories(user.info.user_id)
    }
  }, [])

  return(
    <div> 
      <h2>Dashboard</h2>
      <p>{`Hello, ${user.info.username}!`}</p>
      <DateAndTime />
      <Expenses date={d}/>
      <Income date={d}/>
      <AddExpense categories={categories} />
      <Logout />
    </div>
  )
}