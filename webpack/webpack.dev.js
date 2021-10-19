'use strict';
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { styleLoaders } = require('./vue.utils');
const config = require('./config');

module.exports = (env, options) => ({
  module: {
    rules: styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true }),
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  entry: {
    global: './src/main/webapp/content/scss/global.scss',
    main: './src/main/webapp/app/main',
  },
  output: {
    filename: 'app/[contenthash].bundle.js',
    chunkFilename: 'app/[id].chunk.js',
  },
  optimization: {
    moduleIds: 'named',
  },
  devServer: {
    static: {
      directory: './target/classes/static/',
    },
    port: 9060,
    proxy: [
      {
        context: ['/api', '/services', '/management', '/swagger-resources', '/v2/api-docs', '/v3/api-docs', '/h2-console', '/auth'],
        target: 'http://127.0.0.1:8080',
        secure: false,
        headers: { host: 'localhost:9000' },
      },
    ],
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      base: '/',
      template: './src/main/webapp/index.html',
      chunks: ['vendors', 'main', 'global'],
      chunksSortMode: 'manual',
      inject: true,
    }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 9000,
        proxy: {
          target: 'http://localhost:9060',
        },
        socket: {
          clients: {
            heartbeatTimeout: 60000,
          },
        },
        /*
        ,ghostMode: { // uncomment this part to disable BrowserSync ghostMode; https://github.com/jhipster/generator-jhipster/issues/11116
          clicks: false,
          location: false,
          forms: false,
          scroll: false
        } */
      },
      {
        reload: true,
      }
    ),
  ],
});
