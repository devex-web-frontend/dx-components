import shared from './shared';
import webpack from 'webpack';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
export const PORT = argv['port'] || 8080;
export const HOST = argv['host'] || 'localhost';

export const DEV_CHUNKS = [
	'react-hot-loader/patch',
	`webpack-dev-server/client?http://${HOST}:${PORT}`,
	'webpack/hot/only-dev-server'
];

/**
 * @returns {Config}
 */
export default function dev() {
	const config = shared().clone();

	config.merge(c => {
		c.entry.preview = [
			...DEV_CHUNKS,
			...c.entry.preview
		];

		return c;
	});

	config.merge({
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	});

	return config;
}