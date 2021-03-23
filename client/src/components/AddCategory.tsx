import { useState } from 'react'
import { useAuth } from '../context/authContext'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const AddCategory = ({ type, hidden }: AddCategoryProps) => {
  const [newCategory, setNewCategory] = useState<string>()
  const { user } = useAuth()

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    console.log()
    await fetch(`/api/addCategory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category_name: newCategory,
        user_id: user.info.user_id,
        type: type})
    })
  }

  return (
    hidden ? null : 
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='addCategory'>
        <Form.Control
          required
          type="text"
          placeholder="new category name"
          onChange={(e) => setNewCategory(e.target.value)}>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}