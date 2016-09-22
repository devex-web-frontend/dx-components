import React from 'react';
import {themr} from 'react-css-themr';

export const LOADINGINDICATON = Symbol('LoadingIndicaton');

@themr(LOADINGINDICATON)
export default class LoadingIndicaton extends React.Component {
	static propTypes = {
		isLoading: React.PropTypes.bool,
		children: React.PropTypes.node,
		LoadingIndicatorComponent: React.PropTypes.func,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string
		})
	};

	static defaultProps = {
		isLoading: false
	}

	render() {
		const {
			theme,
			isLoading,
			children,
			LoadingIndicatorComponent: LoadingIndicator
		} = this.props;

		return (
			<div className={theme.container}>
				{isLoading && LoadingIndicator && <LoadingIndicator/>}
				{!isLoading && children}
			</div>
		);
	}
}