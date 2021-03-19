import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'

export const Expenses = (props: ExpensesProps) => {

  const { date } = props

  const { user } = useAuth()
  
  const m = date.getMonth() + 1
  const s = '0'.concat(m.toString())

  const [total, setTotal] = useState<number>()
  
  useEffect(() => {

    const getTotalExpenses = async() => {
      await fetch(`/api/expenses?user_id=${user.user_id}&month=${s}`)
      .then(response => response.json())
      .then(result => {
        setTotal(parseFloat(result))
      })
    }

    if (user.user_id) {
      getTotalExpenses()
    }
  }, [user])  

  return (
    <div>
      {total && `Your monthly expenses so far are: $${total}.`}
    </div>
  )
}