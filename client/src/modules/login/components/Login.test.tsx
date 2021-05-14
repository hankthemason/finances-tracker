import React from 'react'
import { screen, render, fireEvent, cleanup } from '@testing-library/react'
import { renderWithRouter } from 'utils/test-utils'

import { Login } from 'modules/login/components/Login'
import { LoginForm } from 'modules/login/components/LoginForm'

describe("login form", () => {

  beforeEach(() => {
    renderWithRouter(<Login />)
  })

  test("it should render the basic fields", () => {
    expect(
      screen.getByRole("textbox", { name: /email address/i})
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit/i})
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /new user\? click here to register/i})
    ).toBeInTheDocument();
  })

  test("it should allow users to enter their email address", () => {
    const emailInputEl = screen.getByRole("textbox", { name: /email address/i})

    expect(emailInputEl).toHaveValue("")

    fireEvent.change(emailInputEl, { target: { value: "testytestalot@test.com"}})

    expect(emailInputEl).toHaveValue("testytestalot@test.com")
  })

  test("it should allow users to enter their password", () => {
    const passwordInputEl = screen.getByLabelText(/password/i)

    expect(passwordInputEl).toHaveValue("")

    fireEvent.change(passwordInputEl, { target: { value: "password"}}) 

    expect(passwordInputEl).toHaveValue("password")
  })

  test("it should provide an error message if there is no email and/or password", () => {
    const passwordInputEl = screen.getByLabelText(/password/i)
    const emailInputEl = screen.getByRole("textbox", { name: /email address/i})
    const form = screen.getByTestId('form')
    
    expect(emailInputEl).toHaveValue('')
    expect(passwordInputEl).toHaveValue('')

    fireEvent.submit(form)

    expect(screen.getByText("you must enter an email and password")).toBeInTheDocument()
  })

  test("it succesfully logs in with email and password", () => {
    //cleanup because we need to render the LoginForm component instead here
    cleanup()
    const onSubmit = jest.fn();
    let setError = jest.fn()
  
    const {getByText} = renderWithRouter(<LoginForm onSubmit={onSubmit} error={undefined} setError={setError}/>)
    const emailInputEl = screen.getByRole("textbox", { name: /email address/i})
    const passwordInputEl = screen.getByLabelText(/password/i)
  
  
    fireEvent.change(emailInputEl, { target: { value: "testytestalot@test.com"}})
    fireEvent.change(passwordInputEl, { target: { value: "password"}}) 
  
    fireEvent.click(getByText(/submit/i))
    expect(onSubmit).toHaveBeenCalled()
  })
})



