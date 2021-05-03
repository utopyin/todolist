import React from 'react';
import styles from '../../../styles/buttons/Action.module.css';

interface ButtonActionProps {
  text: string;
  callback: React.MouseEventHandler<HTMLButtonElement>;
  svg?: React.ReactNode;
  style?: {};
}

const ButtonAction = ({text, callback, svg, style}: ButtonActionProps) => {
  return (
    <button style={style} className={styles.Action} onClick={callback}>
      {svg}
      <span>{text}</span>
    </button>
  )
}

export default ButtonAction; 