const config = {
  mode: "production",
  entry: {
    index: "./src/js/index.js",
  },
  output: {
    filename: "[name].[contenthash].bundle.js",
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all'
    }
  }
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: ["style-loader", "css-loader"],
  //     },
  //   ],
  // },
};

module.exports = config;
