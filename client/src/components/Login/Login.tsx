import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './Login.css'

export const Login = (props: LoginProps) => {
  const {setAuthenticated} = props
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
      if (result.message === 'successfully authenticated')  {
        setAuthenticated(true)
        history.push('/dashboard')
      } else {
        console.log('yo')
      }
    })
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    console.log('submit')
    e.preventDefault();
    console.log(email)
    console.log(password)
    const res = await loginUser({
      email,
      password
    })
    // const token = await loginUser({
    //   email,
    //   password
    // })
    // setToken(token)
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
          <input type="password" onChange={e => setPassword(e.target.value)}/>
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

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}