const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/' // set CDN address
  },
  mode: 'development',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules/')
        ]
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ]
})

if (isDev) {
  // 热加载需要吧一部分js代码注入到页面代码中，这部分js代码就在'react-hot-loader/patch'里面
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }// 热更新需要配置这里
  config.devServer = {// 将打包编译的东西放在内存中而不是直接放在硬盘
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname, '../dist'), // 基础路径
    publicPath: '/public/',
    hot: true, // 热加载
    historyApiFallback: {
      index: '/public/index.html'
    },
    overlay: {// 开发过程中有报错信息会显示在网页上
      errors: true // errors：true就是只显示errors信息，warning之类的不显示
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
