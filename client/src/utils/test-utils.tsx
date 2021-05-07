import React, { FC, ReactElement, ComponentType } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, RenderOptions } from '@testing-library/react'
import { AuthProvider } from 'context/authContext'

export const renderWithRouter = (ui: any, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, { wrapper: BrowserRouter })
}

const TheProvider = ({children}: Props) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: TheProvider as ComponentType, ...options })

