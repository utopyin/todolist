import React from 'react';
import { useRouter } from 'next/router'
import styles from '../../../styles/buttons/Normal.module.css';

interface ButtonLinkProps {
  text: string;
  link: string;
  svg: React.ReactNode | null;
}

const ButtonLink = ({text, svg, link}: ButtonLinkProps) => {
  const { push } = useRouter()

  return (
    <button className={styles.Normal} onClick={() => push(link)}>
      {svg}
      <span>{text}</span>
    </button>
  )
}

export default ButtonLink; 