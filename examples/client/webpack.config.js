/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.join(__dirname, 'src', 'index.jsx'),
  resolve: {
    alias: {
      'wolkenkit-react': path.resolve(__dirname, '..', '..'),

      // We need to make sure only one version of react is loaded
      // see https://reactjs.org/warnings/invalid-hook-call-warning.html
      react: path.resolve(__dirname, 'node_modules', 'react')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/env', '@babel/react' ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
