import React, { useEffect, createContext, useState, useContext } from 'react';
import useTokenStore from './useTokenStore';
import { useRouter } from 'next/router';
import fetchUserData from './fetchUser';

interface Props {
  children: React.ReactNode
}

export interface UserInterface {
  id: number;
  name: string;
  picture: string;
  isAdmin: boolean | null;
}

const defaultUser = {
  id: 0,
  name: '',
  picture: '',
  isAdmin: null
}

const AuthContext = createContext<{
  user: UserInterface;
  updateUser: (user: UserInterface) => void;
}>({
  user: defaultUser,
  updateUser: () => {}
});

export default function AuthProvider({children}: Props) {
  const [user, setUser] = useState<UserInterface>(defaultUser)
  const hasTokens = useTokenStore((s) => !!(s.accessToken && s.refreshToken));
  const { push } = useRouter()

  const updateUser = (newUser: UserInterface) => {
    setUser(oldUser => {
      return {
        ...oldUser,
        ...newUser
      }
    })
  }

  useEffect(() => {
    if (!hasTokens) push('/')
    else {
      fetchUserData(updateUser)
        .catch(() => {
          useTokenStore
            .getState()
            .setTokens({accessToken: "", refreshToken: ""})
        })
    }
  }, [hasTokens])

  return (
    <AuthContext.Provider value={{user, updateUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

