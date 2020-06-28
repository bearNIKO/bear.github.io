const path = require("path")
const CompressionPlugin = require('compression-webpack-plugin') //gzip 压缩的插件
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; //要进行压缩的文件类型
function resolve(dir){
  return path.join(__dirname,dir)
}
module.exports = {
  devServer: {
    disableHostCheck: true
  },
  // 配置gzip 
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new CompressionPlugin({
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
  }
}