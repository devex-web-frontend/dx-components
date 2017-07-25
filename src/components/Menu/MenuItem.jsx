import React from 'react';
import {themr} from 'react-css-themr';
import ListItem, {PROP_TYPES, DEFAULT_PROPS} from '../List/ListItem.jsx';
import {PURE} from 'dx-util/lib/react/pure';
import classnames from 'classnames';
export {LIST_ITEM_THEME_SHAPE as MENU_ITEM_THEME_SHAPE} from '../List/ListItem';

import {MENU} from './Menu.jsx';

@PURE
@themr(MENU)
export default class MenuItem extends React.Component {
	static propTypes = {
		...PROP_TYPES,
		ListItemComponent: React.PropTypes.func,
		value: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		]).isRequired,
		text(props) {
			if (typeof props.children === 'object' && !props.text) {
				throw new Error('Text should be specified if children is object');
			}
		},
		isActive: React.PropTypes.bool,
		onSelect: React.PropTypes.func //this is injected by Menu/MenuItemGroup
	}

	static defaultProps = {
		...DEFAULT_PROPS,
		ListItemComponent: ListItem
	}

	render() {
		let {theme, isActive, ListItemComponent} = this.props;
		if (isActive) {
			theme = {
				...theme,
				item: classnames(theme.item, theme.item_active)
			};
		}
		return (
			<ListItemComponent onClick={this.onClick} {...this.props} theme={theme}>
				<div className={theme.item__content}>
					{this.props.children}
				</div>
			</ListItemComponent>
		);
	}

	onClick = e => {
		this.props.onSelect && this.props.onSelect(this.props.value, this.props.text || this.props.children);
	}
}