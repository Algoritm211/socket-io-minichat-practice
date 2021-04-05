const express = require('express')

const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: '*'}})
const PORT = 5000


app.use(express.json())
app.use('/rooms', (request, response) => {
  return response.status(200).json({message: 'ok'})
})

io.on('connection', (socket) => {
  console.log('socket connected', socket.id)
  socket.on('message', (message) => console.log(message))
})

const start = () => {
  try {

    server.listen(PORT, () => console.log('server was started'))
  } catch (error) {
    console.log(error)
  }
}


start()

