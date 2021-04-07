import io from 'socket.io-client'

export const socket = io('http://localhost:5000')

socket.on('ROOM_JOINED', (message) => {
  console.log(message)
})

//TODO move events to separate file
