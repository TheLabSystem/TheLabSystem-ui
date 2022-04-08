import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_API,
  withCredentials: true,
  timeout: 20000
})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log('error', error)
    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response
    if (res.data.Code === 0) {
      return res.data
    }  else  {
      alert(res.data.Data.message)
      return Promise.reject(res.data.Data.message)
    }
  },
  error => {
    if (error.response && error.response.data.errors) {
      Message({
        message: error.response.data.errors[0].defaultMessage,
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      if (error.response && error.response.data.message) {
        Message({
          message: error.response.data.message,
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
    return Promise.reject(error)
  }
)

export default service
