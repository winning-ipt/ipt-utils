const fileListPugin = require('@winning-plugin/webpack-filelist-export')
const compressionWebpackPlugin = require('compression-webpack-plugin')

const isLibMode = process.env.MODE === 'lib'

const path = require('path')
const pkg = require('./package.json')
const isDev = process.env.NODE_ENV === 'development'
const options = {
  jsExternals: [
    '/web-public/js/vue.min.js',
    '/web-public/js/vue-router.min.js',
    '/web-public/js/vuex.min.js',
    '/web-public/js/element-ui.js',
    '/web-public/winex/@winning-plugin/win-6.0-httpclient/httpClient.umd.min.js', // 请求组件
    '/web-public/common-material/index.js', // 公共组件
    '/web-public/icons/base.js', // 图标组件
    '/web-public/icons/multi.js', // 图标组件
  ],
  cssExternals: [
    '/web-public/base-ui/index.css', // 饿了么重置
    '/web-public/common-material/index.css' // 公共组件样式
  ]
}

let config = {
  publicPath: './',
  chainWebpack (config) {
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'element-ui': 'ELEMENT',
      '@winning-plugin/win-6.0-httpclient': 'httpClient'
    })
    config.plugin('filePlugin').after('html').use(fileListPugin, [options])
    !isDev && config.plugin('compressionPlugin').use(new compressionWebpackPlugin())
  },
  configureWebpack: {
    // 乾坤需要打出umd的包
    output: {
      library: pkg.name,
      libraryTarget: 'umd',
      jsonpFunction: `webpack-${pkg.name}`
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.join(__dirname, 'src'),
      }
    },
  },
  devServer: {
    headers: {
      'Access-control-Allow-Origin': '*'
    },
    proxy: {
      'api': {
        target: 'http://172.16.7.59/',
        changeOrigin: true
      },
      'web-public': {
        target: 'http://172.16.7.59/',
        changeOrign: true
      },
    }
  }
}

if (isLibMode) {
  const libConfig = require('./libConfig')
  Object.assign(config, libConfig)
}

module.exports = config
