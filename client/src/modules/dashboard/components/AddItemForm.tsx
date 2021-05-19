import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GetUserInfo } from 'context/userInfoContext'
import Form from 'react-bootstrap/Form'
import { AddCategory } from './AddCategory'
import Button from 'react-bootstrap/Button'
import { BsX } from 'react-icons/bs'

export const AddItemForm = ({ user, categories, type }: AddItemFormProps) => {

  const history = useHistory()    
    
  const { updateUserExpensesInfo, updateUserIncomeInfo } = GetUserInfo()

  const [addCategoryIsHidden, setAddCategoryIsHidden] = useState(true)
  const [state, setState] = useState({
    category: '',
    amount: 0, 
    notes: '', 
    date: '',
    user_id: user.info.user_id
  })
  const [initial, setInitial] = useState({
    category: 'rent'
  })
  
  const [validated, setValidated] = useState(false)
  console.log(type)
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault()
    if (form.checkValidity() === true) {
      await fetch(`/api/addItem?type=${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
      }).then(async (result) => {
        console.log(result)
        if (result.status === 200) {
          console.log('success!')
          const res = type === 'expenses' ? updateUserExpensesInfo() : updateUserIncomeInfo()
          return res
        } else {
          console.log('error!')
        }
      }).then(result => {
        if (result !== undefined) {
          window.location.reload()
        }
      })
    } else {
      e.stopPropagation();
    } 
    setValidated(true);
  }
  
  return (
    <div className='form-wrapper'>
      <h1>{`Add ${type}`}</h1>
      <Form 
        noValidate 
        validated={validated} 
        onSubmit={handleSubmit}
      >
        <Form.Group controlId='itemCategory'>
          <Form.Label>Category</Form.Label>
          <Form.Control 
            required 
            as='select'
            onChange={(e) => setState({...state, category: e.target.value })}
          >
            <option value=''>select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.category_name}>{category.category_name}</option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a category.
          </Form.Control.Feedback>
        </Form.Group>
        <a
        onClick={(e) => setAddCategoryIsHidden(false)}
        style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline', textDecorationColor: 'blue'}}>
          Add a new category
        </a>
        {!addCategoryIsHidden ? <a 
          style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline', textDecorationColor: 'blue'}}
          onClick={(e) => setAddCategoryIsHidden(true)}>
          <BsX />
        </a> : null}
        <AddCategory
          hidden={addCategoryIsHidden} 
          type={type}/>
        <Form.Group controlId='itemAmount'>
          <Form.Label>Amount</Form.Label>
          <Form.Control 
            required 
            type="text"
            onChange={(e) => setState({...state, amount: parseFloat(e.target.value) })}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid amount.
          </Form.Control.Feedback>
        </Form.Group> 
        <Form.Group controlId="itemNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="(optional)"
            onChange={(e) => setState({...state, notes: e.target.value})}/>
        </Form.Group>
        <Form.Group controlId="transactionDate">
          <Form.Label>Date</Form.Label>
          <Form.Control 
            required 
            type="date" 
            name='date_of_transaction'
            onChange={(e) => setState({...state, date: e.target.value})}/>
          <Form.Control.Feedback type="invalid">
            Please select a date.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}