import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext'
import { AddItemForm } from './AddItemForm'
import { AddCategory } from './AddCategory'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { BsX } from 'react-icons/bs'

export const AddExpense = (props: AddExpenseProps) => {
  const { user } = useAuth()
  const [addCategoryIsHidden, setAddCategoryIsHidden] = useState(true)
  const [showX, setShowX] = useState(false)
  const [state, setState] = useState({
    category: '',
    amount: 0, 
    notes: '', 
    date: '',
    user_id: user.info.user_id
  })
  const [validated, setValidated] = useState(false)

  const { categories } = props
  

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      
      await fetch('/api/addExpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
      }).then(result => {
        console.log(result)
        if (result.status === 200) {
          console.log('success!')
        } else {
          console.log('error!')
        }
      })

    } else {
      e.preventDefault();
      e.stopPropagation();
    } 
    setValidated(true);
  }

  return (
    <div className='form-wrapper'>
      <Form 
        noValidate 
        validated={validated} 
        onSubmit={handleSubmit}
      >
        <Form.Group controlId='expenseCategory'>
          <Form.Label>Category</Form.Label>
          <Form.Control 
            required as='select'
            onChange={(e) => setState({...state, category: e.target.value })}
          >
            {categories.map((category, index) => (
              <option key={index} value={category.category_name}>{category.category_name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <a
        onClick={(e) => {
          setAddCategoryIsHidden(false)
          setShowX(true)
        }}
        style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline', textDecorationColor: 'blue'}}>
          Add a new category
        </a>
        {showX ? <a 
          style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline', textDecorationColor: 'blue'}}
          onClick={(e) => {
            setAddCategoryIsHidden(true)
            setShowX(false)
        }}>
          <BsX />
        </a> : null}
        <AddCategory
          hidden={addCategoryIsHidden} 
          type='expenses'/>
        <Form.Group controlId='expenseAmount'>
          <Form.Label>Amount</Form.Label>
          <Form.Control 
            required 
            type="number"
            step=".01"
            onChange={(e) => setState({...state, amount: parseFloat(e.target.value) })}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid amount.
          </Form.Control.Feedback>
        </Form.Group> 
        <Form.Group controlId="expenseNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="(optional)"
            onChange={(e) => setState({...state, notes: e.target.value})}/>
        </Form.Group>
        <Form.Group controlId="expenseDate">
          <Form.Label>Date</Form.Label>
          <Form.Control 
            required 
            type="date" 
            name='date_of_expense'
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