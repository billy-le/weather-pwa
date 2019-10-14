import path = require('path');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import CleanWebpackPlugin = require('clean-webpack-plugin');
import WorkboxPlugin = require('workbox-webpack-plugin');

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
        loader: ['style-loader', 'css-loader'],
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
    new CleanWebpackPlugin.CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Typescript React Webpack Boilerplate',
      template: './src/index.html',
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  node: {
    fs: 'empty',
  },
};
