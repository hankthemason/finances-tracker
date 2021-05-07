import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void,
  errors: boolean
}

export const LoginForm = ({onSubmit, errors}: LoginFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(email, password)
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <div className='form-wrapper'>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              isInvalid={errors ? true : false} 
              type="email" 
              placeholder="Enter email" 
              onChange={e => setEmail(e.target.value)}
              value={email}/>
          <Form.Control.Feedback type="invalid">
            {errors ? 'either you don\'t have an account or the email and password do not match' : null}
          </Form.Control.Feedback>
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
              value={password}/>
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