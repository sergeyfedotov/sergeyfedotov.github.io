var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
require('babel-polyfill');

module.exports = {
  entry: './app',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /languages\/(?!bash|cpp|css|html|javascript|lua|php|twig|xml)/,
      __dirname + '/nolang.js'
    ),
    new webpack.optimize.UglifyJsPlugin({}),
    new ExtractTextPlugin('bundle.css')
  ]
};
