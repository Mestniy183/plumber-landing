const TerserPlugin = require("terser-webpack-plugin");
const config = {
  mode: "production",
  entry: {
    index: "./src/js/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].[contenthash:8].chunk.js",
  },
  optimization: {
    minimize: true,
    usedExports: true,
    sideEffects: false,
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 25,
      maxAsyncRequests: 25,
      cacheGroup: {
        gsap: {
          test: /[\\/]node_modules[\\/]gsap[\\/]/,
          name: "gsap",
          priority: 30,
          reuseExistingChunk: true,
        },

        imask: {
          test: /[\\/]node_modules[\\/]imask[\\/]/,
          name: "imask",
          priority: 25,
          reuseExistingChunk: true,
        },

        firebase: {
          test: /[\\/]node_modules[\\/]firebase[\\/]/,
          name: "firebase",
          priority: 25,
          reuseExistingChunk: true,
        },

        supabase: {
          test: /[\\/]node_modules[\\/]@supabase[\\/]/,
          name: "supabase",
          priority: 20,
          reuseExistingChunk: true,
        },

        swiper: {
          test: /[\\/]node_modules[\\/]swiper[\\/]/,
          name: "swiper",
          priority: 20,
          reuseExistingChunk: true,
        },

        vender: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 10,
          reuseExistingChunk: true,
        },
      }
    },
    minimizer:[
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ["console.log", "console.info"],
            passes: 2,
          },
          mangle: true,
              output: {
                comments: false,
              },
        },
          extractComments: false,
      })
    ]
  },
};

module.exports = config;
