import React from 'react';
import { useAuth } from '../context/authContext'

export const Logout = () => {
  const { setToken } = useAuth()

  const handleLogout = () => {
    localStorage.clear()
    setToken('')
  }
  return (
    <button onClick={handleLogout}>Logout</button>
  )
}