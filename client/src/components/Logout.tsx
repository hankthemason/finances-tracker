import React from 'react';
import { useAuth } from '../context/authContext'

export const Logout = () => {
  const { setUser } = useAuth()

  const handleLogout = () => {
    localStorage.clear()
    setUser({
      info: {
        user_id: null,
        email: null,
        username: null
      },
      token: null
    })
  }
  return (
    <button onClick={handleLogout}>Logout</button>
  )
}