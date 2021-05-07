import React, { useState } from 'react';
import { useAuth } from 'context/authContext'
import { useHistory } from 'react-router-dom'
import { LoginForm } from 'modules/login/components/LoginForm'

export const Login = (props: any) => {
  const { setUser, loginUser } = useAuth()

  const [error, setError] = useState<errorObj | undefined>(undefined)
  const history = useHistory()

  const handleSubmit = (email: string, password: string) => {
    loginUser({
      email,
      password
    }).then((result: any) => {
      console.log(result)
      if (result.message === 'login error') {
        setError({
          type: 'server error',
          message: 'either you don\'t have an account or the email and password do not match'
        })
      } else {
        history.push('/dashboard/home')
      }
    })
  }

  return(
    <LoginForm onSubmit={handleSubmit} error={error} setError={setError} />
  )
}