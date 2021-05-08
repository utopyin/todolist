import React from 'react'
import styles from '../../../styles/buttons/Logo.module.css'

interface ButtonProps {
  svg: React.ReactNode;
  callback? (): void | Promise<void>;
}

export default function ButtonLogo({svg, callback}: ButtonProps) {
  return (
    <button onClick={callback} className={styles.Logo}>
      {svg}
    </button>
  )
}
