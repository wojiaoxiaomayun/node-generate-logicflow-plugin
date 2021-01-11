const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
  entry: './src/test.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
	  {  
		test: /\.css$/,  
		use: ['style-loader', 'css-loader']  
	  },
	  {  
        test: /\.less$/,  
        use: ['style-loader', 'css-loader']  
  	  }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias:{
      "@":path.resolve("src")
    }
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({template: './index.html'})
  ],
  devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      compress: true,//服务器压缩
      open:true,
      port: 8082
  },
  output:{
    filename:'index.js',
    path:path.resolve(__dirname, 'dist')
  }
};