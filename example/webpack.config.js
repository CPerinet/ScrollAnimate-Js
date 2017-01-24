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
        loaders: ['babel?presets[]=es2015'],  
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
}

module.exports = config