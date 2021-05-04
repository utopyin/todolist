import React, { createContext, useContext, useState, useEffect} from 'react'
import { useQuery } from 'react-query'
import fetchTodos from './fetchTodos'
interface Props {
  children: React.ReactNode
}

export type Step = {
  id: number,
  task_id: number,
  title: string,
  number: number,
  completed: boolean
}

export type Task = {
  id: number,
  title: string,
  description: string,
  steps: Array<Step>
}
export interface Todos {
  id: number;
  tasks: Array<Task>;
}

const TodoContext = createContext<{
  todos: Todos | undefined;
  error: Error | null;
  isLoading: boolean;
}>({
  todos: undefined,
  error: null,
  isLoading: true,
})

export default function TodoProvider({children}: Props) {
  const { data: todos, error, isLoading } = useQuery<Todos, Error>(['todos'], fetchTodos)

  return (
    <TodoContext.Provider value={{todos, error, isLoading}}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoStore = () => useContext(TodoContext)
