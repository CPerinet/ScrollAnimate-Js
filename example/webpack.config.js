var StyleLintPlugin = require('stylelint-webpack-plugin');

const config = {
  entry: {
    app: ['./src/index.js']
  },

  output: {
    filename: 'bundle.js',
    path: './static'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        
          loaders: ['babel?presets[]=es2015', 'eslint-loader'],  
        
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"}
    ]
  },

  plugins: [
    new StyleLintPlugin()
  ]
}

module.exports = config