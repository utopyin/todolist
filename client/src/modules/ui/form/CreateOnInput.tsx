import React, { useEffect, useState } from 'react'
import styles from '../../../styles/form/Input.module.css'
import Delete from '../../../images/svg/pictos/Delete'

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

type FieldType = {
  value: string,
  id: number,
}

type ButtonType = {
  text: string,
  id: string | number
}

interface InputProps {
  button: ButtonType;
  id: string;
  style?: StyleInterface;
  placeholder?: Array<string>;
  label: LabelInterface;
  fields: Array<FieldType>;
  setFields: (callback: (oldFields: Array<FieldType>) => Array<FieldType>) => void;
}

export default function Input({setFields, fields, style, placeholder = [""], label, id, button}: InputProps) {

  const handleAddField = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setFields(oldFields => {
      const lastID = oldFields.slice(-1)[0].id
      return [...oldFields, {id: lastID + 1, value: ''}]
    })
  }

  const handleDelete = (fieldID: number) => {
    setFields(oldFields => {
      return oldFields.filter(field => field.id != fieldID)
    })
  }

  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>, eventID: number) => {
    const value = event.target.value

    setFields((oldFields) => {
      return oldFields.map((field) => {
        if (eventID == field.id)
          return {value, id: eventID}
        
        return field
      })
    })
  }

  return (
    <div style={style} className={styles.Input}>
      <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <label className={styles.Label} style={label.style}>
          {label.title}
        </label>
        <button
          className={styles.AddField}
          id={button.id.toString()}
          onClick={event => handleAddField(event)}>
          {button.text}
        </button>
      </div>
      {fields.map(({id: fieldID}) => 
        <div key={fieldID} className={styles.FieldContainer}>
          <input
            className={styles.Field}
            type="text" placeholder={placeholder[Math.floor(fieldID % placeholder.length)]}
            id={`${id}-${fieldID}`}
            onChange={event => handleUpdate(event, fieldID)}
          />
          {fieldID > 1 &&
          <Delete onClick={() => handleDelete(fieldID)}/>}
        </div>
      )}
    </div>
  )
}
