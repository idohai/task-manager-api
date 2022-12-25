const express = require('express')
require('./db/mongoose') //make mongoose.js file to run -> connect to server
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app