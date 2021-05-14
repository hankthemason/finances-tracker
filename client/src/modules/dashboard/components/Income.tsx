import { useEffect, useState } from 'react'

export const Income = (props: ExpensesProps) => {

  let { total } = props
  
  total = total ? total : '$0.00'

  return (
    <div>
      {`Your monthly income so far is: ${total}.`}
    </div>
  )
}