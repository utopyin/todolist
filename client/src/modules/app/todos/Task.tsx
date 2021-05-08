import React from 'react';
import { Task as TaskType } from '../../todolist/useTodolistStore'
import styles from '../../../styles/app/Task.module.css'
import ButtonLogo from '../../ui/buttons/ButtonLogo'
import DeleteSVG from '../../../images/svg/pictos/Delete'
import EditSVG from '../../../images/svg/pictos/Edit'
import deleteMethod from '../../fetch/delete'
import { useError } from '../../error/useError'
import { useTodoStore } from '../../todolist/useTodolistStore'

interface TaskProps {
  data: TaskType;
}

export default function Task({data: {
  id: taskID,
  title,
  steps
}}: TaskProps) {

  const { refetch } = useTodoStore()
  const { setMessage: setErrorMessage } = useError()
  const defaultStep = {id: null, task_id: null, number: 1, completed: false, title: 'No step available'}
  const currentStep = steps.filter(step => step.completed == false)[0] ?? steps.filter(step => step.completed == true).slice(-1)[0] ?? defaultStep

  const deleteTask = async () => {
    if (!taskID) return
    try {
      await deleteMethod(`/user/todolist/task/${taskID}`, refetch)
    } catch (err) {
      setErrorMessage(err.message)
      return
    }
  }

  return (
    <div className={styles.Task}>
      <div className={styles.Title}>
        <h3>{title}</h3>
        <p><span>Current step:</span> {currentStep.title}</p>
      </div>
      <div className={styles.ButtonsContainer}>
        <ButtonLogo svg={<EditSVG />}/>
        <ButtonLogo callback={deleteTask} svg={<DeleteSVG />}/>
      </div>
    </div>
  )
}