import { useEffect, useState } from 'react'
import { useAuth } from 'context/authContext'

export const Expenses = (props: ExpensesProps) => {

  const [isLoading, setIsLoading] = useState(true)

  const { date } = props

  const { user } = useAuth()
  
  const m = date.getMonth() + 1
  const s = '0'.concat(m.toString())
  const y = date.getFullYear()

  let [total, setTotal] = useState<string>('')
   
  useEffect(() => {
    const getTotalExpenses = async() => {
      await fetch(`/api/expenses?user_id=${user.info.user_id}&month=${s}&year=${y}`)
      .then(response => response.json())
      .then(result => {
        if (result) {
          setTotal(result)
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

  total = total ? total : '$0.00'

  return isLoading ? (
    <div>
      loading...
    </div>
  ) : (
    <div>
      {`Your monthly expenses so far are: ${total}.`}
    </div>
  )
}