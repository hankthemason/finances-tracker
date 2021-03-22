import React, { useState } from 'react';
import { useAuth } from '../context/authContext'
import { useHistory, Link } from 'react-router-dom'
import './Login.css'
import { setupMaster } from 'node:cluster';

export const Login = (props: any) => {
  const { setUser, loginUser } = useAuth()
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const history = useHistory()

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    loginUser({
      email,
      password
    }).then(
      history.push('./dashboard')
    )
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
