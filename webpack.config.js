const config = {
  entry: {
    app: ['./lib/scrollAnimate.js']
  },

  output: {
    filename: 'scrollAnimate.js',
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