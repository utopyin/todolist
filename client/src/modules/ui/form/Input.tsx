import React from 'react'
import styles from '../../../styles/form/Input.module.css'

interface StyleInterface {
  backgroundColor?: string;
  color?: string;
  border?: string;
  width?: string;
  padding?: string;
  marginBottom?: string;
  marginTop?: string;
  marginRight?: string;
  marginLeft?: string;
}

interface LabelInterface {
  title: string;
  style?: StyleInterface;
}

interface InputProps {
  id: string;
  setTitle: React.Dispatch<string>;
  style?: StyleInterface;
  placeholder?: string;
  label?: LabelInterface;
}

export default function Input({setTitle, style, placeholder = "", label, id}: InputProps) {

  return (
    <div style={style} className={styles.Input}>
      {label && <label htmlFor={id} className={styles.Label} style={label.style}>{label.title}</label>}
      <input type="text" id={id} onChange={v => setTitle(v.target.value)} placeholder={placeholder}></input>
    </div>
  )
}
