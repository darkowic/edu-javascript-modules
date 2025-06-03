const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
  },
  target: 'web',
  resolve: {
    // Add support for various module formats
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      // Module directories
      'core': path.resolve(__dirname, 'src/modules/core'),
      'validation': path.resolve(__dirname, 'src/modules/validation'),
      'formatting': path.resolve(__dirname, 'src/modules/formatting'),
      'utils': path.resolve(__dirname, 'src/modules/utils')
    }
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
