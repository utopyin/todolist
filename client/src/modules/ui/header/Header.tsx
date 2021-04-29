import React from 'react'
import { useRouter } from 'next/router';
import header from '../../../styles/header/Header.module.css'
import LogoFull from '../../../images/svg/LogoFull'
import { useAuth } from '../../auth/useAuthStore'
import useTokenStore from '../../auth/useTokenStore';

export default function Header() {

  const { user } = useAuth()
  const { push } = useRouter()

  return (
    <header className={header.Header}>
      <LogoFull />
      <img
        style={{
          width: '60px',
          borderRadius: '50px',
          cursor: 'pointer'
        }}
        src={user.picture}
        onClick={() => {
          useTokenStore.getState()
            .setTokens({accessToken: '', refreshToken: ""});
        }}
      />
    </header>
  )
}