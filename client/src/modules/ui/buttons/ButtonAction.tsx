import React from 'react';
import styles from '../../../styles/buttons/Action.module.css';

interface ButtonActionProps {
  text: string;
  callback: React.MouseEventHandler<HTMLButtonElement>;
  svg?: React.ReactNode;
}

const ButtonAction = ({text, callback, svg}: ButtonActionProps) => {
  return (
    <button className={styles.Action} onClick={callback}>
      {svg}
      <span>{text}</span>
    </button>
  )
}

export default ButtonAction; 