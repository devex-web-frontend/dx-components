import * as ENV from '../config/build/env';
import express, {Router} from 'express';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import baseConfig from '@kadira/storybook/dist/server/config/webpack.config';
import loadConfig from '@kadira/storybook/dist/server/config';

const config = loadConfig('DEVELOPMENT', baseConfig, ENV.STORYBOOK_CONFIG_PATH);
const compiler = webpack(config);
const router = new Router();

router.use(webpackDevMiddleware(compiler, {
	noInfo: true
}));
router.use(webpackHotMiddleware(compiler));

const app = express();
app.use(router);
app.listen(ENV.PORT, ENV.HOST, (error, result) => {
	if (error) {
		return console.error(error);
	}

	console.log(`Listening at http://${ENV.HOST}:${ENV.PORT}`);
	console.log('Compiling...');
});