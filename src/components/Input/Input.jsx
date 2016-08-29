import React from 'react';
import {themr} from 'react-css-themr';
import classnames from 'classnames';

export const INPUT = Symbol('Input');
export const INPUT_THEME_SHAPE_OBJECT = ({
	container: React.PropTypes.string,
	container_isDisabled: React.PropTypes.string,
	container_isReadonly: React.PropTypes.string
});

export const PROP_TYPES = {
	id: React.PropTypes.string,
	value: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number
	]),
	pattern: React.PropTypes.instanceOf(RegExp),
	theme: React.PropTypes.shape(INPUT_THEME_SHAPE_OBJECT),
	isReadonly: React.PropTypes.bool,
	isDisabled: React.PropTypes.bool,
	placeholder: React.PropTypes.string,
	onWheel: React.PropTypes.func,
	onFocus: React.PropTypes.func,
	onBlur: React.PropTypes.func,
	onKeyDown: React.PropTypes.func,
	onChange: React.PropTypes.func
};

@themr(INPUT)
export default class Input extends React.Component {

	static propTypes = PROP_TYPES;

	constructor(...args) {
		super(...args);
		const {value} = this.props;

		this.state = {
			value
		};
	}

	onChange = e => {
		const {value} = this.state;
		const {value: newValue} = e.target;
		const {onChange, pattern} = this.props;
		if ((pattern && pattern.test(newValue)) && newValue !== value) {
			this.setState({
				value: newValue
			});
			onChange && onChange(newValue);
		}
	}

	componentWillReceiveProps(newProps) {
		const {value} = this.state;
		const {value: newValue} = newProps;
		if (newValue !== value) {
			this.setState({
				value: newValue
			});
		}
	}

	render() {
		const {theme, isDisabled, isReadonly, placeholder, onWheel, onKeyDown} = this.props;
		const {value} = this.state;

		const className = classnames(
			theme.container,
			{
				[theme.container_isReadonly]: isReadonly,
				[theme.container_isDisabled]: isDisabled
			}
		);

		const inputProps = {
			disabled: isDisabled,
			readOnly: isReadonly,
			value,
			onWheel,
			placeholder,
			className,
			onKeyDown,
			onFocus: this.onFocus,
			onBlur: this.onBlur,
			onChange: this.onChange
		};

		return (
			<input {...inputProps}	/>
		);
	}

	onFocus = e => {
		const {onFocus} = this.props;
		onFocus && onFocus();
	}

	onBlur = e => {
		const {onBlur} = this.props;
		onBlur && onBlur();
	}
}