const config = {
  entry: {
    app: ['./lib/scrollanimate.js']
  },

  output: {
    filename: 'scrollanimate.js',
    path: './build/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel?presets[]=es2015', 'eslint-loader'],  
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = config