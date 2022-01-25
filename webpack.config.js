const path = require('path');

module.exports = {
  // JavaScript 执行入口文件
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'ms-watch.js',
    path: path.resolve(__dirname, './ms-watch'),
    library: 'meisha_watch',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  externals: /^(babel-runtime)/,
  devServer:{
    static: {
      directory: path.join(__dirname, ''),
    },
    host: 'localhost',
    compress: true,
    port: 8090,
    open: true,
    hot: true,
  }
};