import React, { useState, useEffect } from 'react'
import styles from '../../styles/app/OptionsBar.module.css'
import TodosChoice from './TodosChoice'
import TagsChoice from './TagsChoice'
import Add from '../../images/svg/pictos/Add'
import Input from '../ui/form/Input'
import CreateOnInput from '../ui/form/CreateOnInput'
import ButtonAction from '../ui/buttons/ButtonAction'
import modalStyles from '../../styles/modal/Modal.module.css'
import ModalTemplate from '../modal/ModalTemplate'
import { useTodoStore } from '../todolist/useTodolistStore'
import post from '../fetch/post'

export default function OptionsBar() {
  const [isModalDisplayed, setModalDisplay] = useState(false)
  const [taskTitle, setTaskTitle] = useState("")
  const [stepFields, setStepFields] = useState([{id: 1, value: ''}])
  const { refetch } = useTodoStore()
  const displayModal = () => setModalDisplay(oldState => !oldState)

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
      <ModalTemplate displayModal={displayModal} isDisplayed={isModalDisplayed}>
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
              await post('/user/todolist/task', {task: {title: taskTitle, steps: stepFields}})
              displayModal();
              refetch();
            } catch (err) {}
          }}/>
      </div>
      </ModalTemplate>
    </div>
  )
}
