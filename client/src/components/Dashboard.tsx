import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router-dom';
import { DashboardNavbar } from './DashboardNavbar'
import { Logout } from './Logout'
import { Expenses } from './Expenses'
import { Income } from './Income'
import { AddItemForm } from './AddItemForm'
import { useAuth } from '../context/authContext'
import { DateAndTime } from './Date'
import Button from 'react-bootstrap/Button'

export const Dashboard = () => {

  const d = new Date()
  const history = useHistory()
  const { user, setUser } = useAuth()
  const [categories, setCategories] = useState({
    expenseCategories: [],
    incomeCategories: []
  })

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

  const dashboardItems = [
    {
      value: 'Add Expense',
      path: '/dashboard/addExpense'
    },
    {
      value: 'Add Income',
      path: '/dashboard/addIncome'
    },
    { 
      value: 'Logout',
      path: '/login',
      onClick : async() => {
        localStorage.clear()
        setUser({
          info: {
            user_id: null,
            email: null,
            username: null
          },
          token: null
        })
      },
      float: 'ml-auto'
    }
  ]

  return(
    <div>
      <DashboardNavbar items={dashboardItems}/>
      <div className="wrapper">
      <p>{`Hello, ${user.info.username}!`}</p>
      <DateAndTime />
      <Expenses date={d}/>
      <Income date={d}/>
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
    </div>
  )
}