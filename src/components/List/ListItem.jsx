import React from 'react';
import {themr} from 'react-css-themr';
import classnames from 'classnames';
import {PURE} from 'dx-util/lib/react/pure';

import {LIST, CONTEXT_TYPES, CONTEXT_LEVEL_KEY} from './List.jsx';
export const LIST_ITEM_THEME_SHAPE = {
	item: React.PropTypes.string
};
export const PROP_TYPES = {
	children: React.PropTypes.node,
	level: React.PropTypes.number,
	theme: React.PropTypes.shape(LIST_ITEM_THEME_SHAPE),
	onClick: React.PropTypes.func
};

export const DEFAULT_PROPS = {};

@PURE
@themr(LIST)
export default class ListItem extends React.Component {
	static propTypes = PROP_TYPES;

	static defaultProps = DEFAULT_PROPS;

	static contextTypes = CONTEXT_TYPES;

	render() {
		const {theme, onClick, children} = this.props;
		const level = this.context[CONTEXT_LEVEL_KEY] || 0;
		const className = classnames(theme.item, theme[`item_level_${level}`]);

		return (
			<li className={className} onClick={onClick}>
				{children}
			</li>
		);
	}
}