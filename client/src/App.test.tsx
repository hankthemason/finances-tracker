import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react';

import App from './App';

test('renders learn react link', () => {

  const { getByText, getByLabelText } = render(<BrowserRouter><App /></BrowserRouter>)

  expect(getByText("Income/Expenses Tracker")).not.toBeNull()
  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});
