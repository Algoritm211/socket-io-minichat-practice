import axios from 'axios'

const instanceAxios = axios.create({
  baseURL: 'http://localhost:5000/'
})


export const chatAPI = {
  login: (roomId, userName) => {
    return instanceAxios.post('/rooms', {roomId, userName})
      .then(data => data.data)
  }
}
