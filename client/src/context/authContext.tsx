import React, 
      { createContext, 
        ReactNode, 
        useContext, 
        useState, 
        useEffect } from 'react';
import { useJwt } from "react-jwt";

const defaultContextValue: AuthContextType = {
  user: {
    user_id: null,
    email: null
  },
  setUser: () => {},
  token: '',
  setToken: () => {},
  loginUser: () => {}
}

const defaultTokenValue = {
  token: null
}

interface UserInfo {
  email: string,
  id: number
}


export const AuthContext = createContext<AuthContextType>(defaultContextValue)

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(defaultContextValue.user);
  const [token, setToken] = useState(defaultContextValue.token)

  const loginUser = (credentials: any) => {
    return fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    .then(result => {
      if (result.token && result.user)  {
        setToken(result.token)
        setUser(result.user)
        localStorage.setItem('token', JSON.stringify(result.token))
        localStorage.setItem('user', JSON.stringify(result.user))
      } else {
        console.log('yo')
      }
      return result
    })
  }

  // useEffect(() => {
  //   //1. check session storage for a token
  //   //2. if there's a token, set that
  //   function getToken() {
  //     var tokenStr = localStorage.getItem('token');
  //     if (tokenStr) {
  //       setToken(tokenStr)
  //     }
  //     try {
  //       return tokenStr
  //     } catch (ex) {
  //       return null; // or do some other error handling
  //     }
  //   }
  //   getToken()

  //   if (token && token != '') {
  //     localStorage.setItem('token', token)
  //   }

  // }, [])

  // const { decodedToken, isExpired, reEvaluateToken } = useJwt(token);

  // useEffect(() => {
  //   if (decodedToken) {
  //     setUser(decodedToken.user)
  //   }
  // }, [decodedToken])
    
  return (
    <AuthContext.Provider value={{user, setUser, token, setToken, loginUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

// interface Props {
//   children: ReactNode
// }

// type Context = {
//   loggedIn: boolean,
//   setLoggedIn: Dispatch<SetStateAction<boolean>>
// }

// const initialContext: Context = {
//   loggedIn: false,
//   setLoggedIn: (): void => {}
// }

// const AuthContext = createContext<Context>(initialContext)  

// export const useAuth = () => useContext(AuthContext)

// export const AuthProvider = ({ children }: Props) => {
//   const [loggedIn, setLoggedIn] = useState<boolean>(false)

//   console.log(loggedIn)

//   return (
//     <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
//       {children}
//     </AuthContext.Provider>
//   )
// }
