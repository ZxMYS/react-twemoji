var webpack = require('webpack');

module.exports = function(config) {
  config.set({
    browsers: [ 'Chrome' ],
    client: {
      mocha: {
        ui: 'tdd'
      }
    },
    frameworks: [ 'mocha' ],
    files: [
      'tests.webpack.js'
    ],
    singleRun: true,
    preprocessors: {
      'tests.webpack.js': [ 'webpack' ]
    },
    webpack: {
      module: {
        rules: [
          { test: /\.jsx?$/, loader: 'babel-loader' }
        ]
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};
