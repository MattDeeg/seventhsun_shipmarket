module.exports = {
  node: {
    fs: 'empty'
  },
  module: {
    loaders: [
      {
        test: /pixi\.js\\src\\filters\\.*\.js$/,
        loader: 'transform?brfs'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
