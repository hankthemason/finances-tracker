import React, { useState, useEffect, createContext, useContext } from 'react'
import { useAuth } from 'context/authContext'

const defaultUserIncomeInfo: UserFinancesInfo = {
	total: '0',
	category_totals: []
}

const defaultUserExpensesInfo: UserFinancesInfo = {
	total: '0',
	category_totals: []
}

const defaultContextValue = {
	userIncomeInfo: defaultUserIncomeInfo,
	userExpensesInfo: defaultUserExpensesInfo,
	updateUserExpensesInfo: () => {},
	updateUserIncomeInfo: () => {}
}

const UserInfoContext = createContext(defaultContextValue)

export const GetUserInfo = () => {
	const ctx = useContext(UserInfoContext);
	if (ctx === undefined) {
		throw new Error('you need to call getUserInfo inside of UserInfoProvider')
	}
	return ctx
}

export const UserInfoProvider = ({ children }: Props) => {

	const { user } = useAuth()

	const d = new Date()
  const m = d.getMonth() + 1
  const month = '0'.concat(m.toString())
  const year = d.getFullYear().toString()

  const [userExpensesInfo, setUserExpensesInfo] = useState<UserFinancesInfo>(defaultUserExpensesInfo)
  const [userIncomeInfo, setUserIncomeInfo] = useState<UserFinancesInfo>(defaultUserIncomeInfo)

  const getUserExpensesInfo = async(user_id: number, month: string, year: string) => {
    const res = await fetch(`/api/getUserExpensesInfo?user_id=${user_id}&month=${month}&year=${year}`)
    .then(result => {
      if(!result.ok) throw new Error(result.status.toString())
      return result.json()
    })
    .then(result => { 
      setUserExpensesInfo(result)
      localStorage.setItem('userExpensesInfo', JSON.stringify(result))
			return result
    })
    .catch((error) => {
      console.log('error: ' + error);
    });
		console.log(res)
		return res
  }
  
  const getUserIncomeInfo = async(user_id: number, month: string, year: string) => {
    const res = await fetch(`/api/getUserIncomeInfo?user_id=${user_id}&month=${month}&year=${year}`)
			.then(result => {
				if(!result.ok) throw new Error(result.status.toString())
				return result.json()
			})
			.then(result => {
				setUserIncomeInfo(result)
				localStorage.setItem('userIncomeInfo', JSON.stringify(result))
				return result
			})
			.catch((error) => {
				console.log('error: ' + error);
			});
			return res
  }

	useEffect(() => {
    if (user.info.user_id) { 

      let expensesFromLocalStorage = localStorage.getItem('userExpensesInfo')
      let incomeFromLocalStorage = localStorage.getItem('userIncomeInfo')

      if (expensesFromLocalStorage) {
        setUserExpensesInfo(JSON.parse(expensesFromLocalStorage))
      } else {
        getUserExpensesInfo(user.info.user_id, month, year)
      }
      if (incomeFromLocalStorage) {
        setUserIncomeInfo(JSON.parse(incomeFromLocalStorage))
      } else {
        getUserIncomeInfo(user.info.user_id, month, year)
      }
    }
  }, [])

	const updateUserExpensesInfo = async () => {
		if (user.info.user_id) {
			const res = await getUserExpensesInfo(user.info.user_id, month, year)
			return res
		}
	}

	const updateUserIncomeInfo =  async () => {
		if (user.info.user_id) {
			const res = await getUserIncomeInfo(user.info.user_id, month, year)
			return res
		}
	}
	return (
		<UserInfoContext.Provider value={{ userExpensesInfo, userIncomeInfo, updateUserExpensesInfo, updateUserIncomeInfo }}>
			{children}
		</UserInfoContext.Provider>
	)
}