import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createApp } from '@winning-plugin/win-ipt-qiankun-utils'
const isDev = process.env.NODE_ENV === 'development'

Vue.config.productionTip = false

if (isDev) {
  // token错误时，删除网站cookie 刷新重新获取
  import('@winning-plugin/portal-login-plugin').then(WinLogin => {
    const Login = WinLogin.default
    new Login({
      username: 'L10044',
      password: '456',
      version: '2'
    })
  })
}

/**
 * 子应用模板 对接时提供 域名/组件名?props=xx
 * eg: webui-order/card?name=go
 */
const {
  mount,
  bootstrap,
  unmount
} = createApp(
  {
    Vue,
    router,
    App
  },
  { cache: false }, // 是否缓存
  // (修改App.vue isDev模拟用，非必填)
  {
    componentName: 'index', // 路由name
    data: {
      single: true // 组件props
    }
  })
export {
  mount,
  unmount,
  bootstrap
}
