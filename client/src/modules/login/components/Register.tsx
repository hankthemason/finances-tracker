import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export const Register = ({ setFlash }: RegisterProps) => {
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [password2, setPassword2] = useState<string>()
  const [email, setEmail] = useState<string>();
  const [errors, setErrors] = useState<ErrorObj>()

  let history = useHistory();
  
  const registerUser = async (registrationCredentials: RegistrationCredentials) => {
    return fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registrationCredentials)
    })
    .then(data => data.json())
    .then(result => {
      console.log(result)
      if (result.message === 'success') {
        setFlash('registration successful!')
        history.push('/login')
      }
      if (result.errors) {
        console.log(result.errors)
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
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="username" 
            placeholder="enter username" 
            onChange={e => setUsername(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="enter email" 
            onChange={e => setEmail(e.target.value)}/>
        </Form.Group> 
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="enter password" 
            onChange={e => setPassword(e.target.value)}/>
        </Form.Group> 
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm password"
            onChange={e => setPassword2(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  )
}