import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/login/Login.module.css';
import buttonStyles from '../../styles/buttons/Full.module.css';
import storeTokensFromQuery from '../auth/useStoreTokensFromQuery';
import useTokenStore from '../auth/useTokenStore';

export default function LoginPage() {
  storeTokensFromQuery()

  const { push } = useRouter()
  const hasTokens = useTokenStore((s) => !!(s.accessToken && s.refreshToken));

  useEffect(() => {
    if (hasTokens) push('/app')
  }, [push, hasTokens])

  return (
    <div className={styles.Module}>
      <div className={styles.PopupDesktop}>
        <h2 style={{marginBottom: '5px'}}>Welcome,</h2>
        <p>Please login with <span>Google</span> or <span>Github</span> to access to the Todolist app.</p>
        <div className={styles.Buttons}>
          <button className={buttonStyles.Full} id={styles.Google}
            onClick={
              () => {push(`${process.env.API}/auth/google`)}
            }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M326.331 274.255v109.761h181.49c-7.37 47.115-54.886 138.002-181.49 138.002-109.242 0-198.369-90.485-198.369-202.006 0-111.509 89.127-201.995 198.369-201.995 62.127 0 103.761 26.516 127.525 49.359l86.883-83.635C484.99 31.512 412.741-.012 326.378-.012 149.494-.012 6.366 143.116 6.366 320c0 176.884 143.128 320.012 320.012 320.012 184.644 0 307.256-129.876 307.256-312.653 0-21-2.244-36.993-5.008-52.997l-302.248-.13-.047.024z"/>
            </svg>
            <span>Connect with Google</span>
          </button>
          <button className={buttonStyles.Full}
            onClick={
              () => {push(`${process.env.API}/auth/github`)}
            }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            <span>Connect with Github</span>
          </button>
        </div>
      </div>
    </div>
  )
}
