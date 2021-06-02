import { useLocation } from 'react-router-dom'

export const Notes = () => {

  const location: LocationState = useLocation()
  let transaction = location.state
  let notes = location.state.notes

  return (
    <div>
      <div className='notes-header'>
        <h4>{`Category: `}</h4> <span>{transaction.category_name}</span>
      </div>
      <div className='notes-header'>
        <h4>{`Amount: `}</h4> <span>{`$${transaction.amount}`}</span>
      </div>
      <div className='notes-header'>
        <h4>Date:</h4> <span>{transaction.date}</span>
      </div>
      <div className='notes-header'>
        <h4>Notes:</h4>
      </div>
      <div style={{margin: '1px'}}>
      <textarea readOnly style={{border: '1px solid', minWidth: '300px'}} value={transaction.notes} />
      </div>
    </div>
  )
}