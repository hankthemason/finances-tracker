import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { styles } from 'modules/transactions/styles'

let tableStyles = styles.TransactionsTable

export const TransactionsTable = (props: TransactionsTableProps) => {
  const { transactions, headers, type } = props 
  let transactionId = `${type}_id`

  return (
    <Table className='transactions-table' responsive striped bordered size="sm">
      <thead>
        {headers.map((e: string) => (
          <th id='table-header' style={{minWidth: '100px', width: '25%'}}>{e}</th>
        ))}
      </thead>
      <tbody>
        {transactions.map(e => (
          <tr>
            <td>
              {e.category_name}
            </td>
            <td>
              {`$${parseInt(e.amount).toFixed(2)}`}
            </td>
            <td>
              {e.notes.length ? (
                e.notes.length < 25 ? e.notes : <Link to={{
                  pathname: `/dashboard/notes/?transaction_id=${e[transactionId]}`,
                  state: e
                }}>{`${e.notes.slice(0, 20)}...`}</Link>
              ) : null }
            </td>
            <td>
              {e.date}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}