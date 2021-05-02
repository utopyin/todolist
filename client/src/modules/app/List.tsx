import React from 'react';
import { Task as TaskType } from '../todolist/useTodolistStore'
import Task from './Task'
import OptionsBar from './OptionsBar'
import styles from '../../styles/app/List.module.css'

interface ListProps {
  tasks: Array<TaskType>;
}

export default function List({ tasks }: ListProps) {

  const TasksList = () => <>{tasks.map(task => <Task key={task.id} data={task}/>)}</>

  return (
    <div className={styles.List}>
      <OptionsBar />
      <TasksList />
    </div>
  )
}