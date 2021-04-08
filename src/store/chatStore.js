import {makeAutoObservable, runInAction} from "mobx";
import {socket} from '../api/socket-config'
import {chatAPI} from "../api/chat-api";

class ChatStore {

  roomId = null
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
    runInAction(() => {
      this.isAuth = true
      this.userName = userName
      this.roomId = roomId
    })
  }

  setUsersList = (usersList) => {
    this.usersList = usersList
  }

  setMessagesList = (messagesList) => {
    this.messages = messagesList
  }

  sendMessage = (messageText) => {
    socket.emit('ROOM_NEW_MESSAGE', {
      roomId: this.roomId,
      userName: this.userName,
      text: messageText,
    })
  }
}


export default new ChatStore()
