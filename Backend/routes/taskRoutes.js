const express = require('express')
const router = express.Router()
const authenticationJWT = require('../middleware/authmiddleware')
const taskcontrollers = require('../controllers/taskControllers')

router.post('/',authenticationJWT ,taskcontrollers.createTask )
router.get('/' , authenticationJWT, taskcontrollers.getAllTasks)
router.put('/:id' , authenticationJWT, taskcontrollers.updateTask )
router.delete('/:id' ,authenticationJWT ,taskcontrollers.deleteTask)



module.exports = router