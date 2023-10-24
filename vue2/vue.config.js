const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false, //是否开启eslint
  productionSourceMap: false, // 关闭源码映射
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) //配置别名
  },
  configureWebpack: config => {
    return {
      // module: {
      //   rules: [
      //     {
      //       test: /\.js$/,
      //       exclude: /node_modules/,
      //       loader: path.resolve(__dirname, "./src/removeFixed.js")
      //     }
      //   ],
      // }
    }
  },
  devServer: { // 代理服务器，用于跨域转发
    open: false,
    host: "0.0.0.0",
    port: 9876,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "http://ashuai.work/api", //线上
        changeOrigin: false, // 虚拟的站点需要更管origin
        pathRewrite: {
          "/api": "" // 路径重写清空
        }
      }
    }
  }
}
