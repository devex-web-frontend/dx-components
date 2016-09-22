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
 * @param {ReactComponent} WrappedComponent
 * @param {StatefulOptions} [options]
 * @constructor
 */
const stateful = (WrappedComponent, options) => {
	const componentConfig = Object.assign({}, DEFAULT_OPTIONS, options);
	const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

	class Stateful extends React.Component {
		static displayName = `Stateful ${componentName}`;

		static propTypes = {
			onChange: React.PropTypes.func,
			defaultValue: React.PropTypes.any
		}

		constructor(props, context) {
			super(props, context);
			this.validateIncomingProps(props);

			this.state = {
				value: this.props.defaultValue
			};
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
			return newProps;
		}
	}

	return Stateful;
};

export default stateful;