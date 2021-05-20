import { useState } from 'react'
import { GetUserInfo } from 'context/userInfoContext'
import Form from 'react-bootstrap/Form'
import { AddCategory } from './AddCategory'
import Button from 'react-bootstrap/Button'
import { BsX } from 'react-icons/bs'

export const AddItemForm = ({ user, categories, type }: AddItemFormProps) => {
  
  const { updateUserExpensesInfo, updateUserIncomeInfo } = GetUserInfo()

  const [addCategoryIsHidden, setAddCategoryIsHidden] = useState(true)
  
  const [category, setCategory] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const user_id = user.info.user_id 
  
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState<AddItemFormErrors>() 
  
  const amountIsValid = () => {
    var regex  = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/
    if (!regex.test(amount)) {
      return false
    }
    return true
  }
  
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (category && amount && date && amountIsValid()) {
      await submitItem({
        category,
        amount,
        notes,
        date,
        user_id
      })
    } else {
      let categoryErr = category ? undefined : 'you must select a category'
      let amountErr = amount ? undefined : 'you must enter an amount'
      if (!amountIsValid()) {
        amountErr = 'you must enter a valid amount'
      }
      let dateErr = date ? undefined : 'you must select a date'
      setErrors({
        ...errors,
        category: categoryErr,
        amount: amountErr,
        date: dateErr
      })
    }
  }

  const submitItem = async (addItemProps: AddItemProps) => {
    await fetch(`/api/addItem?type=${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addItemProps)
    }).then(async (result) => {
      if (result.status === 200) {
        console.log('success!')
        const res = type === 'expenses' ? updateUserExpensesInfo() : updateUserIncomeInfo()
        return res
      } else {
        console.log(await result.json())
        console.log('error!')
      }
    }).then(result => {
      if (result !== undefined) {
        window.location.reload()
      }
    })
    setValidated(true)
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
            required={true}
            isInvalid={errors !== undefined && errors.category ? true : false}
            as='select'
            onChange={(e) => {
              setCategory(e.target.value)
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
              setAmount(e.target.value)
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
            onChange={(e) => setNotes(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="transactionDate">
          <Form.Label>Date</Form.Label>
          <Form.Control 
            required={true}
            isInvalid={errors !== undefined && errors.date !== undefined ? true : false}
            type="date" 
            name='date_of_transaction'
            onChange={(e) => {
              setDate(e.target.value)
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