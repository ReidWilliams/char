'use strict'

 // System Deps
var autoprefixer =require('autoprefixer');
var webpack =require('webpack');
var path =require('path');


// Only export the config to be consumed by webpack
// It builds an instance of a webpack compiler based on this
module.exports = {
  // Entry points into the build process
  entry: [
    'webpack/hot/dev-server',
    path.join(__dirname, '/client/index.js')
  ],
  
  // Output build path
  output: {
    path: path.join(__dirname, '/dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },

  // Set up source mapping for debugging
  devtool: "inline-source-map",

  // Webpack Loaders (transformations)
  // http://webpack.github.io/docs/using-loaders.html
  module: {
    loaders: [
      // Font files
      {
        test: /\.(ttf|eot|woff)(\?.*)?$/,
        loaders: ['url']
      },
      // Clean up SVGs
      {
        test: /\.svg(\?.*)?$/,
        loaders: ['url', 'svgo']
      },
      // Stylesheets
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      // Compile Sass to CSS
      {
        test: /\.scss$/,
        loaders: ["style", "css"]
      },
      // ES6
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   loaders: ['react-hot', 'babel?presets[]=es2015'],
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015'
      },
      // Markup
      {
        test: /\.html$/,
        loader: 'html'
      },
      // Standard JSON
      {
        test: /\.json$/,
        loader: 'json'
      },
      // for bootstrap (see https://github.com/theodybrothers/webpack-bootstrap)
      { 
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" 
      }
    ]
  },

  // // ESLint specification
  // eslint: {
  //   parser: 'babel-eslint'
  // },

  // Handle all vendor prefixes
  postcss: () => {
    return [autoprefixer];
  },

  // http://webpack.github.io/docs/using-plugins.html  
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware 
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
