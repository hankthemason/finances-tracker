import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const Register = ({ setFlash }: RegisterProps) => {
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [password2, setPassword2] = useState<string>()
  const [email, setEmail] = useState<string>();
  const [errors, setErrors] = useState<{}>({})

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
        setErrors(result.errors)
      }
    })
    .catch(err => {
      console.error(err)
    })
  }


  
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

  console.log(errors)

  return(
    <div className='register-wrapper'>
      <h1>Please Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUsername(e.target.value)}/>
        </label>
        <label>
          <p>Email Address</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <label>
          <p>Confirm Password</p>
          <input type="password" onChange={e => setPassword2(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>

  )
}