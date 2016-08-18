import shared, {CORE_JS} from '../build/shared';

/**
 * @param {Object} config
 * @param {String} configType
 * @returns {Object}
 */
module.exports = (config, configType) => {
	return shared()
		.merge(cleanStorybookConfig(config))
		.merge(c => {
			//inject core-js
			c.entry.preview.unshift(CORE_JS);
			return c;
		})
		.resolve();
};

/**
 * @param {{}} config
 * @returns {{}}
 */
function cleanStorybookConfig(config) {
	return {
		...config,
		output: {},
		module: {
			...config.module,
			loaders: []
		}
	};
}