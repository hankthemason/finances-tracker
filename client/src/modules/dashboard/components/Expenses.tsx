import { useEffect, useState } from 'react'
import { useAuth } from 'context/authContext'

export const Expenses = (props: ExpensesProps) => {

  const [isLoading, setIsLoading] = useState(true)

  const { date } = props

  const { user } = useAuth()
  
  const m = date.getMonth() + 1
  const s = '0'.concat(m.toString())

  const [total, setTotal] = useState<number>(0)
   
  useEffect(() => {
    const getTotalExpenses = async() => {
      await fetch(`/api/expenses?user_id=${user.info.user_id}&month=${s}`)
      .then(response => response.json())
      .then(result => {
        if (result) {
          setTotal(parseFloat(result))
        } 
      })
      .then(result => {
        setIsLoading(false)
      })
    }

    if (user.info.user_id) {
      getTotalExpenses()
    }
  }, [])  

  return isLoading ? (
    <div>
      loading...
    </div>
  ) : (
    <div>
      {`Your monthly expenses so far are: $${total}.`}
    </div>
  )
}