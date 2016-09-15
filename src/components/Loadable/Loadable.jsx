import React from 'react';
import {themr} from 'react-css-themr';

export const LOADABLE = Symbol('Loadable');

@themr(LOADABLE)
export default class Loadable extends React.Component {
	static propTypes = {
		isLoaded: React.PropTypes.bool,
		children: React.PropTypes.node,
		LoaderComponent: React.PropTypes.func,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string
		})
	};

	static defaultProps = {
		isLoaded: true
	}

	render() {
		const {
			theme,
			isLoaded,
			children,
			LoaderComponent: Loader
		} = this.props;

		return (
			<div className={theme.container}>
				{isLoaded && Loader && <Loader/>}
				{!isLoaded && children}
			</div>
		);
	}
}