
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const sequelize = require('./config/db-config')
const User = require('./models/usermodels')
const Task = require('./models/taskmodels')
const auth = require('./auth/authController')
const authroutes = require('./routes/authRoutes')
const taskroutes = require('./routes/taskRoutes')
const authmiddleware =  require('./middleware/authmiddleware')


app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));



//Routes
app.use('/auth',authroutes)
app.use('/tasks' ,taskroutes)


//middleware
app.use('/auth' ,authmiddleware)


sequelize.sync()
.then(() =>{
    console.log("Database connected")
})
.catch((err) =>{
  console.log("There is a issue in Database",err)
})

app.listen(8000 , () =>{
    console.log("listening to the port 8000")
})



module.exports = app