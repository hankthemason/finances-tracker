import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'

export const Income = (props: ExpensesProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const { user } = useAuth()
  
  const m = new Date().getMonth() + 1
  const s = '0'.concat(m.toString())

  let [total, setTotal] = useState<number>()

  useEffect(() => {

    const getTotalIncome = async() => {
      await fetch(`/api/income?user_id=${user.info.user_id}&month=${s}`)
      .then(response => response.json())
      .then(result => {
        setTotal(parseFloat(result))
      }).then(result => setIsLoading(false))
    }

    if (user.info.user_id) {
      getTotalIncome()
    }
  }, [])
  
  total = total ? total : 0

  return isLoading ? (
    <div>
      loading...
    </div>
  ) : (
    <div>
      {`Your monthly income so far is: $${total}.`}
    </div>
  )
}