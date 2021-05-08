import React, { useState, useEffect } from 'react'
import styles from '../../../styles/app/OptionsBar.module.css'
import TodosChoice from './TodosChoice'
import TagsChoice from './TagsChoice'
import Add from '../../../images/svg/pictos/Add'
import Input from '../../ui/form/Input'
import CreateOnInput from '../../ui/form/CreateOnInput'
import ButtonAction from '../../ui/buttons/ButtonAction'
import modalStyles from '../../../styles/modal/Modal.module.css'
import ModalTemplate from '../../modal/ModalTemplate'
import { useTodoStore } from '../../todolist/useTodolistStore'
import postMethod from '../../fetch/post'
import { useError } from '../../error/useError'

const defaultStepFields =  [{id: 1, value: ''}]

export default function OptionsBar() {
  const [isModalDisplayed, setModalDisplay] = useState(false)
  const [taskTitle, setTaskTitle] = useState("")
  const [stepFields, setStepFields] = useState(defaultStepFields)
  const { refetch } = useTodoStore()
  const displayModal = () => setModalDisplay(oldState => !oldState)
  const { setMessage: setErrorMessage } = useError()

  const checkFields = (fields: Array<{id: number; value: string;}>) => {
    return (!!fields.filter(({value}) => value == '' || value.length == 0 || !value).length)
  }

  return (
    <div className={styles.Bar}>
      <div className={styles.Selectors}>
        <TodosChoice />
        <TagsChoice />
      </div>
      <button onClick={displayModal} className={styles.Add}>
        <span>ADD</span>
        <Add />
      </button>
      <ModalTemplate
        claims={{
          onRequestClose: () => {
            displayModal()
            setStepFields(defaultStepFields)
          }
        }}
        displayModal={displayModal}
        isDisplayed={isModalDisplayed}>
        <div className={modalStyles.Modal}>
          <h3>Add a task</h3>
          <div className={modalStyles.Fields}>
            <Input
              id="task-title-field"
              setTitle={setTaskTitle}
              placeholder="Finish clearing the table"
              label={{title: "Task title"}}
            />
            <CreateOnInput
              id="task-step"
              fields={stepFields}
              setFields={setStepFields}
              placeholder={["Wash the plate", "Clean the table", "Distributes the cutlery", "Put away the napkins", "Clear the dishwasher"]}
              label={{title: "Steps"}}
              button={{text: '+ Add step', id: 'add-step'}}
            />
          </div>
          <ButtonAction 
            style={{marginTop: '10px'}} text="Add"
            callback={async () => {
              try {
                if (taskTitle == '' || checkFields(stepFields)) throw {message: 'Fields are incomplete'}
                await postMethod('/user/todolist/task', {task: {title: taskTitle, steps: stepFields}}, refetch)
                setErrorMessage(null);
                displayModal();
                setStepFields(defaultStepFields);
              } catch (err) { setErrorMessage(err.message) }
            }}/>
        </div>
      </ModalTemplate>
    </div>
  )
}
