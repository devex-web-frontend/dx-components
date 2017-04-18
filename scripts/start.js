import * as ENV from '../config/build/env';
import WDS from 'webpack-dev-server';

import webpack from 'webpack';
import dev, {HOST, PORT} from '../config/build/dev';

console.log('Starting dx-components...');

const config = dev().resolve();
const compiler = webpack(config);
const server = new WDS(compiler, {
	hot: true,
	historyApiFallback: true,
	stats: ENV.STATS
});

server.listen(PORT, HOST, (error, result) => {
	if (error) {
		return console.error(error);
	}

	console.log(`Listening at http://${HOST}:${PORT}/`);
	console.log('Compiling...');
});