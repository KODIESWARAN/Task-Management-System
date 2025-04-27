const Task = require('../models/taskmodels');

// Create Task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority, category } = req.body;

  if (!title || !description || !priority || !category) {
    return res.status(400).json({ message: "All fields (title, description, priority, category) are required" });
  }

  try {
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      priority,
      category,
      completed: false,  
      userId: req.userId
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating task", error: error.message });
  }
};

// Get All Tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.userId } });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching tasks", error: error.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, category, completed } = req.body;

  if (!title || !description || !priority || !category) {
    return res.status(400).json({ message: "All fields (title, description, priority, category) are required" });
  }

  try {
    const task = await Task.findByPk(id);
    if (!task || task.userId !== req.userId) {
      return res.status(403).json({ message: "You do not have permission to update this task" });
    }

    await task.update({ title, description, dueDate, priority, category, completed });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task", error: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task || task.userId !== req.userId) {
      return res.status(403).json({ message: "You do not have permission to delete this task" });
    }

    await task.destroy();
    res.status(204).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};
