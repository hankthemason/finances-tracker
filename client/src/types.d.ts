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
  loginUser: ({email: string, password: string}) => promise
}

interface Error {
  type: string,
  message: string
}

type Errors = Error[]

interface ErrorObj {
  username?: string,
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
  total: string
}

type Category = {
  category_name: string
}

interface AddExpenseProps {
  categories: Category[]
}

interface Expense {
  user_id: number,
  category_name: string,
  amount: number,
  timestamp: Date,
  notes: string | null
}

interface AddCategoryProps {
  type: string,
  hidden: boolean
}

interface AddItemFormProps {
  user: UserContextObject,
  categories: Category[],
  type: string,
  formState: FormStateObj,
  setFormState: Dispatch<SetStateAction<FormStateObj>>,
  errors: AddItemFormErrors,
  setErrors: Dispatch<SetStateAction<AddItemFormErrors>>,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  validated: boolean
}

interface DashboardItem {
  value: string,
  path: string,
  onClick?: () => Promise<void>,
  float?: string
}

interface DashboardNavbarProps {
  items: DashboardItem[]
}

interface TotalsObj {
  category_name: string,
  total: number
}

interface DonutProps<T> {
  labelName: keyof T,
  dataName: keyof T,
  data: T[]
}

interface DashboardHomeProps {
  expensesCategoryTotals: TotalsObj[],
  incomeCategoryTotals: TotalsObj[]
}

interface errorObj {
  type: string,
  message: string
}

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void,
  error: errorObj | undefined,
  setError: (error: errorObj) => void
}

interface CategoryTotalsObj {
  category_name: string,
  total: string
}

interface UserFinancesInfo {
  total: string,
  category_totals: CategoryTotalsObj[]
}

interface AddItemFormErrors {
  amount?: string,
  category?: string,
  date?: string
}

interface SubmitProps {
  formState: FormStateObj,
  user_id: number
}

interface FormStateObj {
  amount: string,
  category: string,
  notes?: string,
  date: string
}

interface DateContext {
  day: number | undefined,
  month: string, 
  year: string
}

interface Transaction {
  expense_id: number,
  category_name: string,
  amount: string,
  date: string,
  timestamp: string,
  notes?: string
}

interface TransactionsTableProps {
  transactions: Transaction[],
  headers: string[]
}

interface DateObj {
  day?: number,
  month: string,
  year: string
}

