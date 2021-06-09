import axios from 'axios'

import { Toast } from 'antd-mobile'
import { getToken } from './index'
import { host } from './config'

const request = axios.create({
  baseURL: `${host}api/tiny-shop/v1`,
  timeout: 10000
})

request.interceptors.request.use(config => {
  config.headers['x-api-key'] = getToken()
  return config
}, err => {
  return Promise.reject(err)
})

request.interceptors.response.use(res => {
  if(res.data.code === 401){
    Toast.fail(res.data.message)
    // router.push('/login')
  }
  if(res.data.code === 200){
    return res.data
  }else{
    Toast.fail(res.data.message)
    return Promise.reject(res.data.message)
  }
},err => {
  return Promise.reject(err)
})

export default request