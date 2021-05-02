import React from 'react'
import styles from '../../styles/app/OptionsBar.module.css'

export default function TagsChoice() {
  return (
    <div className={styles.Tags}>
      <span>TAGS</span>
      <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="2.00524" height="8" rx="1.00262" transform="matrix(0.742103 -0.670286 0.742103 0.670286 0 1.53764)" fill="#15181D"/>
        <rect width="2.00524" height="8" rx="1.00262" transform="matrix(0.742103 0.670286 -0.742103 0.670286 10.4849 0.193558)" fill="#15181D"/>
      </svg>
    </div>
  )
}
