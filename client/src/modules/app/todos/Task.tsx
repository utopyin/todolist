import React, { useState, useRef, useEffect } from 'react';
import { Task as TaskType } from '../../todolist/useTodolistStore'
import styles from '../../../styles/app/Task.module.css'
import ButtonLogo from '../../ui/buttons/ButtonLogo'
import DeleteSVG from '../../../images/svg/pictos/Delete'
import EditSVG from '../../../images/svg/pictos/Edit'
import deleteMethod from '../../fetch/delete'
import { useError } from '../../error/useError'
import { useTodoStore } from '../../todolist/useTodolistStore'
import { Collapse } from 'react-collapse';
import Step from './Step'

interface TaskProps {
  data: TaskType;
}

export default function Task({data: {
  id: taskID,
  title,
  steps: stepsData
}}: TaskProps) {
  const { refetch } = useTodoStore()
  const { setMessage: setErrorMessage } = useError()
  const [active, setActive] = useState(false)
  const [steps, setSteps] = useState(stepsData)
  const defaultStep = {id: null, task_id: null, number: 1, completed: false, title: 'No step available'}
  let currentStep = steps.filter(step => step.completed == false)[0] ?? steps.filter(step => step.completed == true).slice(-1)[0] ?? defaultStep

  // useEffect(() => {
  //   currentStep =
  //     steps.filter(step => step.completed == false)[0] ??
  //     steps.filter(step => step.completed == true).slice(-1)[0] ??
  //     defaultStep
  // }, [steps])

  const deleteStep = (stepID: number) => {
    setSteps(oldSteps => oldSteps.filter(v => v.id != stepID))
  }

  const open = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return; 
    setActive(v => !v)
  }

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
    <div className={styles.TaskContainer} onClick={(e) => open(e)}>
      <div className={styles.Headtask} onClick={(e) => open(e)}>
        <div className={styles.Title}>
          <h3 onClick={(e) => open(e)}>{title}</h3>
          <p onClick={(e) => open(e)}><span>Current step:</span> {currentStep.title}</p>
          <Collapse isOpened={active}>
            <div className={styles.Openedtask}>
              {steps.map((step, index) => {
                return <Step index={index} key={step.id} step={step} deleteStep={deleteStep}/>
              })}
            </div>
          </Collapse>
        </div>
        <div className={styles.ButtonsContainer}>
          <ButtonLogo svg={<EditSVG />}/>
          <ButtonLogo callback={deleteTask} svg={<DeleteSVG />}/>
        </div>
      </div>
    </div>
  )
}