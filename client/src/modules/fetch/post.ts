import axios from 'axios';
import useTokenStore from '../auth/useTokenStore'

type callbackType = () => void

export default function postMethod(adress: string, body: {}, callback: callbackType = () => {}) {
  const {accessToken, refreshToken} = useTokenStore.getState()

  return new Promise(async (resolve, reject) => {
    try {
      const { data, headers } = await axios.post(
        process.env.API + adress, body, {
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
        
      resolve(data);
      callback()
    } catch (error) { reject(error.response?.data ?? error) }
  })
}