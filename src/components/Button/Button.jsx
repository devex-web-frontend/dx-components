import React from 'react';
import classnames from 'classnames';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';

export const BUTTON_THEME = {
	container: React.PropTypes.string
};

export const BUTTON = Symbol('Button');

@PURE
@themr(BUTTON)
export default class Button extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		theme: React.PropTypes.shape(BUTTON_THEME),
		type: React.PropTypes.string,
		isDisabled: React.PropTypes.bool,
		isPrimary: React.PropTypes.bool,
		isFlat: React.PropTypes.bool,
		onMouseLeave: React.PropTypes.func,
		onMouseDown: React.PropTypes.func,
		onMouseUp: React.PropTypes.func,
		onClick: React.PropTypes.func
	}

	render() {
		const {
			theme,
			type,
			children,
			onClick,
			onMouseDown,
			onMouseLeave,
			onMouseUp,
			isFlat,
			isPrimary,
			isDisabled
		} = this.props;

		const className = classnames(theme.container, {
			[theme.container_primary]: isPrimary,
			[theme.container_flat]: isFlat
		});

		return (
			<button className={className}
			        onClick={onClick}
			        onMouseLeave={onMouseLeave}
			        onMouseDown={onMouseDown}
			        onMouseUp={onMouseUp}
			        type={type}
			        disabled={isDisabled}>
				{children}
			</button>
		);
	}
}