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
        exclude: /node_modules/,
        loader: ['babel'],
        query: {
          presets: ['react', 'es2015']
        }
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
