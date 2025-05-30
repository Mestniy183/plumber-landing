const webpack = require("webpack");
const dotenv = require("dotenv").config();

const config = {
  mode: "production",
  entry: {
    index: "./src/js/index.js",
  },
  output: {
    filename: "[name].bundle.js",
  },
  optimization: {
    minimize: true,
    usedExports: true,
    sideEffects: true,
    concatenateModules: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed),
    }),
  ],
};

module.exports = config;
