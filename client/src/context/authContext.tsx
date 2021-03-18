import { stringify } from 'node:querystring';
import React, 
      { createContext, 
        ReactNode, 
        useContext, 
        useState, 
        useEffect } from 'react';
        
interface Props {
  children: ReactNode
}

type User = {
  id: number | null,
  email: string | null
}

type AuthContextType = {
  user: User,
  setUser: ((user: User) => void)
}

const defaultContextValue: AuthContextType = {
  user: {
    id: null,
    email: null
  },
  setUser: () => {}
}


export const AuthContext = createContext<AuthContextType>(defaultContextValue)

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(defaultContextValue.user);

  useEffect(() => {
    if (user.id != null) {
      localStorage.setItem('user', JSON.stringify(user))
    }
    
    function getCurrentUser() {
      var userStr = localStorage.getItem('user');
      try {
        return userStr ?
        JSON.parse(userStr) : null
      } catch (ex) {
        return null; // or do some other error handling
      }
    }

    console.log(getCurrentUser())
  }, [user])
  

  return (
    <AuthContext.Provider value={{user, setUser}}>
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
