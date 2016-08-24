import React from 'react';
import {themr} from 'react-css-themr';

export const INPUT = Symbol('Input');
export const INPUT_THEME_SHAPE_OBJECT = {
	container: React.PropTypes.string
};

import css from './Input.styl';

export const PROP_TYPES = {
	value: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number
	]),
	theme: React.PropTypes.shape(INPUT_THEME_SHAPE_OBJECT),
	isReadonly: React.PropTypes.bool,
	isDisabled: React.PropTypes.bool,
	placeholder: React.PropTypes.string,
	onChange: React.PropTypes.func
};

@themr(INPUT, css)
export default class Input extends React.Component {

	static propTypes = PROP_TYPES;

	static defaultProps = {
		onChange() {}
	};

	render() {
		const {theme, isDisabled, value, isReadonly, placeholder, onChange} = this.props;

		return (
			<input disabled={isDisabled}
				   readOnly={isReadonly}
				   value={value}
				   placeholder={placeholder}
				   className={theme.container}
				   onChange={onChange} />
		);
	}
}