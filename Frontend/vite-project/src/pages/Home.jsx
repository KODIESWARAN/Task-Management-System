import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const response = await axios.get('http://localhost:8000/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(response.data);
        } else {
            alert('No token found, please login.');
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found, please login.');
      history.push('/login');
      return;
    }

    await axios.delete(`http://localhost:8000/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
    alert('Error deleting task.');
  }
};

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Task List</h2>
        <Link to="/create" className="btn btn-primary">
          Create Task
        </Link>
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.category}</td>
                <td>{task.priority}</td>
                <td>{task.dueDate}</td>
                <td>{task.completed ? "Yes" : "No"}</td>
                <td>
                  <Link to={`/update/${task.id}`} className="btn btn-warning btn-sm me-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(task.id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No tasks found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
