import React from 'react';
import {PURE} from 'dx-util/lib/react/pure';
import {themr} from 'react-css-themr';
import * as PropTypes from 'prop-types';

export const EXPANDABLE_HANDLER = Symbol('ExpandableHandler');

export const EXPANDABLE_HANDLER_THEME = {
	container: PropTypes.string
};

@themr(EXPANDABLE_HANDLER)
@PURE
export default class ExpandableHandler extends React.Component {

	static propTypes = {
		isExpanded: PropTypes.bool,
		theme: PropTypes.shape(EXPANDABLE_HANDLER_THEME),
		children: PropTypes.node
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