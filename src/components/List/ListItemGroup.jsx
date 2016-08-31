import React from 'react';
import {themr} from 'react-css-themr';
import classnames from 'classnames';

import {LIST, CONTEXT_TYPES, CONTEXT_LEVEL_KEY} from './List.jsx';
import {
	DEFAULT_PROPS as LIST_ITEM_DEFAULT_PROPS, PROP_TYPES as LIST_ITEM_PROP_TYPES
} from './ListItem.jsx';

export const PROP_TYPES = {
	...LIST_ITEM_PROP_TYPES,

	children: React.PropTypes.element.isRequired,
	header: React.PropTypes.node,
	theme: React.PropTypes.shape({
		itemGroup: React.PropTypes.string,
		itemGroup_isCollapsed: React.PropTypes.string,
		itemGroup__header: React.PropTypes.string
	}),
	isCollapsed: React.PropTypes.bool
};

export const DEFAULT_PROPS = {
	...LIST_ITEM_DEFAULT_PROPS,

	isCollapsed: false
};

@themr(LIST)
export default class ListItemGroup extends React.Component {
	static propTypes = PROP_TYPES;

	static defaultProps = DEFAULT_PROPS;

	static contextTypes = CONTEXT_TYPES;

	static childContextTypes = CONTEXT_TYPES;

	getChildContext() {
		return {
			[CONTEXT_LEVEL_KEY]: (this.context[CONTEXT_LEVEL_KEY] || 0) + 1
		};
	}

	render() {
		const {theme, isCollapsed, children, header, onClick} = this.props;
		const level = this.context[CONTEXT_LEVEL_KEY] || 0;
		const className = classnames(
			theme.itemGroup,
			theme[`itemGroup_level_${level}`],
			{
				[theme.itemGroup_isCollapsed]: isCollapsed
			}
		);

		return (
			<li className={className}>
				<span className={theme.itemGroup__header} onClick={onClick}>
					{header}
				</span>
				{children}
			</li>
		);
	}
}