import React, { useState } from 'react';
import { useAuth } from '../context/authContext'
import { useHistory, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
//import './Login.css'

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
      <div className='form-wrapper'>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              onChange={e => setEmail(e.target.value)}/>
            <Form.Text className="text-muted">
              umm..
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <div>
            <Link to='/register'>new user? click here to register</Link>
          </div>
        </Form>
      </div>
    </div>
  )
}
