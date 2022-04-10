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
      // console.log(res);
      if (res.hasOwnProperty('error')) {
        alert(res.error)
        return Promise.reject(res.error)
      } else if (res.hasOwnProperty('data')) {
        if (res.data.hasOwnProperty('error')) {
          alert(res.data.error)
          return Promise.reject(res.data.error)
        } else {
          alert(res.data.message)
          return Promise.reject(res.data.message)
        }
      } else {
        alert("出错啦qwq")
        return Promise.reject(res)
      }
    }
  },
  error => {
    alert(error)
    return Promise.reject(error)
  }
)

export default service
