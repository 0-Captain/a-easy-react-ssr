const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

module.exports = webpackMerge(baseConfig, {
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  externals: Object.keys(require('../package.json').dependencies),
  // if don't set externals,all packages(includes react,mobx etc) which in node_modules will be bundle to server.bundle.js by webpack. It will lead to that server.bundle.js very big. Because the environment is node,all the packages will be use by 'require'
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '',
    libraryTarget: 'commonjs2'
  },
  mode: 'development'
})
