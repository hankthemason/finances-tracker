import React, { useState } from 'react';
import { useAuth } from 'context/authContext'
import { useHistory, Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import './Register.css'

export const Register = ({ setFlash }: RegisterProps) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<ErrorObj>()

  const { setUser, loginUser } = useAuth()

  let history = useHistory();
  
  const registerUser = async (registrationCredentials: RegistrationCredentials) => {
    return fetch('api/register', {
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
        loginUser({email, password}).then(() => {
          history.push('/dashboard/home')
        })
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
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && email && password && password2) {
      await registerUser({
        username,
        email,
        password, 
        password2
      })
    } else {
      let usernameErr = username ? undefined : 'you must enter a username'
      let emailErr = email ? undefined : 'you must enter an email address'
      let passwordErr = password ? undefined : 'you must enter a password'
      setErrors({
        username: usernameErr,
        email: emailErr,
        password: passwordErr,
        password2: passwordErr
      })
    }
  }

  return(
    <div className='register-wrapper'>
      <h4 className='login-header'>Please Register</h4>
      {errors && errors.form && 
        <div className="error">
          {errors.form}
        </div>}
      <Form onSubmit={handleSubmit} data-testid="form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            id='login-form'
            isInvalid={errors !== undefined && errors.username ? true : false} 
            type="username" 
            placeholder="enter username" 
            onChange={e => {
              setErrors(undefined)
              setUsername(e.target.value)
            }}
            value={username}
          />
          <Form.Control.Feedback type="invalid" data-testid="username">
            {errors ? errors.username : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            isInvalid={errors !== undefined && errors.email ? true : false}
            id='login-form'
            placeholder="enter email" 
            onChange={e => {
              setErrors(undefined)
              setEmail(e.target.value)}
            }
            value={email}
          />
          <Form.Control.Feedback type="invalid" data-testid="email">
            {errors ? errors.email : null}
          </Form.Control.Feedback>
        </Form.Group> 
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            id='login-form'
            isInvalid={errors !== undefined && errors.password ? true : false} 
            type="password" 
            placeholder="enter password" 
            onChange={e => {
              setErrors(undefined)
              setPassword(e.target.value)}
            }
            value={password}
            />
          <Form.Control.Feedback type="invalid" data-testid="password">
            {errors ? errors.password : null}
          </Form.Control.Feedback>
        </Form.Group> 
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            id='login-form'
            isInvalid={errors !== undefined && errors.password2 ? true : false}
            type="password"
            placeholder="confirm password"
            onChange={e => {
              setErrors(undefined)
              setPassword2(e.target.value)}
            }/>
          <Form.Control.Feedback type="invalid" data-testid="password2">
            {errors ? errors.password2 : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
      <div className='login-register-link'>
        <Link to='/login'>back to login</Link>
      </div>
    </div>
  )
}
