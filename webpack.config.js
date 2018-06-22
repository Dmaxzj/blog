const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public/javascripts')
	},
	resolve: {
		alias: {
			'vue': 'vue/dist/vue.js'
		}
	},
	devServer: {
     	contentBase: './public/javascripts'
   	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader'
		}]

	}
};