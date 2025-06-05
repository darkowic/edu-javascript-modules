const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    clean: true,
    module: true,
    chunkFormat: 'module'
  },
  experiments: {
    outputModule: true,
  },
  target: 'web',
  resolve: {
    // Add support for various module formats
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Webpack Module Bundling Example'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    hot: true
  }
};
