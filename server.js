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
  console.log('user connected', socket.id)

  socket.on('ROOM_JOIN', ({roomId, userName}) => {
    socket.join(roomId)
    const room = rooms.get(roomId)
    room.get('users').set(socket.id, userName)
    const users = [...rooms.get(roomId).get('users').values()]
    const messages = [...room.get('messages')]
    io.in(roomId).emit('ROOM_SEND_USERS', users)
    io.in(roomId).emit('ROOM_MESSAGES', messages)
  })

  socket.on('ROOM_NEW_MESSAGE', ({roomId, userName, text}) => {
    const room = rooms.get(roomId)
    room.get('messages').push({roomId, userName, text})
    const messages = [...room.get('messages')]
    io.in(roomId).emit('ROOM_MESSAGES', messages)
  })

  socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...rooms.get(roomId).get('users').values()]
        io.in(roomId).emit('ROOM_SEND_USERS', users)
      }
    })
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

