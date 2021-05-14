import { useEffect, useState } from 'react'

export const Expenses = (props: ExpensesProps) => {

  let { total } = props

  total = total ? total : '$0.00'

  return (
    <div>
      {`Your monthly expenses so far are: ${total}.`}
    </div>
  )
}