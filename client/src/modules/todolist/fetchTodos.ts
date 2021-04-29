import axios from 'axios'; 
import useTokenStore from '../auth/useTokenStore'
import { Task } from './useTodolistStore'

export default function fetchTodos(
  userID: number,
  callback: (
    data: Array<Task>,
    taskID?: number
  ) => void,
  taskID?: number
) {
  const {accessToken, refreshToken} = useTokenStore.getState()

  return new Promise(async (resolve, reject) => {
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
      
      taskID ? callback(data, taskID) : callback(data)
      resolve(data)
    } catch ({message}) {
      reject(message)
    }
  })
}