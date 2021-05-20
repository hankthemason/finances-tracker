import { useState } from 'react'
import { GetUserInfo } from 'context/userInfoContext'
import Form from 'react-bootstrap/Form'
import { AddCategory } from './AddCategory'
import Button from 'react-bootstrap/Button'
import { BsX } from 'react-icons/bs'

export const AddItemForm = ({ user, categories, type, formState, setFormState, errors, setErrors, handleSubmit, validated }: AddItemFormProps) => { 

  const [addCategoryIsHidden, setAddCategoryIsHidden] = useState(true)
  const user_id = user.info.user_id 
  
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
            required={true}
            isInvalid={errors !== undefined && errors.category ? true : false}
            as='select'
            onChange={(e) => {
              setFormState({
                ...formState,
                category: e.target.value})
              setErrors({
                ...errors,
                category: undefined 
              })
            }}
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
            required={true}
            isInvalid={errors !== undefined && errors.amount ? true : false}
            type="text"
            onChange={(e) => {
              setFormState({
                ...formState,
                amount: e.target.value})
              setErrors({
                ...errors,
                amount: undefined
              })
            }}/>
          <Form.Control.Feedback type="invalid">
            {errors ? errors.amount : null}
          </Form.Control.Feedback>
        </Form.Group> 
        <Form.Group controlId="itemNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="(optional)"
            onChange={(e) => setFormState({...formState, notes: e.target.value})}/>
        </Form.Group>
        <Form.Group controlId="transactionDate">
          <Form.Label>Date</Form.Label>
          <Form.Control 
            required={true}
            isInvalid={errors !== undefined && errors.date !== undefined ? true : false}
            type="date" 
            name='date_of_transaction'
            onChange={(e) => {
              setFormState({
                ...formState,
                date: e.target.value})
              setErrors({
                ...errors,
                date: undefined
              })
            }}/>
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