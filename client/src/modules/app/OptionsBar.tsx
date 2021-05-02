import React from 'react'
import styles from '../../styles/app/OptionsBar.module.css'
import TodosChoice from './TodosChoice'
import TagsChoice from './TagsChoice'
import Add from '../../images/svg/pictos/Add'

export default function OptionsBar() {
  return (
    <div className={styles.Bar}>
      <div className={styles.Selectors}>
        <TodosChoice />
        <TagsChoice />
      </div>
      <button className={styles.Add}>
        <span>ADD</span>
        <Add />
      </button>
    </div>
  )
}
