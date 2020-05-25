const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const helpers = require("./helpers");

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === "production";

module.exports = {
  entry: {
    app: [helpers.root("client/app/index.js")]
  },

  output: {
    path: helpers.root("dist"),
    publicPath: "/"
  },

  resolve: {
    extensions: [".js", ".json", ".css", ".scss", ".html"],
    alias: {
      app: "client/app"
    }
  },

  module: {
    rules: [
      // JS files
      {
        test: /\.jsx?$/,
        include: helpers.root("client"),
        loader: "babel-loader"
      },

      // SCSS files
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [autoprefixer]
              }
            },
            "sass-loader"
          ]
        })
      },

      // Image files
      // {
      //   test: /\.(png|jpg|gif)$/i,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 10000
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.gif$/,
      //   loader: "url-loader?limit=10000&mimetype=image/gif"
      // },
      // {
      //   test: /\.jpg$/,
      //   loader: "url-loader?limit=10000&mimetype=image/jpg"
      // },
      // {
      //   test: /\.png$/,
      //   loader: "url-loader?limit=10000&mimetype=image/png"
      // },
      // {
      //   test: /\.svg/,
      //   loader: "url-loader?limit=26000&mimetype=image/svg+xml"
      // },

      // {
      //   test: /\.(eot|ttf|wav|mp3|mp4)$/,
      //   loader: "file-loader"
      // }
    ]
  },

  // target: "node",
  // node: {
  //   fs: "empty"
  // },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),

    new HtmlWebpackPlugin({
      template: helpers.root("client/public/index.html"),
      inject: "body"
    }),

    new ExtractTextPlugin({
      filename: "css/[name].[hash].css",
      disable: !isProd
    }),

    new CopyWebpackPlugin([
      {
        from: helpers.root("client/public")
      }
    ])
  ]
};
