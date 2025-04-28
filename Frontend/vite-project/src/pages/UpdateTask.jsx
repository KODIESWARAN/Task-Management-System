import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    category: "Personal",
    completed: false,
  });
  const { id } = useParams(); 
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/tasks/${id}`);
        setTask(response.data); 
      } catch (error) {
        console.error("Error fetching task details", error);
      }
    };

    fetchTask();
  }, [id]); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); 
    if (!token) {
      console.log("No token found, please login.");
      navigate("/login"); 
      return;
    }

    try {
      await axios.put(
        `http://localhost:8000/tasks/${id}`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <div className="container mb-5">
      <h2 className="mb-4">Update Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
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
          <label htmlFor="description" className="form-label">
            Description
          </label>
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
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
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
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
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
          <label htmlFor="category" className="form-label">
            Category
          </label>
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
          <label htmlFor="completed" className="form-check-label">
            Completed
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
