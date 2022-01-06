import HttpClient from '@winning-plugin/win-6.0-httpclient'
import { Message } from 'element-ui'
const isDev = process.env.NODE_ENV === 'development'

// 返回axios实例
const httpClient = new HttpClient({
  failAuth: () => {
    !isDev && (location.href = '/portal/login')
  },
  errorHandle: (msg) => {
    msg && Message.error(msg)
    // console.error(msg)
  }
}).request()

export default httpClient
