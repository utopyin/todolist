import React from 'react'
import styles from '../../../styles/buttons/Logo.module.css'

interface ButtonProps {
  svg: React.ReactNode
}

export default function ButtonLogo({svg}: ButtonProps) {
  return (
    <button className={styles.Logo}>
      {svg}
    </button>
  )
}
