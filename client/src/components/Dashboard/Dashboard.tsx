import React from 'react';
import { Logout } from '../Logout'
import { useAuth } from '../../context/authContext'
import { DateAndTime } from '../Date'

export const Dashboard = () => {

  return(
    <div> 
      <h2>Dashboard</h2>
      <DateAndTime />
      <Logout />
    </div>
  )
}