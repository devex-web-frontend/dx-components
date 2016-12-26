import React from 'react';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';

export const LOADING_INDICATOR = Symbol('LoadingIndicator');
export const LOADING_INDICATOR_THEME = {
	container: React.PropTypes.string
};

@PURE
@themr(LOADING_INDICATOR)
export default class LoadingIndicator extends React.Component {
	static propTypes = {
		theme: React.PropTypes.shape(LOADING_INDICATOR_THEME)
	}

	render() {
		const {theme} = this.props;

		return (
			<div className={theme.container}></div>
		);
	}
}