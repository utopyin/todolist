import { useTodoStore } from '../todolist/useTodolistStore'
import styles from '../../styles/app/App.module.css'
import Loader from '../ui/loader/loading-circle'
import List from './List'

export default function App() {
  const { todos, error, isLoading } = useTodoStore()

  return (
    <div className={styles.App}>
      { isLoading ? <Loader />
        : todos ? <List tasks={todos.tasks}/>
          : error ? <p>{error}</p>
            : <p>An error occurred.</p>
      }
    </div>
  )
}