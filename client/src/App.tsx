import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import { useAuth, AuthProvider } from './context/authContext'
import { Dashboard } from './components/Dashboard/Dashboard'
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { Preferences } from './components/Preferences/Preferences'
import './App.css'
import { useToken } from './hooks/useToken'


function App() {
  const { user } = useAuth()
  console.log(user)
  const { token, setToken } = useToken()
  const [flash, setFlash] = useState<string>('')

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

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
        </Route>
        <Route path='/preferences'>
          <Preferences />
        </Route>
        <Route path='/register'>
          <Register setFlash={setFlash}/>
        </Route>
        <Route path={['/', '/login']}>
          <Login setToken={setToken}/>
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;
