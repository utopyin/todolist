import React from 'react';
import { Task as TaskType } from '../todolist/useTodolistStore'
import styles from '../../styles/app/Task.module.css'
import ButtonLogo from '../ui/buttons/ButtonLogo'
import DeleteSVG from '../../images/svg/pictos/Delete'
import EditSVG from '../../images/svg/pictos/Edit'

interface TaskProps {
  data: TaskType;
}

export default function Task({data: {
  title,
  steps
}}: TaskProps) {

  const defaultStep = {id: null, task_id: null, number: 1, completed: false, title: 'No step available'}
  const currentStep = steps.filter(step => step.completed == false)[0] ?? steps.filter(step => step.completed == true).slice(-1)[0] ?? defaultStep
  
  return (
    <div className={styles.Task}>
      <div className={styles.Title}>
        <h3>{title}</h3>
        <p><span>Current step:</span> {currentStep ? currentStep.title : ''}</p>
      </div>
      <div className={styles.ButtonsContainer}>
        <ButtonLogo svg={<EditSVG />}/>
        <ButtonLogo svg={<DeleteSVG />}/>
      </div>
    </div>
  )
}