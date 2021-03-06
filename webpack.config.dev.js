var path = require("path");
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  devtool: 'eval',
  cache: true,
  context: __dirname,
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app.jsx')
  ],
  output: {
    path: path.join(__dirname, "build-dev"),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules\/(?!(stardust))/,
        loader: ['babel'],
        query: {
          cacheDirectory: true,
          plugins: [
            'transform-runtime',
            'add-module-exports',
            'transform-decorators-legacy',
          ],
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new LiveReloadPlugin()
  ]
};
