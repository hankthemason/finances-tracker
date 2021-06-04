import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export const LoginForm = ({onSubmit}: LoginFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<errorObj | undefined>(undefined)
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email && password) {
      onSubmit(email, password)
    } else { 
      setError({
        type: 'client',
        message: "you must enter an email and password"
      })
    }
  }

  return(
    <div className="login-wrapper">
      <h4 className='login-header'>Please Log In</h4>
      <div className='form-wrapper'>
        <Form 
          onSubmit={handleSubmit}
          data-testid="form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              id='login-form'
              className='form-input'
              isInvalid={error !== undefined ? true : false} 
              type="email" 
              placeholder="Enter email" 
              onChange={e => setEmail(e.target.value)}
              value={email}
              />
          <Form.Control.Feedback type="invalid">
            {error !== undefined ? error.message : null}
          </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              id='login-form'
              className='form-input'
              type="password" 
              placeholder="Password" 
              onChange={e => setPassword(e.target.value)}
              value={password}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <div className='login-register-link'>
            <Link to='/register'>new user? click here to register</Link>
          </div>
        </Form>
      </div>
    </div>
  )
}