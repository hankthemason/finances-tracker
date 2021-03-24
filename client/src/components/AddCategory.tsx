import { useState } from 'react'
import { useAuth } from '../context/authContext'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const AddCategory = ({ type, hidden }: AddCategoryProps) => {
  const [newCategory, setNewCategory] = useState<string>()
  const [isInvalid, setIsInvalid] = useState<boolean>(false)
  const { user } = useAuth()
  
  const handleSubmit = async(e: React.MouseEvent<HTMLElement>) => {
    await fetch(`/api/addCategory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category_name: newCategory,
        user_id: user.info.user_id,
        type: type})
    }).then(result => {
      if (result.status === 200) {
        console.log('success!')
        window.location.reload()
      } else {
        setIsInvalid(true)
        console.log('error!')
      }
    })    
  }

  return (
    hidden ? null : 
    <Form noValidate>
      <Form.Group controlId='addCategory'>
        <Form.Control
          required
          type="text"
          placeholder="new category name"
          isInvalid={isInvalid}
          onChange={(e) => setNewCategory(e.target.value)}>
        </Form.Control>
        <Form.Control.Feedback type="invalid">please enter a unique category name with no numbers or special characters</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  )
}