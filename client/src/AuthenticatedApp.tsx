import { DashboardHome } from 'modules/dashboard/components/DashboardHome';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Dashboard from 'modules/dashboard/components'
import { useAuth } from 'context/authContext'
import { AddItemForm } from 'modules/dashboard/components/AddItemForm'
import { Login } from 'modules/login/components/Login'

export const AuthenticatedApp = () => {

  const {user, setUser} = useAuth()
  
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
//    getExpensesCategoryTotals(user.info.user_id, month)
//    getIncomeCategoryTotals(user.info.user_id, month)
    }
  }, [])
  return (
    <div>
      <Dashboard />
      <div className='wrapper'>
        <Switch>
          <Route path='/dashboard/home'>
            <DashboardHome />
          </Route>
          <Route path='/dashboard/addExpense'>
            <AddItemForm user={user} type={'expenses'} categories={categories.expenseCategories} />
          </Route>
          <Route path='/dashboard/addIncome'>
            <AddItemForm user={user} type={'income'} categories={categories.incomeCategories} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}