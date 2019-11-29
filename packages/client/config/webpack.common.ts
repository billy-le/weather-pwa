import path = require('path');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import CleanWebpackPlugin = require('clean-webpack-plugin');
import WorkboxPlugin = require('workbox-webpack-plugin');
import Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['ts-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new Dotenv({
      path: path.resolve('.env'),
    }),
    new CleanWebpackPlugin.CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Weather PWA',
      template: './src/index.html',
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
