import { useEffect, useReducer, useState } from 'react';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'EDIT_TODO'; payload: { id: number; task: string } }
  | { type: 'MARK_ALL_COMPLETED' }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'INITIALIZE_TODOS'; payload: Todo[] };

const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, task: action.payload.task } : todo
      );
    case 'MARK_ALL_COMPLETED':
      return state.map(todo => ({ ...todo, completed: true }));
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    case 'INITIALIZE_TODOS':
      return action.payload;
    default:
      return state;
  }
};

const TodoList = () => {
  const [taskInput, setTaskInput] = useState<string>('');
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
    if (storedTodos.length > 0) {
      dispatch({ type: 'INITIALIZE_TODOS', payload: storedTodos });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (taskInput.trim() !== '') {
      dispatch({
        type: 'ADD_TODO',
        payload: { id: Date.now(), task: taskInput, completed: false }
      });
      setTaskInput('');
    }
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const removeTodo = (id: number) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  const editTodo = (id: number, newTask: string) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, task: newTask } });
  };

  const markAllCompleted = () => {
    dispatch({ type: 'MARK_ALL_COMPLETED' });
  };

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };
  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#1e3352', // Dark blue background color
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      color: '#fff', // White text color
    }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem', fontWeight: 'bold' }}>To-Do List</h1>
      <div style={{ marginBottom: '1rem', display: 'flex' }}>
        <input
          type="text"
          value={taskInput}
          onChange={e => setTaskInput(e.target.value)}
          placeholder="Enter task"
          style={{
            width: 'calc(100% - 100px)',
            border: '1px solid #fff', 
            borderRadius: '5px 0 0 5px',
            padding: '0.5rem',
            fontSize: '1rem',
            backgroundColor: '#2c4f6d',
            color: '#fff', 
          }}
        />
        <button onClick={addTodo} style={{
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '0 5px 5px 0',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
        }}>
          Add Task
        </button>
      </div>
      <ul style={{ padding: '0', listStyleType: 'none' }}>
        {todos.map(todo => (
          <li key={todo.id} style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #fff', 
            padding: '0.5rem 0',
          }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{ marginRight: '1rem' }}
            />
            <span style={{
              flex: '1',
              fontSize: '1rem',
              ...(todo.completed && { textDecoration: 'line-through', color: '#ccc' }),
            }}
              onClick={() => editTodo(todo.id, prompt('Edit task:', todo.task) || todo.task)}>
              {todo.task}
            </span>
            <button onClick={() => removeTodo(todo.id)} style={{
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={markAllCompleted} style={{
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}>
          Mark All Completed
        </button>
        <button onClick={clearCompleted} style={{
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}>
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
