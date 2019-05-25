const webpack = require('webpack');
const path = require('path');
const isDevelopment = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		vendor: ['jquery', 'bootstrap'],
		main: './src/index.js'
	},
	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},

	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			title: 'Webpack Demo'
		}),
		new MiniCssExtractPlugin({filename: 'assets/css/[name].css', chunkFilename: 'assets/css/[id].css'})
	],
	watch: true,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
		ignored: ['node_modules']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
						plugins: ["@babel/plugin-syntax-dynamic-import", "@babel/transform-runtime"]
					}
				}
			},
			{
				test: /\.(scss|sass|css)$/,

				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../',
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.(otf|woff|woff2|eot|ttf|otf)$/,
				use: [
				{
					loader: 'url-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'assets/fonts/',
						publicPath: '../assets/fonts/'
					}
				}
				]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
				use: [
				{
					loader: 'url-loader',
					options: {
						name: 'images/[hash]-[name].[ext]',
						limit: '8000',
						outputPath: 'assets/images/',
						publicPath: '../assets/images/'
					}
				}
				]
			},
		]
	},
	
	

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},
	mode: 'development',
	devtool: 'inline-source-map',
	// Live Reloading
	devServer: {
		contentBase: './dist' // Serve the files from the dist directory 
	},
};
