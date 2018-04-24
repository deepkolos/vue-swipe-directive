var path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, ""),
    filename: "./index.out.js"
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
