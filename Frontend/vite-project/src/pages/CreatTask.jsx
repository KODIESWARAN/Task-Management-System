import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTask = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    category: 'Personal',
    completed: false,
  });
  
  const navigate = useNavigate();

  // Handle input changes for task fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle task creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is logged in by checking the presence of a token
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to create a task!');
      return;  // Exit the function early if not logged in
    }

    try {
      await axios.post('http://localhost:8000/tasks', task, {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in headers if logged in
        },
      });
      navigate('/');  // Redirect to home after task is created
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  return (
    <div className="container mb-5">
      <h2 className="mb-4">Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={task.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="priority" className="form-label">Priority</label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            name="category"
            value={task.category}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
          </select>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={task.completed}
            onChange={handleChange}
            className="form-check-input"
          />
          <label htmlFor="completed" className="form-check-label">Completed</label>
        </div>

        <button type="submit" className="btn btn-primary w-100">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
