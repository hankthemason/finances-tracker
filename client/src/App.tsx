import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import { useAuth, AuthProvider } from './context/authContext'
import { Dashboard } from './components/Dashboard'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Preferences } from './components/Preferences'
import './App.css'

function App() {
  const { token } = useAuth()
  
  const [flash, setFlash] = useState<string>('')
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (flash) {
      timer = setTimeout(() => {
        setFlash('')
      }, 4000)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [flash])

  return (
  <div className="wrapper"> 
    <h1>Application</h1>
    {flash && 
    <div>
      {flash}
    </div>}
    <BrowserRouter>
      <Switch>
        <Route path='/dashboard'>
          { token ? <Dashboard /> : <Redirect to='/login' /> }
        </Route>
        <Route path='/preferences'>
          <Preferences />
        </Route>
        <Route path='/register'>
          <Register setFlash={setFlash}/>
        </Route>
        <Route path={['/', '/login']}>
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;
