import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { Logout } from './Logout'
import { Expenses } from './Expenses'
import { Income } from './Income'
import { AddExpense } from './AddExpense'
import { AddItemForm } from './AddItemForm'
import { useAuth } from '../context/authContext'
import { DateAndTime } from './Date'
import Button from 'react-bootstrap/Button'

export const Dashboard = () => {

  const d = new Date()

  const { user } = useAuth()
  const [categories, setCategories] = useState({
    expenseCategories: [],
    incomeCategories: []
  })
  console.log(categories)

  const getCategories = async(user_id: number) => {
    await fetch(`/api/getCategories?user_id=${user_id}`)
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
      <Button href='/dashboard/addExpense'>
        Add Expense
      </Button>
      <Button href='/dashboard/addIncome'>
        Add Income
      </Button>
      <Switch>
        <Route path='/dashboard/addExpense'>
          <AddItemForm user={user} type={'expenses'} categories={categories.expenseCategories} />
        </Route>
        <Route path='/dashboard/addIncome'>
          <AddItemForm user={user} type={'income'} categories={categories.incomeCategories} />
        </Route>
      </Switch>
      <Logout />
    </div>
  )
}