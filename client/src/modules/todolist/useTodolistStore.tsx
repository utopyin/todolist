import React, { createContext, useContext, useState, useEffect} from 'react'
import { useAuth } from '../auth/useAuthStore'
import fetchTodos from './fetchTodos'

interface Props {
  children: React.ReactNode
}

type Step = {}

export type Task = {
  id: number,
  title: string,
  description: string,
  steps: Array<Step>
}

const TodoContext = createContext<{
  todos: Array<Task>;
  updateTask: (taskID: number, task: Task) => void;
}>({
  todos: [],
  updateTask: () => {}
})

export default function TodoProvider({children}: Props) {
  const [todos, setTodos] = useState<Array<Task>>([]);
  const { user: { id } } = useAuth();

  const updateTask = (taskID: number, task: Task) => {
    setTodos(oldTodos => {
      return oldTodos.map<Task>(v => {
        if (v.id == taskID) return task
        return v
      })
    })
  }

  // useEffect(() => {
  //   if (id) fetchTodos(id, setTodos)
  //     .catch(err => console.table(err))
  // }, [id])

  // useEffect(() => {
  //   console.table(todos)
  // }, [todos])

  return (
    <TodoContext.Provider value={{todos, updateTask}}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoStore = () => useContext(TodoContext)
