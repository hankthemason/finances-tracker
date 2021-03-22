import React from 'react';
import { Logout } from './Logout'
import { Expenses } from './Expenses'
import { Income } from './Income'
import { useAuth } from '../context/authContext'
import { DateAndTime } from './Date'

import Form from 'react-bootstrap/Form'

export const Dashboard = () => {

  const d = new Date()

  const { user } = useAuth()

  return(
    <div> 
      <h2>Dashboard</h2>
      <p>{`Hello, ${user.info.username}!`}</p>
      <DateAndTime />
      <Expenses date={d}/>
      <Income date={d}/>
      <Form>
      </Form>
      <Logout />
    </div>
  )
}