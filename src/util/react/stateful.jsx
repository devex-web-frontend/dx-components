import React from 'react';

/**
 * @typedef {Object} StatefulOptions
 * @property {String} [onChangeKey]
 * @property {String} [valueKey]
 * @property {Function} [getValueFromOnChange]
 */

/**
 * @type {StatefulOptions}
 */
const DEFAULT_OPTIONS = {
	onChangeKey: 'onChange',
	valueKey: 'value',
	getValueFromOnChange: firstArg => firstArg // use first argument from `onChange` by default
};

/**
 * This decorator creates an adapter to controlled stateless component.
 * It stores and updates a value got from the wrapped component and provides it back.
 *
 * Wrapped component should have `value` and `onChange` props, but these names could be
 * overriden with options.
 *
 * If you need to process value got from the `onChange` eventm you can provide `getValueFromOnChange` option.
 * This function gets all arguments from `onChange` and should return a new value.
 *
 * @param {StatefulOptions} [options]
 * @constructor
 */
const stateful = options => {
	const componentConfig = {
		...DEFAULT_OPTIONS,
		...options
	};

	return WrappedComponent => {
		const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

		const propTypes = WrappedComponent.propTypes || {};

		// TODO: should we extend it from some base class?
		class Stateful extends React.Component {
			static displayName = `Stateful(${componentName})`;

			//noinspection JSUnresolvedVariable
			static propTypes = {
				...propTypes,
				value(props) {
					if (typeof props[componentConfig.valueKey] !== 'undefined') {
						throw new Error(
							`${Stateful.displayName}: passed 'value' prop will be ignored, use 'defaultValue' instead`
						);
					}
				},
				[componentConfig.onChangeKey]: React.PropTypes.func,
				defaultValue: propTypes[componentConfig.valueKey]
			}

			componentWillMount() {
				this.setState({
					value: this.props.defaultValue
				});
			}

			render() {
				const transmittedProps = {
					[componentConfig.onChangeKey]: this.handleWrappedOnChange,
					[componentConfig.valueKey]: this.state.value
				};

				return (
					<WrappedComponent {...this.sanitizeIncomingProps(this.props)}
					                  {...transmittedProps}/>
				);
			}

			handleWrappedOnChange = (...args) => {
				this.setState({
					value: componentConfig.getValueFromOnChange(...args)
				});

				this.props.onChange && this.props.onChange(...args);
			}

			sanitizeIncomingProps(props) {
				const newProps = {
					...props
				};
				delete newProps[componentConfig.onChangeKey];
				delete newProps['defaultValue'];
				delete newProps[componentConfig.valueKey];
				return newProps;
			}
		}

		return Stateful;
	};
};

export default stateful;