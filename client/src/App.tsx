import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/authContext'
import { AuthenticatedApp } from './AuthenticatedApp'
import { Login } from './modules/login/components/Login'
import { Register } from './modules/login/components/Register'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { user } = useAuth()
  
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
      {console.log('unauth')} 
      <h1>Income/Expenses Tracker</h1>
      {flash && 
      <div>
        {flash}
      </div>}
        <Switch>
          <Route exact path={'/'}>
            <Redirect to='/login' />
          </Route>
          <Route path='/register'>
            <Register setFlash={setFlash}/>
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
    </div>
  : 
    <AuthenticatedApp />
  //<BrowserRouter>
    //{console.log('auth')}
    //<Switch>
      //<Route path={'/login'}>
        //{console.log('hey')}
        //<Dashboard />
      //</Route>
    //</Switch>
  //</BrowserRouter>        
  )
}


export default App;
