const path = require("path");
//const webpack = require('webpack');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CopyPlugin = require("copy-webpack-plugin");

let fs = require("fs");

const minifyRules = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: false,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true, 
};

const devMode = false;
const isBack = false;
const minify = true;

module.exports = {
  mode: devMode ? "development" : "production",
  watch: true,
  entry: {
    index: ["./src/js/index.js"]
  },
  output: {
    publicPath: "../",
    path: path.resolve(__dirname, "html"),
    filename: isBack ? "../../source/plugins/Web/webroot/js/[name].js" : "js/[name].js", // copy to backend
    library: ["[name]", "modules"],
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isBack ? "../../source/plugins/Web/webroot/css/[name].css" : "css/[name].css", // copy to backend
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/img", to: "img", noErrorOnMissing: true },
        { from: "src/tiles", to: "tiles", noErrorOnMissing: true },
        { from: "src/js/bowser.min.js",
          to: "js/bowser.min.js",
          info: { minimized: true },
          noErrorOnMissing: true,
        },
        { from: "src/js/screenfull.min.js",
          to: "js/screenfull.min.js",
          info: { minimized: true },
          noErrorOnMissing: true,
        },
        { from: "src/js/marzipano.js",
          to: "js/marzipano.js",
          info: { minimized: true },
          noErrorOnMissing: true,
        },
        { from: "src/js/main.js",
          to: "js/main.js",
          info: { minimized: false },
          noErrorOnMissing: true,
        },
        { from: "src/js/data.js",
          to: "js/data.js",
          info: { minimized: false },
          noErrorOnMissing: true,
        }
      ],
      options: {
        concurrency: 100
      },
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: "index.html",
      template: "src/index.html",
      minify: minify,
    })
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  watchOptions: {
    ignored: "**/node_modules",
    aggregateTimeout: 100,
  },
};