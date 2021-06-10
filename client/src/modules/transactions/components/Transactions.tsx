import React, { useState, useEffect } from 'react'
import { useDate } from 'context/dateContext'
import { useAuth } from 'context/authContext'
import { TransactionsTable } from 'modules/transactions/components'
import { Form } from 'react-bootstrap'
import { styles } from 'modules/transactions/styles'
import capitalizeFirstLetter from 'utils/capitalizeFirstLetter'

export const Transactions = () => {
  let { user } = useAuth()
  const user_id = user.info.user_id
  let { month, year } = useDate()
  const [transactions, setTransactions] = useState<Transaction[]>()
  const [date, setDate] = useState<DateObj>({month: month, year: year})
  const [selectedDate, setSelectedDate] = useState<DateObj>({month: month, year: year})
  const [transactionType, setTransactionType] = useState<string>('expenses')

  const transactionTypes = ['expenses', 'income']
  
  const headers = [
    'category',
    'amount',
    'notes',
    'date'
  ]

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const years: string[] = []
  const startYear = 2000
  for (var i = 2000; i <= parseInt(date.year); i++) {
    years.push(i.toString())
  }
  
  useEffect(() => {

    const getTransactions = async() => {
      try {
        let res = await fetch(`/api/getTransactions?user_id=${user_id}&type=${transactionType}&month=${selectedDate.month}&year=${selectedDate.year}`)
        let data = await res.json()
        setTransactions(data)
      }
      catch (err) {
        console.log(err)
      }
    }

    getTransactions()
  }, [selectedDate, transactionType])
  
  return (
    <div>
    <div className="date-wrapper">
    <Form>
      <Form.Row className='transactions-selectors'>
      <Form.Group controlId="transaction-type-select-form" style={styles.DateSelect}>
        <Form.Label>Type</Form.Label>
        <Form.Control
          id='transaction-type-selector'
          as='select'
          size='sm'
          onChange={e => {
            const i: number = parseInt(e.target.value)
            setTransactionType(transactionTypes[i])
          }}>
          {transactionTypes.map((e, idx) => (
            <option value={idx}>{capitalizeFirstLetter(e)}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="date-select-form" style={styles.DateSelect}>
        <Form.Label>Month</Form.Label>
        <Form.Control
          id='date-selector'
          as="select"
          defaultValue={parseInt(date.month)} 
          size="sm"
          onChange={e => {
            let m = e.target.value
            if (m.length === 1) {
              m = '0' + m
            }
            setSelectedDate({...selectedDate, month: m})
          }} >
          {months.map((e, idx) => (
            <option value={idx + 1}>{e}</option>
          ))}
        </Form.Control>
        </Form.Group>
        <Form.Group style={styles.DateSelect}>
        <Form.Label>Year</Form.Label>
        <Form.Control
          id='date-selector'
          as="select"
          defaultValue={years.length - 1}
          size="sm"
          onChange={e => {
            let y = parseInt(e.target.value)
            setSelectedDate({
              ...selectedDate,
              year: years[y]
            })
          }}>
            {years.map((y, idx) => (
              <option value={idx}>{y}</option>
            ))}            

        </Form.Control>
      </Form.Group>
      </Form.Row>
    </Form>
    </div>
    {transactions !== undefined ? 
      <TransactionsTable 
        transactions={transactions} 
        headers={headers}
        type={transactionType}
      /> : <div>loading...</div>}
    </div>
  )
}