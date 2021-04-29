import React from 'react';
import { useRouter } from 'next/router'
import styles from '../../../styles/buttons/Normal.module.css';
import stylesFull from '../../../styles/buttons/Full.module.css';

interface ButtonLinkProps {
  text: string;
  link: string;
  svg?: React.ReactNode | null;
  isFull?: boolean
}

const ButtonLink = ({text, link, svg, isFull}: ButtonLinkProps) => {
  const { push } = useRouter()
  
  return (
    <button className={isFull ? stylesFull.Full : styles.Normal} onClick={() => push(link)}>
      {svg}
      <span>{text}</span>
    </button>
  )
}

export default ButtonLink; 