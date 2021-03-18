interface RegistrationCredentials {
  username: string,
  email: string,
  password: string,
  password2: string
}

interface RegisterProps {
  setFlash: (s: string) => void
}

interface LoginProps {
  setToken: (s: string) => void
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