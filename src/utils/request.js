import axios from 'axios'
import store from '@/store'
import { getToken } from './auth'
// import { reqPath } from './path'
console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_API)
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  request => {
    // 如果有token
    // console.log(this.$store)
    // if (this.$store.state.token) {
    //   request.headers.Authorization = `Bearer ${getToken()}`
    // }
    if (store.getters.token) {
      request.headers.Authorization = `Bearer ${getToken()}`
    }
    return request
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status !== 200) {
      return Promise.reject(new Error(res.msg || '网路丢失了'))
    } else {
      return res
    }
}, error => {
    return Promise.reject(error)
  })

export default service
