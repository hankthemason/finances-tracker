import { AddItemForm } from 'modules/dashboard/components/AddItemForm'
import { useState } from 'react'
import { GetUserInfo } from 'context/userInfoContext'

type AddItemType = 'expenses' | 'income'

interface AddItemHOCProps {
  user: UserContextObject,
  type: AddItemType,
  categories: Category[]
}

const defaultFormState = {
  category: '',
  amount: '',
  notes: '',
  date: ''
}

const defaultErrors = {
  category: undefined,
  amount: undefined,
  date: undefined
}

export const AddItem = (props: AddItemHOCProps) => {
  const { user, type, categories } = props
  const user_id = user.info.user_id
  
  const { updateUserExpensesInfo, updateUserIncomeInfo } = GetUserInfo()

  const [formState, setFormState] = useState<FormStateObj>(defaultFormState)
  const [errors, setErrors] = useState<AddItemFormErrors>(defaultErrors)

  const amountIsValid = () => {
    var regex  = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/
    if (!regex.test(formState.amount)) {
      return false
    }
    return true
  }
  
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(amountIsValid())
    if (formState.category && formState.amount && formState.date && amountIsValid() && user_id) {
      await submitItem({formState, user_id})
    } else {
      let categoryErr = formState.category ? undefined : 'you must select a category'
      let amountErr = formState.amount ? undefined : 'you must enter an amount'
      
      if (!amountIsValid()) {
        amountErr = 'you must enter a valid amount'
      }
      let dateErr = formState.date ? undefined : 'you must select a date'
      setErrors({
        ...errors,
        category: categoryErr,
        amount: amountErr,
        date: dateErr
      })
    }
  }

  const [validated, setValidated] = useState(false)

  const submitItem = async(props: SubmitProps) => {
    
    await fetch(`/api/addItem?type=${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props)
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
    <AddItemForm
      user={user}
      type={type}
      categories={categories}
      formState={formState}
      setFormState={setFormState}
      errors={errors}
      setErrors={setErrors}
      handleSubmit={handleSubmit}
      validated={validated}
    />
  )
}