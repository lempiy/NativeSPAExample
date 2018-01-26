'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var styleLintPlugin = require('stylelint-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

require('es6-promise').polyfill();

module.exports = {
  entry: ['babel-polyfill', './src/main.js'],

  output: {
    path: '../build',
    filename: 'js/index.js'
  },

  plugins: [
    // Specify the resulting CSS filename
    new ExtractTextPlugin('css/styles.css'),
    new CopyWebpackPlugin([
        {
          from: 'assets',
          to: 'assets'
        }
    ])
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!postcss!sass-loader?outputStyle=expanded'
        )
      },
      {
        test: /\.css$/, 
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(svg|ttf|otf|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },

//   devServer: {
//     proxy: {
//       '/register': {
//           target: {
//               host: "regist_service",
//               protocol: 'http:',
//               port: 8000
//           },
//           secure: false,
//       },
//       '/login':  {
//           target: {
//               host: "login_service",
//               protocol: 'http:',
//               port: 5000
//           },
//           secure: false,
//       },
//     }
//   },

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],

  stats: {
    // Colored output
    colors: true
  },

  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};
