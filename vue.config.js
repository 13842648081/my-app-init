const HtmlWebpackPlugin = require('html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  devServer: {
    // port: 80,
    disableHostCheck: true
  },
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.devtool = false
      config.plugins.push(
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'public/index.html',
          inject: true,
          hash: true
        })
      )
      // config.plugins.push(
      //   new BundleAnalyzerPlugin()
      // )
    }
  }
}
