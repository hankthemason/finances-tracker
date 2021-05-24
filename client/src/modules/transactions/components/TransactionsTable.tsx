import { Table } from 'react-bootstrap'

export const TransactionsTable = (props: TransactionsTableProps) => {
  const { transactions, headers } = props 

  return (
    <Table striped bordered size="sm">
      <thead>
        {headers.map(e => (
          <th>{e}</th>
        ))}
      </thead>
      <tbody>
        {transactions.map(e => (
          <tr>
            <td>
              {e.category_name}
            </td>
            <td>
              {e.amount}
            </td>
            <td>
              {e.notes}
            </td>
            <td>
              {e.timestamp}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}