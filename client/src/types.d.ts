interface RegistrationCredentials {
  username: string,
  email: string,
  password: string,
  password2: string
}

interface RegisterProps {
  setFlash: (s: string) => void
}

interface Error {
  type: string,
  message: string
}

type Errors = Error[]

interface ErrorObj {
  password?: string,
  password2?: string,
  email?: string,
  form?: string
}

interface Props {
  children: ReactNode
}

type User = {
  user_id: number | null,
  email: string | null
}

type Token = string

type AuthContextType = {
  user: User,
  setUser: ((user: User) => void),
  token: Token,
  setToken: ((token: Token) => void)
}

interface ExpensesProps {
  date: Date
}