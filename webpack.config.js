/* © 2017 int3ractive.com
 * @author Thanh Tran
 */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');

// the npm script target (npm run `target`)
const TARGET = process.env.npm_lifecycle_event;

const config = {
	context: path.resolve(__dirname, './app'),
	entry: {
		app: './scripts/index.js',
		vendor: [
			'bliss',
			'lockr',
			'polyglot',
		],
	},
	resolve: {
		alias: {
			bliss: path.resolve(__dirname, 'app/vendor/bliss.min.js'),
			lockr: path.resolve(__dirname, 'app/vendor/lockr.js'),
			polyglot: path.resolve(__dirname, 'app/vendor/polyglot.min.js'),
		},
	},
	output: {
		path: path.resolve(__dirname, './app/js'),
		filename: '[name].bundle.js',
		publicPath: '/js',
	},
	module: {
		noParse: /bliss|lockr|polyglot/,
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor', // Specify the common bundle's name.
		}),
	],
};

// TODO: Implement module hoisting in webpack 3 to enhance initial script parsing
if (TARGET === 'build') {
	// production
	Object.assign(config, {
		devtool: 'source-map',
	});
} else {
	// dev
	Object.assign(config, {
		devtool: 'cheap-module-inline-source-map',
		devServer: {
			contentBase: path.resolve(__dirname, './app'),
		},
	});
}

module.exports = config;
