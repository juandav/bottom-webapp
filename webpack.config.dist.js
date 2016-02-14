var path = require("path");

module.exports = {
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  entry: path.join(__dirname, '/src/app.jsx'),
  output: {
    path: path.join(__dirname, "build-dist"),
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
  }
}
