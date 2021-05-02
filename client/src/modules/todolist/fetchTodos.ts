import axios from 'axios'; 
import useTokenStore from '../auth/useTokenStore'
import { Todos } from './useTodolistStore'

export default async function fetchTodos() {
  const {accessToken, refreshToken} = useTokenStore.getState()

  return new Promise<Todos>(async (resolve, reject) => {
    try {
      const { data, headers } = await axios.get(`${process.env.API}/user/todolist`, {
        headers: {
          'x-token': accessToken,
          'x-refresh-token': refreshToken
        }
      })
  
      useTokenStore
        .getState()
        .setTokens({
          accessToken: headers['x-token'],
          refreshToken: headers['x-refresh-token']
        })
      
      resolve(data)
  
    } catch ({message}) {
      reject({message})
    }
  })
}