import * as ENV from './env';

import glob from 'glob';
import path from 'path';
import autoprefixer from 'autoprefixer';
import BaseConfig from 'webpack-configurator';
import clone from 'clone';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SvgSpriteExtractPlugin from 'svg-sprite-extract-plugin';

const JS_PATTERN = /\.jsx?$/;
const FILE_PATTERN = /\.png$|\.jpg$|\.gif$|\.swf$|\.ico$|\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/;
export const STYLUS_QUERY = {
	nocheck: true,
	'include css': true,
	'resolve url': true
};
const svgExtractor = new SvgSpriteExtractPlugin(ENV.SVG_SPRITE_ENTRY,
	{
		idTemplate: '[path][name]',
		context: ENV.SRC_PATH
	}
);

//mix in clone method
class Config extends BaseConfig {
	clone() {
		return Object.assign(new Config(), {
			_config: clone(this._config),
			_preLoaders: clone(this._preLoaders),
			_loaders: clone(this._loaders),
			_postLoaders: clone(this._postLoaders),
			_plugins: clone(this._plugins)
		});
	}
}

const plugins = [
	svgExtractor,
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: path.resolve(ENV.SRC_PATH, 'storybook/index.html'),
		chunks: ['manager'],
		inject: 'body'
	}),
	new HtmlWebpackPlugin({
		filename: 'iframe.html',
		template: path.resolve(ENV.SRC_PATH, 'storybook/iframe.html'),
		chunks: ['preview'],
		inject: 'body'
	})
];

const alias = {
	config: path.resolve(ENV.SRC_PATH, 'config/config.interop.styl'),
	'react-css-themr': path.resolve(ENV.NODE_MODULES_PATH, 'react-css-themr/src/index.js')
};

const externals = [];

const loaders = [
	//es6 libs
	{
		test: JS_PATTERN,
		loader: 'babel',
		include: ENV.ES6
	},
	//js
	{
		test: JS_PATTERN,
		loader: 'babel',
		exclude: [
			ENV.NODE_MODULES_PATH
		]
	},
	//files
	{
		test: FILE_PATTERN,
		loader: 'file?name=[path][name].[ext]?[hash]&context=src'
	},
	//svg
	{
		test: /\.svg$/,
		loader: svgExtractor.extract('svgo')
	},
	//typescript
	{
		test: /\.tsx?$/,
		loader: 'ts-loader'
	}
];

/**
 * @returns {Config}
 */
export default function shared() {
	const config = new Config();

	config.merge({
		entry: {
			manager: [
				ENV.CORE_JS,
				require.resolve('@kadira/storybook/dist/server/addons.js'),
				require.resolve('@kadira/storybook/dist/client/manager/index.js')
			],
			preview: [
				ENV.CORE_JS,
				require.resolve('@kadira/storybook/dist/server/addons.js'),
				require.resolve('../storybook/client.js')
			]
		},
		output: {
			path: ENV.BUILD_PATH,
			filename: '[name].js'
		},
		module: {
			loaders: [
				...loaders,
				...externals
			]
		},
		resolve: {
			alias,
			extensions: [
				'',
				'.js',
				'.jsx',
				'.ts',
				'.tsx'
			]
		},
		plugins,
		postcss() {
			return [
				autoprefixer
			];
		}
	});

	config.loader('css', {
		test: /\.css$/,
		loader: 'style!css?localIdentName=[name]__[local]___[hash:base64:5]!postcss',
		exclude: [
			ENV.SRC_PATH
		]
	});
	config.loader('css-modules', {
		test: /\.css$/,
		loader: 'style!css?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss',
		include: [
			ENV.SRC_PATH
		]
	});

	config.loader('stylus', {
		test: /\.styl$/,
		loader: [
			'style',
			'css?localIdentName=[name]__[local]___[hash:base64:5]',
			'postcss',
			`stylus?${JSON.stringify(STYLUS_QUERY)}`
		].join('!'),
		exclude: [
			ENV.SRC_PATH
		]
	});
	config.loader('stylus-modules', {
		test: /\.styl$/,
		loader: [
			'style',
			'css?modules&localIdentName=[name]__[local]___[hash:base64:5]',
			'postcss',
			`stylus?${JSON.stringify(STYLUS_QUERY)}`
		].join('!'),
		include: [
			ENV.SRC_PATH
		]
	});

	return config;
}