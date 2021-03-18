import React from 'react';
import { Logout } from '../Logout'
import { useAuth } from '../../context/authContext'

export const Dashboard = () => {

  return(
    <div> 
      <h2>Dashboard</h2>
      <Logout />
    </div>
  )
}