import React, { useState } from 'react';
import { useAuth } from '../context/authContext'
import { useHistory, Link } from 'react-router-dom'
import './Login.css'

export const Login = (props: any) => {
  const { setToken } = useAuth()
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const history = useHistory()

  const loginUser = async (credentials: any) => {
    return fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    .then(result => {
      if (result.token)  {
        setToken(result.token)
        history.push('/dashboard')
      } else {
        console.log('yo')
      }
    })
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const res = await loginUser({
      email,
      password
    })
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email Address</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} autoComplete={'on'}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div>
          <Link to='/register'>new user? click here to register</Link>
        </div>
      </form>
    </div>
  )
}
