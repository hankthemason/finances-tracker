import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { useAuth, AuthProvider } from './context/authContext'
import { Dashboard } from './components/Dashboard'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Preferences } from './components/Preferences'
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
      <h1>Income/Expenses Tracker</h1>
      {flash && 
      <div>
        {flash}
      </div>}
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'}>
            {user.token === null ? <Redirect to='/login' /> : <Dashboard />}
          </Route>
          <Route path='/preferences'>
            <Preferences />
          </Route>
          <Route path='/register'>
            <Register setFlash={setFlash}/>
          </Route>
          <Route path='/login'>
            {user.token === null ? <Login /> : <Redirect to='/dashboard' />}
          </Route>
          <Route path='/dashboard'>
            {user.token !== null ? <Dashboard /> : <Redirect to='/login' />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  : 
  <BrowserRouter>
    <Switch>
      <Route path={['/', 'dashboard']}>
        <Dashboard />
      </Route> 
    </Switch>
  </BrowserRouter>        
  )
}

export default App;
