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

interface UserInfo {
  user_id: number | null,
  email: string | null,
  username: string | null
}

interface UserContextObject {
  info: UserInfo,
  token: string | null
}

type Token = string

type AuthContextType = {
  user: UserContextObject,
  setUser: ((user: UserContextObject) => void),
  loginUser: ((credentials: any) => any)
}

interface ExpensesProps {
  date: Date
}