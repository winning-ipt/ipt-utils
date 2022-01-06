let config = {
  'test': 'src/components/test-components/index.js'
}


function createPagesConfig (config) {
  let pageConfig = {}
  Object.keys(config).forEach(key=> {
    pageConfig[key] = config[key]
  })
  return {
    pages: pageConfig,
    outputDir: 'dist/lib',
    filenameHashing: false,
    configureWebpack: {
      optimization: {
        splitChunks: false
      }
    }
  }
}


module.exports = createPagesConfig(config)
