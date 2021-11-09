import axios from 'axios'

export default axios.create({
  baseURL: 'https://httpbin.org/',
  headers: {
    'Content-Type': 'application/json'
  }
})
