// const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const merge = require("webpack-merge");

const helpers = require("./helpers");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  mode: "production",

  output: {
    filename: "js/[name].[hash].js",
    chunkFilename: "[id].[hash].chunk.js"
  },

  plugins: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: false,
        ecma: 6,
        mangle: true
      },
      sourceMap: true
    })
  ],

  // optimization: {
  //   minimize: false
  // }
});
