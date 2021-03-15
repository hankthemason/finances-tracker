import { useState } from 'react';

export const useToken = () => {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token')
    let userToken
    if (tokenString) userToken = JSON.parse(tokenString)
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any) => {
    sessionStorage.setItem('token', JSON.stringify(userToken))
    setToken(userToken.token)
  }

  return {
    setToken: saveToken,
    token
  }
}