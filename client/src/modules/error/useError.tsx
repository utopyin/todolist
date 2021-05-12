import React, { createContext, useContext, useState, useEffect } from 'react'
import styles from '../../styles/error/Error.module.css'
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
interface useErrorProps {
  children: React.ReactNode
}

const ErrorContext = createContext<{
  message: string | null;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>
}>({
  message: null,
  setMessage: () => {}
})

export default function ErrorProvider({children}: useErrorProps) {
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (message) setTimeout(() => setMessage(null), 8000)
  }, [message])

  return (
    <ErrorContext.Provider value={{message, setMessage}}>
      {
        message &&
        <div className={styles.Error}>
          <ErrorRoundedIcon />
          <span>{message}</span>
        </div>
      }
      
      {children}
    </ErrorContext.Provider>
  )
}

export const useError = () => useContext(ErrorContext)