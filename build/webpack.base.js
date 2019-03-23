const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
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
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules/')
        ]
      },
      {
        test: /.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ],
        exclude: [
          path.join(__dirname, '../node_modules/')
        ]
      }
    ]
  }
}
