import {makeAutoObservable} from "mobx";
import {socket} from '../api/socket-config'
import {chatAPI} from "../api/chat-api";

class ChatStore {

  userName = null
  roomId = null
  messages = []
  isAuth = false

  constructor() {
    makeAutoObservable(this)
  }

  login = async (roomId, userName) => {
    const data = await chatAPI.login(roomId, userName)
    console.log(data)
    socket.emit('ROOM_JOIN', roomId)
    this.isAuth = true
    this.userName = userName
  }
}


export default new ChatStore()