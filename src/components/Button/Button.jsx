import React from 'react';
import classnames from 'classnames';
import {PURE} from 'dx-util/lib/react/pure';
import {themr} from 'react-css-themr';
import {LoadingIndicator} from '../LoadingIndicator/LoadingIndicator';
import * as PropTypes from 'prop-types';

export const BUTTON = Symbol('Button');

@PURE
@themr(BUTTON)
export default class Button extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		theme: PropTypes.shape({
			container: PropTypes.string,
			loadingIndicator: PropTypes.string
		}),
		style: PropTypes.object,
		type: PropTypes.string,
		isLoading: PropTypes.bool,
		isDisabled: PropTypes.bool,
		isPrimary: PropTypes.bool,
		isFlat: PropTypes.bool,
		onMouseLeave: PropTypes.func,
		onMouseDown: PropTypes.func,
		onMouseUp: PropTypes.func,
		onClick: PropTypes.func,
		tabIndex: PropTypes.number
	}

	static defaultProps = {
		type: 'button'
	}

	render() {
		const {
			theme,
			style,
			type,
			children,
			onClick,
			onMouseDown,
			onMouseLeave,
			onMouseUp,
			isFlat,
			isPrimary,
			isLoading,
			isDisabled,
			tabIndex
		} = this.props;

		const className = classnames(theme.container, {
			[theme.container_primary]: isPrimary,
			[theme.container_flat]: isFlat,
			[theme.container_isLoading]: isLoading
		});

		return (
			<button className={className}
			        onClick={onClick}
			        onMouseLeave={onMouseLeave}
			        onMouseDown={onMouseDown}
			        onMouseUp={onMouseUp}
			        type={type}
			        style={style}
			        tabIndex={tabIndex}
			        disabled={isDisabled}>
				{children}
				{isLoading && (
					<div className={theme.loadingIndicator}>
						<LoadingIndicator theme={theme.LoadingIndicator}/>
					</div>
				)}
			</button>
		);
	}
}