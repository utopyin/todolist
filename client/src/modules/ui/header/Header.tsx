import React from 'react'
import header from '../../../styles/header/Header.module.css'
import LogoFull from '../../../images/svg/logos/LogoFull'
import { useAuth } from '../../auth/useAuthStore'
import useTokenStore from '../../auth/useTokenStore';

export default function Header() {

  const { user } = useAuth()

  return (
    <header className={header.Header}>
      <LogoFull />
      <img
        style={{
          width: '60px',
          cursor: 'pointer',
          borderRadius: '30px',
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