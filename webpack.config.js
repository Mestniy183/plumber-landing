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
    concatenateModules: true
    }
};

module.exports = config;
