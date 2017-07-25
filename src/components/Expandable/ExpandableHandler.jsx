import React from 'react';
import {PURE} from 'dx-util/lib/react/pure';
import {themr} from 'react-css-themr';

export const EXPANDABLE_HANDLER = Symbol('ExpandableHandler');

export const EXPANDABLE_HANDLER_THEME = {
	container: React.PropTypes.string
};

@themr(EXPANDABLE_HANDLER)
@PURE
export default class ExpandableHandler extends React.Component {

	static propTypes = {
		isExpanded: React.PropTypes.bool,
		theme: React.PropTypes.shape(EXPANDABLE_HANDLER_THEME),
		children: React.PropTypes.node
	}

	render() {
		const {theme, children} = this.props;
		return (
			<div className={theme.container}>
				{children}
			</div>
		);
	}
}