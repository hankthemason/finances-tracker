import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { useAuth, AuthProvider } from './context/authContext'
import { Dashboard } from './modules/dashboard/components'
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
      <h1>Income/Expenses Tracker</h1>
      {flash && 
      <div>
        {flash}
      </div>}
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  : 
  <BrowserRouter>
    <Switch>
      <Route path={['/', '/dashboard/home']}>
        <Dashboard />
      </Route> 
    </Switch>
  </BrowserRouter>        
  )
}

export default App;
