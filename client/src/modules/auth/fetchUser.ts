import { UserInterface } from './useAuthStore'
import useTokenStore from './useTokenStore'
import axios from 'axios'; 

export default function fetchUserData(callback: (user: UserInterface) => void): Promise<UserInterface> {
  const {accessToken, refreshToken} = useTokenStore.getState()

  return new Promise(async (resolve, reject) => {
    try {
      const { data, headers } = await axios.get(
        `${process.env.API}/user/data`, {
        headers: {
          'x-token': accessToken,
          'x-refresh-token': refreshToken
        }
      })
      const user = {id: data.id, name: data.name, picture: data.picture, isAdmin: !!data.isAdmin}
      
      useTokenStore
        .getState()
        .setTokens({
          accessToken: headers['x-token'],
          refreshToken: headers['x-refresh-token']
        })
        
      callback(user);
      resolve(user);
    } catch (error) { reject(error) }
  })
 }