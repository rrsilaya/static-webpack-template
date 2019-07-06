'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/../dist',
    filename: '[name].[chunkhash].js'
  },
  mode: 'production',
  module: {
    rules: [{
      oneOf: [
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader' },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'compressed'
              }
            }
          ]
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.png$/, /\.jpe?g$/],
          loader: require.resolve('url-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        },
        {
          exclude: [/\.js$/, /\.html$/, /\.json$/, /\.scss$/],
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      filename: 'index.html',
      template: './src/index.html',

      title: 'Webpack Config'
    }),
  ],
}
