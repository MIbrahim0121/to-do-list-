import React, { useState } from 'react';

const App = () => {
  // State to hold the list of tasks
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Handler to add a new task
  const addTask = (e) => {
    e.preventDefault(); // Prevent form submission
    if (inputValue.trim() === '') return; // Prevent adding empty tasks
    const newTask = {
      id: Date.now(), // Unique id based on timestamp
      text: inputValue,
      completed: false,
    };
    setTasks([...tasks, newTask]); // Add the new task to the list
    setInputValue(''); // Clear the input field
  };

  // Handler to remove a task
  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id)); // Remove the task by id
  };

  // Handler to mark a task as completed
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    )); // Toggle the completed state
  };

  // Calculate the number of completed and remaining tasks
  const completedTasks = tasks.filter(task => task.completed).length;
  const remainingTasks = tasks.length - completedTasks;

  return (
    <div>
      <h1>To-Do List</h1>
      
      <form onSubmit={addTask}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Add a new task" 
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Display the number of tasks completed and left */}
      <div style={{ marginTop: '20px' }}>
        <p><strong>Tasks Done:</strong> {completedTasks}</p>
        <p><strong>Tasks Left:</strong> {remainingTasks}</p>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => toggleComplete(task.id)} 
              style={{ marginRight: '10px' }} 
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)} style={{ marginLeft: '10px' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
