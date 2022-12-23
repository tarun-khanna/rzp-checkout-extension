const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    popup: "./popup/popup.js",
    content: "./scripts/content.js",
  },
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
};
