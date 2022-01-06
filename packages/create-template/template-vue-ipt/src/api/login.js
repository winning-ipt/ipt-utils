import HttpClient from './index'
import * as urls from './url-constants'

export function login (params) {
  return HttpClient.post(urls.PORTAL_LOGIN, params)
}
