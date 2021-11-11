import axios from 'axios'

export default axios.create({
  baseURL: 'http://127.0.0.1:3000/mdcin/',
  headers: {
    'Content-Type': 'application/json'
  }
})
