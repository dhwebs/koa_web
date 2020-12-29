// const path = require('path')
module.exports = {
  lintOnSave: false,
  publicPath: './',
  outputDir: 'dist',
  transpileDependencies: [],
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件
    extract: true
  }
}