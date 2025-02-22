import React, { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const remainingTasks = tasks.length - completedTasks;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>To-Do List</h1>
      
      <form onSubmit={addTask} style={styles.form}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Add a new task" 
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>Add Task</button>
      </form>

      <div style={styles.taskStats}>
        <p style={styles.statText}><strong>Tasks Done:</strong> {completedTasks}</p>
        <p style={styles.statText}><strong>Tasks Left:</strong> {remainingTasks}</p>
      </div>

      <ul style={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.taskItem}>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => toggleComplete(task.id)} 
              style={styles.checkbox}
            />
            <span style={{ ...styles.taskText, textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)} style={styles.removeButton}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

// Styling
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginRight: '10px',
    outline: 'none',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  taskStats: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  statText: {
    fontSize: '14px',
    color: '#555',
  },
  taskList: {
    listStyle: 'none',
    padding: '0',
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  checkbox: {
    marginRight: '10px',
    cursor: 'pointer',
  },
  taskText: {
    flex: '1',
    fontSize: '16px',
    color: '#333',
  },
  removeButton: {
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};