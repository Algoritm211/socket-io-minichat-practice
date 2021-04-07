import {makeAutoObservable} from "mobx";
import {socket} from '../api/socket-config'
import {chatAPI} from "../api/chat-api";

class ChatStore {

  userName = null
  usersList = []
  messages = []
  isAuth = false

  constructor() {
    makeAutoObservable(this)
  }

  login = async (roomId, userName) => {
    const data = await chatAPI.login(roomId, userName)
    socket.emit('ROOM_JOIN', {roomId, userName})
    this.isAuth = true
    this.userName = userName
  }

  setUsersList = (usersList) => {
    this.usersList = usersList
  }
}


export default new ChatStore()
