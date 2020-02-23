const path = require('path');


var config = {
  // 打包的入口文件
  entry: './src/main.js',

  // 配置打包结果，path定义输出文件夹，filename定义打包结果文件的名称
  output: {
	path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },

  // 设置服务器端口号
  devServer: {
	contentBase: './src',
	publicPath: '/',
	historyApiFallback: true,
    inline: true,
    port: 7777
  },

  // 配置模块的处理逻辑，用loaders定义加载器
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
       // query: {
      //    presets: ['es2015', 'react']
      //  }
      }
    ]
  }
}

module.exports = config;
