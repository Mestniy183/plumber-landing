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
