import React, { createContext, useContext } from 'react'

const defaultContextValue = {
  day: undefined,
  month: '',
  year: '',
}

export const DateContext = createContext<DateContext>(defaultContextValue)

export const useDate = () => {
	const ctx = useContext(DateContext);
	if (ctx === undefined) {
		throw new Error('you need to call getDate inside of DateProvider')
	}
	return ctx
}

export const DateProvider = ({ children }: Props) => {
  
  const d = new Date()
  const m = d.getMonth() + 1
  const day = d.getDay()
  const month = '0'.concat(m.toString())
  const year = d.getFullYear().toString()

  let date= {
    day: day,
    month: month,
    year: year
  }
	
  return (
		<DateContext.Provider value={date}>
			{children}
		</DateContext.Provider>
	)
}
