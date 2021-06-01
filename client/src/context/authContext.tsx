import React, 
      { createContext, 
        ReactNode, 
        useContext, 
        useState, 
        useEffect } from 'react';
import { useJwt } from "react-jwt";

const blankUserInfo: UserInfo = {
  user_id: null,
  email: null,
  username: null
}

const blankUserContextObject = {
  info: blankUserInfo,
  token: null
}

const defaultContextValue: AuthContextType = {
  user: blankUserContextObject,
  setUser: () => {},
  loginUser: () => {}
}

const defaultContext = {
  info: blankUserInfo,
  token: null
}

//helper function to check if info/token are stored in local storage and retrieve them if they are,
//then setting state with them in the AuthProvider body
const getFromLocalStorage = (): UserContextObject | null=> {
  let token = localStorage.getItem('token')
  let info = localStorage.getItem('user')
  let infoObj = blankUserInfo 
  if (info) {
    infoObj = JSON.parse(info)
  }
  let userObj: UserContextObject | null
  if (infoObj && token) {
    userObj = {
      info: infoObj,
      token: token
    }
  } else {
    userObj = null
  }
  return userObj
}

export const AuthContext = createContext<AuthContextType>(defaultContextValue)

export const AuthProvider = ({ children }: Props) => {
  
  let tokenStr = localStorage.getItem('token')
  let uInfo = localStorage.getItem('user')
  let uObj = blankUserInfo
  if (uInfo) {
    uObj = JSON.parse(uInfo)
  }
  let fromLocalStorage = null
  if (uInfo && tokenStr) {
    fromLocalStorage = {
      info: uObj,
      token: tokenStr
    }
  }
  
  const fromStorage = getFromLocalStorage()
  
  const [user, setUser] = useState<UserContextObject>(fromStorage ? fromStorage : defaultContext)

  const loginUser = (credentials: any) => {
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    .then(result => {
      if (result.token && result.user)  {
        setUser({
          token: result.token,
          info: result.user
        })
        localStorage.setItem('token', JSON.stringify(result.token))
        localStorage.setItem('user', JSON.stringify(result.user))
      }
      return result
    })
  }

  return (
    <AuthContext.Provider value={{user, setUser, loginUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)