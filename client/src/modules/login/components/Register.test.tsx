import React from 'react'
import { screen, render, fireEvent, cleanup } from '@testing-library/react'
import { renderWithRouter } from 'utils/test-utils'

import { Register } from 'modules/login/components/'

const testUser = {
  username: 'testy mctestalot',
  email: 'testytime@aol.com',
  password: '123456',
  password2: '123456'
}

describe("register form", () => {
  let setFlash = jest.fn
  let usernameInputEl: HTMLElement 
  let emailInputEl: HTMLElement
  let passwordInputEl: HTMLElement
  let password2InputEl: HTMLElement

  beforeEach(() => {
    renderWithRouter(<Register setFlash={setFlash} />)
    usernameInputEl = screen.getByRole("textbox", { name: /username/i })
    emailInputEl = screen.getByRole("textbox", { name: /email/i })
    passwordInputEl = screen.getByLabelText(/password/i) 
    password2InputEl = screen.getByLabelText(/confirm password/i)
  })

  test("it should render the basic fields", () => {
    expect(
      screen.getByRole("textbox", { name: /username/i})
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", { name: /email/i})
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /submit/i})
    ).toBeInTheDocument();
  })

  test("it should allow users to enter their username", () => {
    const emailInputEl = screen.getByRole("textbox", { name: /username/i})

    expect(emailInputEl).toHaveValue("")

    fireEvent.change(emailInputEl, { target: { value: "testytestalot"}})

    expect(emailInputEl).toHaveValue("testytestalot")
  })

  test("it should allow users to enter their email address", () => {
    expect(emailInputEl).toHaveValue("")

    fireEvent.change(emailInputEl, { target: { value: "testytestalot@test.com"}})

    expect(emailInputEl).toHaveValue("testytestalot@test.com")
  })

  test("it should allow users to enter their password", () => {
    expect(passwordInputEl).toHaveValue("")

    fireEvent.change(passwordInputEl, { target: { value: "password"}}) 

    expect(passwordInputEl).toHaveValue("password")
  })

  test("it should provide an error message if there is no username", () => {
    const form = screen.getByTestId('form')
    expect(usernameInputEl).toHaveValue('')
    fireEvent.submit(form)
    expect(screen.getByText("you must enter a username")).toBeInTheDocument()
  })

  test("it should provide an error message if there is no email", () => {
    const form = screen.getByTestId('form')
    expect(emailInputEl).toHaveValue('')
    fireEvent.submit(form)
    expect(screen.getByText("you must enter an email address")).toBeInTheDocument() 
  })

  test("it should provide an error message if there is no password", () => {
    const form = screen.getByTestId('form')
    expect(passwordInputEl).toHaveValue('')
    fireEvent.submit(form)
    expect(screen.getByTestId("password")).toHaveTextContent("you must enter a password")
  })
  
  test("it should provide an error message if there is no password2", () => {
    const form = screen.getByTestId('form')
    expect(passwordInputEl).toHaveValue('')
    fireEvent.submit(form)
    expect(screen.getByTestId("password2")).toHaveTextContent("you must enter a password")
  })

  test("it should provide an error message if the email is invalid", () => {

    const fetchMock = jest
      .spyOn(window, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve({errors: [{type: "email", message: "Must be a valid email address."
      }]}) })
    )

    const form = screen.getByTestId('form')

    expect(usernameInputEl).toHaveValue('')
    expect(emailInputEl).toHaveValue('')
    expect(passwordInputEl).toHaveValue('')
    expect(password2InputEl).toHaveValue('')

    fireEvent.change(usernameInputEl, { target: { value: 'testo'}})
    fireEvent.change(emailInputEl, { target: { value: "t"}})
    fireEvent.change(password2InputEl, { target: { value: "123456"}})
    fireEvent.change(passwordInputEl, { target: { value: "123456"}})

    fireEvent.submit(form)

    //expect(fetchMock).toHaveBeenCalled()
  })

  //test("it succesfully logs in with email and password", () => {
    ////cleanup because we need to render the LoginForm component instead here
    //cleanup()
    //const onSubmit = jest.fn();
    //let setError = jest.fn()
  
    //const {getByText} = renderWithRouter(<LoginForm onSubmit={onSubmit} error={undefined} setError={setError}/>)
    //const emailInputEl = screen.getByRole("textbox", { name: /email address/i})
    //const passwordInputEl = screen.getByLabelText(/password/i)
  
  
    //fireEvent.change(emailInputEl, { target: { value: "testytestalot@test.com"}})
    //fireEvent.change(passwordInputEl, { target: { value: "password"}}) 
  
    //fireEvent.click(getByText(/submit/i))
    //expect(onSubmit).toHaveBeenCalled()
  //})
})