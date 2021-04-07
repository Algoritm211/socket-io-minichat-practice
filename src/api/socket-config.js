import io from 'socket.io-client'
import chatStore from "../store/chatStore";

export const socket = io('http://localhost:5000')

//events
socket.on('ROOM_JOINED', (message) => {
  chatStore.setUsersList(message)
  console.log(message)
})
