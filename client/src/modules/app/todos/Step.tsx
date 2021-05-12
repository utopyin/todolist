import React, { useState } from 'react'
import { Step as StepType, useTodoStore } from '../../todolist/useTodolistStore'
import styles from '../../../styles/app/Step.module.css'
import { Clear } from '@material-ui/icons'
import patchMethod from '../../fetch/patch'
import deleteMethod from '../../fetch/delete'
import { useError } from '../../error/useError'

interface StepProps {
  step: StepType;
  deleteStep: (stepID: number) => void;
  key?: React.Key;
  index: number;
}

export default function Step({step, deleteStep, index}: StepProps) {
  const [completed, setCompleted] = useState(step.completed);
  const { setMessage: setErrorMessage } = useError()

  const handleToggle = async () => {
    try {
      const newStep = {
        ...step,
        completed: !completed
      }
      await patchMethod('/user/todolist/step', {
        step: newStep
      }, () => setCompleted(v => !v))
    } catch (err) {
      setErrorMessage(err.message ?? 'An error occurred')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteMethod(`/user/todolist/step/${step.id}`, () => deleteStep(step.id))
    } catch (err) {
      setErrorMessage(err.message ?? 'An error occurred')
    }
  }

  return (
    <div className={styles.Step}>
      <div
        onClick={handleToggle}
        className={styles.Radio}
        style={{backgroundColor: `${completed ? 'var(--orange)' : 'transparent'}`}}
      />
      <p onClick={handleToggle}>{step.title}</p>
      {index != 0 && <Clear onClick={handleDelete}/>}
    </div>
  )
}
