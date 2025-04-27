const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');
const User = require('./usermodels');

const Task = sequelize.define('Task', {
  id : {
    type :DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement :true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
  },
  priority: {
    type: DataTypes.ENUM('High', 'Medium', 'Low'),
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('Personal', 'Work', 'Study'),
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId : {
    type :DataTypes.INTEGER,
    allowNull:false
  }
});

// Establish associations
User.hasMany(Task , {foreignKey : 'userId'});
Task.belongsTo(User, {foreignKey : 'userId'});

module.exports = Task;
