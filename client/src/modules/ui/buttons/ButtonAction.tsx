import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/buttons/Action.module.css';

interface ButtonActionProps {
  text: string;
  callback: React.MouseEventHandler<HTMLButtonElement>;
  svg?: React.ReactNode;
}

const ButtonAction = ({text, callback, svg}: ButtonActionProps) => {
  const { push } = useRouter()

  return (
    <button className={styles.Action} onClick={callback}>
      {svg}
      <span>{text}</span>
    </button>
  )
}

export default ButtonAction; 