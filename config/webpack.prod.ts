import merge = require('webpack-merge');
import common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
});
