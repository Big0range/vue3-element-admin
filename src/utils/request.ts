import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

import { TIME_OUT } from './config'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: Number(TIME_OUT)
})

instance.interceptors.request.use(
  (config) => {
    // 1.发送网络请求时, 在界面的中间位置显示Loading的组件

    // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面

    // 加token
    window.localStorage.getItem('CMS_TOKEN')
      ? (config.headers.Authorization = window.localStorage.getItem('CMS_TOKEN'))
      : ''
    return config
  },
  (err) => {
    console.log('request error:', err)
  }
)

instance.interceptors.response.use(
  // 响应成功处理方式
  (res) => {
    // return res.data
    return res
  },
  // 响应失败处理方式
  (err) => {
    return Promise.reject(err.message)
  }
)

export function request<T>(config: AxiosRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    instance(config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
