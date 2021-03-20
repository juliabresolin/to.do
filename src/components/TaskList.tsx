import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) {
      showError('Task title is required!')
      return
    }

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');

  }

  function showError(message: string) {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 2500)
  }

  function handleToggleTaskCompletion(id: number) {
    const taskIndex = tasks.findIndex(task => task.id === id);

    tasks[taskIndex].isComplete = !tasks[taskIndex].isComplete;
    setTasks(tasks => [...tasks]);

  }

  function handleRemoveTask(id: number) {
    const taskIndex = tasks.findIndex(task => task.id === id);

    tasks.splice(taskIndex, 1);
    setTasks(tasks => [...tasks]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>

          {error.length > 0 && <span>{error}</span>}
        </div>

      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}