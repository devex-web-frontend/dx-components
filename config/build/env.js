const path = require('path');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

const CORE_JS = module.exports.CORE_JS = 'core-js/client/shim.min.js';
const ROOT = module.exports.ROOT = path.join(__dirname, '../../');
const BUILD_PATH = module.exports.BUILD_PATH = path.resolve(ROOT, 'dist');
const SRC_PATH = module.exports.SRC_PATH = path.resolve(ROOT, 'src');
const LIB_PATH = module.exports.LIB_PATH = path.resolve(ROOT, 'bower_components');
const NODE_MODULES_PATH = module.exports.NODE_MODULES_PATH = path.resolve(ROOT, 'node_modules');
//should be a directory
const STORYBOOK_CONFIG_PATH = module.exports.STORYBOOK_CONFIG_PATH = path.resolve(ROOT, 'config/storybook');
const PORT = module.exports.PORT = argv['port'] || 8080;
const HOST = module.exports.HOST = argv['host'] || 'localhost';

const ES6 = module.exports.ES6 = [
	path.resolve(NODE_MODULES_PATH, 'svg-sprite-extract-plugin'),
	path.resolve(NODE_MODULES_PATH, 'react-css-themr'),
	path.resolve(LIB_PATH, 'dx-util'),
	path.resolve(LIB_PATH, 'scrollable')
];

const SVG_SPRITE_ENTRY = module.exports.SVG_SPRITE_ENTRY = 'svg-sprite.js';

const STATS = module.exports.STATS = {
	assets: true,
	colors: true,
	version: false,
	hash: false,
	timings: false,
	chunks: false,
	chunkModules: false,
	children: false
};