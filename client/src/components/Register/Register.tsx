import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const Register = ({ setFlash }: RegisterProps) => {
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [password2, setPassword2] = useState<string>()
  const [email, setEmail] = useState<string>();
  const [errors, setErrors] = useState<ErrorObj>()

  let history = useHistory();
  
  const registerUser = async (registrationCredentials: RegistrationCredentials) => {
    return fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registrationCredentials)
    })
    .then(data => data.json())
    .then(result => {
      if (result.message === 'success') {
        setFlash('registration successful!')
        history.push('/login')
      }
      if (result.errors) {
        setErrors(result.errors.reduce((acc: {}, item: Error) => {
          let {type, message} = item
          return {...acc, [type]: message}
        }, {}))
      }
    })
    .catch(err => {
      console.error(err)
    })
  }

  console.log(errors)
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && email && password && password2) {
      const result = await registerUser({
        username,
        email,
        password, 
        password2
      })
      //setToken(token)
    }
  }

  return(
    <div className='register-wrapper'>
      <h1>Please Register</h1>
      {errors && errors.form && <div>{errors.form}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUsername(e.target.value)}/>
        </label>
        <label>
          <p>Email Address</p>
          {errors && errors.email && <div>{errors.email}</div>}
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          {errors && errors.password && <div>{errors.password}</div>}
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <label>
          <p>Confirm Password</p>
          {errors && errors.password2 && <div>{errors.password2}</div>}
          <input type="password" onChange={e => setPassword2(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>

  )
}