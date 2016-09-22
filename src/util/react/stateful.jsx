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
	valueKey: 'value'
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
 * @param {ReactComponent} WrappedComponent
 * @param {StatefulOptions} [options]
 * @constructor
 */
const stateful = (WrappedComponent, options) => {
	const componentConfig = {
		...DEFAULT_OPTIONS,
		...options
	};
	const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

	// TODO: should we extend it from some base class?
	class Stateful extends React.Component {
		static displayName = `Stateful(${componentName})`;

		//noinspection JSUnresolvedVariable
		static propTypes = {
			...WrappedComponent.propTypes,
			onChange: React.PropTypes.func,
			defaultValue: React.PropTypes.any
		}

		//noinspection JSUnresolvedVariable
		static defaultProps = {
			...WrappedComponent.defaultProps
		}

		componentWillMount() {
			this.validateIncomingProps(this.props);

			this.setState({
				value: this.props.defaultValue
			});
		}

		componentWillReceiveProps(newProps) {
			this.validateIncomingProps(newProps);
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
				value: componentConfig.getValueFromOnChange ?
					componentConfig.getValueFromOnChange(args) :
					args[0]
			});

			this.props.onChange && this.props.onChange(...args);
		}

		validateIncomingProps(props) {
			if (props.value) {
				throw new Error('You should not pass a \'value\' property to an uncontrolled component');
			}
		}

		sanitizeIncomingProps(props) {
			const newProps = {
				...props
			};
			delete newProps['onChange'];
			delete newProps['defaultValue'];
			delete newProps['value'];
			return newProps;
		}
	}

	return Stateful;
};

export default stateful;