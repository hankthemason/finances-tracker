import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/authContext'
import { AuthenticatedApp } from './AuthenticatedApp'
import { Login, Register } from './modules/login/components'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { user, loginUser } = useAuth()
  
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
  !user.token ?
    <div className="wrapper">
      <h1>dollarsdollarsdollars.club</h1>
      {flash && 
      <div>
        {flash}
      </div>}
        <Switch>
          <Route exact path='/'>
            <Redirect to='/login' />
          </Route>
          <Route path='/register'>
            <Register setFlash={setFlash}/>
          </Route>
          <Route path='/login'>
            <Login loginUser={loginUser} />
          </Route>
          <Route path='/dashboard'>
            <Redirect to='/login'/>
          </Route>
        </Switch>
    </div>
  : 
    <AuthenticatedApp />
  )
}


export default App;
