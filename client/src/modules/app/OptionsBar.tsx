import React, { useState, useEffect } from 'react'
import styles from '../../styles/app/OptionsBar.module.css'
import TodosChoice from './TodosChoice'
import TagsChoice from './TagsChoice'
import Add from '../../images/svg/pictos/Add'
import ReactModal from 'react-modal'
import modalStyles from '../../styles/modal/Modal.module.css'
import Input from '../ui/form/Input'
import ButtonAction from '../ui/buttons/ButtonAction'

export default function OptionsBar() {
  const [modalDisplay, setModalDisplay] = useState(false)
  const [taskTitle, setTaskTitle] = useState("")
  const [taskStep1, setStep1] = useState("")
  const displayModal = () => setModalDisplay(oldState => !oldState)

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: 8,
      padding: "40px 40px 40px 40px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--grey-600)",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 530,
    }
  };


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
      <ReactModal
        ariaHideApp={false}
        style={customStyles}
        isOpen={modalDisplay}
        onRequestClose={displayModal}
      >
        <div className={modalStyles.Modal}>
          <h3>Add a task</h3>
          <div className={modalStyles.Fields}>
            <Input
              id="task-title-field"
              setTitle={setTaskTitle}
              placeholder="Wash the dishes..."
              label={{title: "Task title"}}
            />
            <Input
              id="task-step-1"
              setTitle={setStep1}
              placeholder="Wash the dishes..."
              label={{title: "First Step"}}
            />
          </div>
          <ButtonAction style={{marginTop: '10px'}} text="Add" callback={() => {}}/>
        </div>
      </ReactModal>
    </div>
  )
}
