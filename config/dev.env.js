'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER_API_URL: '\'\'',
  BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
  // APP_VERSION is passed as an environment variable from the Gradle / Maven build tasks.
  VERSION: `'${process.env.hasOwnProperty('APP_VERSION') ? process.env.APP_VERSION : 'UNKNOWN'}'`,
});
