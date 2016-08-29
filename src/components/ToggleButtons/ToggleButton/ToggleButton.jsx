import React, {PropTypes} from 'react';

import {PURE} from 'dx-util/src/react/pure';
import classnames from 'classnames';
import {themr} from 'react-css-themr';

import Button from '../../Button/Button.jsx';
import css from '../../Button/Button.styl';

export const TOGGLE_BUTTON = Symbol('ToggleButton');

@PURE
@themr(TOGGLE_BUTTON, css)
export default class ToggleButton extends Button {
	static propTypes = {
		...Button.propTypes,
		text: PropTypes.string,
		isActive: PropTypes.bool,
		isVertical: PropTypes.bool
	}
	render() {
		const {isActive, isVertical, text, theme, isPrimary, isFlat, type, ...props} = this.props;
		const className = classnames(theme.container, {
			[theme.container_active]: isActive,
			[theme.container_vertical]: isVertical,
			[theme.container_primary]: isPrimary,
			[theme.container_flat]: isFlat
		});
		return (
			<button {...props}
					className={className}
					disabled={this.props.isDisabled}
					type={type}>
				{text && text}
			</button>
		);
	}
}