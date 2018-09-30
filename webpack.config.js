const Dotenv = require('dotenv-webpack');
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    new Dotenv()
  ],
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader',
        query: {
          plugins: [
            'transform-react-jsx',
            [
              'react-css-modules',
              {
                "context": process.cwd()
              }
            ]
          ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        include: APP_DIR,
        loaders: [
          'style-loader',
          'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ],
        test: /\.css$/
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[name].[ext]'
            }  
          }
        ]
      }
    ]
  }
};

module.exports = config;