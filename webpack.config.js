const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const historyApiFallback = require('connect-history-api-fallback')

module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: 'public',
        middleware: [historyApiFallback()]
      },
      files: 'public/**'
    })
  ]
}
