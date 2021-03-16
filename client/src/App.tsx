import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Dashboard } from './components/Dashboard/Dashboard'
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { Preferences } from './components/Preferences/Preferences'
import './App.css'
import { useToken } from './hooks/useToken'


function App() {
  
  const { token, setToken } = useToken()

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
  <div className="wrapper"> 
    <h1>Application</h1>
    <BrowserRouter>
      <Switch>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/preferences'>
          <Preferences />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login setToken={setToken}/>
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;