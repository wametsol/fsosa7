const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')



app.use('/api/blogs', blogsRouter)
app.use('/', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(cors())
app.use(bodyParser.json())

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log('connected to DB', config.mongoUrl);
    
  })
  .catch( error => {
    console.log(error);
    
  })
mongoose.Promise = global.Promise

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
  
})
server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}

