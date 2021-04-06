const express = require('express')
const cors = require("cors");

const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: '*'}})
const PORT = 5000

app.use(cors())
app.use(express.json())



const rooms = new Map()

app.post('/rooms', (request, response) => {
  const { roomId, userName } = request.body
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Map([
      ['users', new Map()],
      ['messages', []]
    ]))
  }

  return response.status(200).json([...rooms.values()])
})

io.on('connection', (socket) => {
  console.log('api connected', socket.id)
  socket.on('ROOM_JOIN', (message) => {
    console.log(message)
  })
  // socket.on('message', (message) => console.log(message))
})

const start = () => {
  try {
    server.listen(PORT, () => console.log('server was started'))
  } catch (error) {
    console.log(error)
  }
}


start()

