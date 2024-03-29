const path = require('path');
const webpack = require('webpack');

//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


//var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = (env) => {

	var plugins = [ 

		new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 3 }),	
		new webpack.ProvidePlugin({   $: "jquery", jQuery: "jquery", _: 'lodash' }) ,
	    new CopyPlugin({
	      patterns: [
	        { from: path.resolve('./src/assets/images'), to: '' },
	        { from: path.resolve('./src/favicon.ico'), to: '' },
		    { from: path.resolve('src/index.html'), to: '' },
		    { from: path.resolve('src/admin.html'), to: '' },
		    { from: path.resolve('src/login.html'), to: '' }
	      ]
	     })
	];
	
	
	//if(env.production)  plugins.push( new webpack.DefinePlugin({'process.env': { 'NODE_ENV': JSON.stringify('production')} }) )

	return  {
	  resolve: {
		modules: [__dirname, 'node_modules'],
		alias:{
		   "/js": path.resolve(__dirname, 'src/js/'),
		   "/jsx": path.resolve(__dirname, 'src/jsx/'),
		   "/assets": path.resolve(__dirname, 'src/assets/'),
		   "reducer": path.resolve(__dirname, 'src/js/reducer'),
		   "order": path.resolve(__dirname, 'src/js/order'),
		   '$': "jquery"
		},
		extensions: ['*','.js','.jsx']
	  },
	  plugins: plugins,
	  entry: {
		index: './src/index.js',
		admin: './src/admin.js',
		login: './src/login.js'
	  },

	  output: {
		path: path.resolve(__dirname, 'dist'), filename: '[name].js'
	  },
	  devServer: {
	        setup(app) {
		
		        app.post('/php/login.php', (req, res) => {		
	                res.json({"success":true});
	            });	
	
			    app.get('/php/logout.php', (req, res) => {		
	                res.json({"success":true});
	            });	
		
				app.get('/php/orders/controllers/list.php', (req, res) => {
	                res.json({"total":0, "data":[]});
	            });	
		
	        },
	    },
	  
	  module: {

		rules: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test:/\.(s*)css$/, use:['style-loader','css-loader', 'sass-loader']  },			
			{
			    test: /\.(png|jpe?g|gif|ico)$/i, exclude: /node_modules/, 
				use: [{  loader: 'file-loader',  options: {  name: '[name].[ext]'}} ]
			},
			{
				test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
				loader: 'url-loader'
			}
		]
	  }

	}

}


