const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const coreConfig = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"), // output folder
    filename: "[name].bundle.js",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader", // for styles
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./popup/index.html", // base html
      filename: "popup.html",
    }),
  ],
  devServer: {
    port: 3000,
    static: "./dist",
  },
};

module.exports = [
  {
    ...coreConfig,
    entry: {
      popup: "./popup/index.js",
    },
  },
  {
    ...coreConfig,
    entry: {
      content: "./scripts/content.js",
    },
  },
];
