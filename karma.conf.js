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
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' }
        ]
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};
