import React from 'react';
import {themr} from 'react-css-themr';
import ListItemGroup, {PROP_TYPES, DEFAULT_PROPS} from '../List/ListItemGroup.jsx';
import Menu, {MENU} from './Menu.jsx';
import {PURE} from 'dx-util/lib/react/pure';
import Pure from '../Pure/Pure';
export {LIST_ITEM_GROUP_THEME_SHAPE as MENU_ITEM_GROUP_THEME_SHAPE} from '../List/ListItemGroup';

@PURE
@themr(MENU)
export default class MenuItemGroup extends React.Component {
	static propTypes = {
		...PROP_TYPES,
		ListItemGroupComponent: React.PropTypes.func,
		ListComponent: React.PropTypes.func,
		onSelect: React.PropTypes.func //this is injected by Menu/MenuItemGroup
	}

	static defaultProps = {
		...DEFAULT_PROPS,
		ListItemGroupComponent: ListItemGroup,
		ListComponent: Menu,
		isCollapsed: true //menu is always collapsed
	}

	constructor(...args) {
		super(...args);
		this.state = {
			isCollapsed: this.props.isCollapsed
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			isCollapsed: props.isCollapsed
		});
	}

	render() {
		const {children, theme, ListItemGroupComponent, ListComponent} = this.props;

		let header;
		if (this.props.header) {
			header = (
				<div className={theme.itemGroup__header__content}>
					{this.props.header}
				</div>
			);
		}

		return (
			<ListItemGroupComponent onClick={this.onClick}
			                        ListComponent={ListComponent}
			                        {...this.props}
			                        header={header}
			                        isCollapsed={this.state.isCollapsed}>
				<Pure check={children}>
					{() => React.cloneElement(React.Children.only(children), {
						onItemSelect: this.props.onSelect
					})}
				</Pure>
			</ListItemGroupComponent>
		);
	}

	onClick = e => {
		this.setState({
			isCollapsed: !this.state.isCollapsed
		});
	}
}