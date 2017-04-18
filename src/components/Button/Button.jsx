import React from 'react';
import classnames from 'classnames';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';
import LoadingIndicator, {LOADING_INDICATOR_THEME} from '../LoadingIndicator/LoadingIndicator';

export const BUTTON = Symbol('Button');

@PURE
@themr(BUTTON)
export default class Button extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string,
			loadingIndicator: React.PropTypes.string,
			LoadingIndicator: React.PropTypes.shape(LOADING_INDICATOR_THEME)
		}),
		style: React.PropTypes.object,
		type: React.PropTypes.string,
		isLoading: React.PropTypes.bool,
		isDisabled: React.PropTypes.bool,
		isPrimary: React.PropTypes.bool,
		isFlat: React.PropTypes.bool,
		onMouseLeave: React.PropTypes.func,
		onMouseDown: React.PropTypes.func,
		onMouseUp: React.PropTypes.func,
		onClick: React.PropTypes.func,
		tabIndex: React.PropTypes.number
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