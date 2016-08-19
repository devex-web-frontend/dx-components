import React from 'react';
import classnames from 'classnames';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';

export const BUTTON = Symbol('Button');

@PURE()
@themr(BUTTON)
export default class Button extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string
		}),
		type: React.PropTypes.string,
		isDisabled: React.PropTypes.bool,
		isPrimary: React.PropTypes.bool,
		isFlat: React.PropTypes.bool,
		onClick: React.PropTypes.func,
	}

	render() {
		const {theme, type, children, onClick, isFlat, isPrimary, isDisabled} = this.props;
		const className = classnames(theme.container, {
			[theme.container_primary]: isPrimary,
			[theme.container_flat]: isFlat
		});

		return (
			<button className={className}
			        onClick={onClick}
			        type={type}
			        disabled={isDisabled}>
				{children}
			</button>
		);
	}
}