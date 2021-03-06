const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
    entry: {
      'polyfills': './src/polyfills.ts',
      'vendor': './src/vendor.ts',
      'app': './src/main.ts'
    },

    resolve: {
      extensions: ['.ts', '.js'],
      modules: [helpers.root('src'), 'node_modules']
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            'angular2-template-loader',
            'angular2-router-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        {
          test: /\.html$/,
          loader: 'raw-loader'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file?name=assets/[name].[hash].[ext]'
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          exclude: helpers.root('src/app'),
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader!sass-loader'
          })
        },
        {
          test: /\.scss$/,
          include: helpers.root('src/app'),
          loaders: ['style-loader', 'sass-loader']
        }
      ]
    },

    plugins: [

      // Fixes Angular 2 error
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        __dirname
      ),

      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
      }),

      new ExtractTextPlugin('styles.css'),

      // Where to insert script and link tags:
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      })
    ],

    node: {
      global: true,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
};
