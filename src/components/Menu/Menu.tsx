import * as React from 'react';
import {
	List, ListItem, ListItemGroup, TFullListItemGroupProps, TFullListItemProps, TFullListProps, TListItemGroupProps,
	TListItemProps,
	TListProps
} from '../List/List';
import { withTheme } from '../../util/react/withTheme';
import { Component, ComponentType, ReactElement, ReactText } from 'react';
import { ObjectClean } from 'typelevel-ts';
import { PartialKeys } from 'dx-util/lib/object/object';
import { PURE } from 'dx-util/lib/react/pure';
import * as classNames from 'classnames';
import { Pure } from '../Pure/Pure';

export const MENU = Symbol('Menu');

type TMenuChildProps = {
	onSelect?: () => void
};

export type TFullMenuProps = TFullListProps & {
	List: ComponentType<TListProps>,
	onItemSelect?: () => void,
	children?: ReactElement<TMenuChildProps>[]
};

class RawMenu extends React.Component<TFullMenuProps> {
	static defaultProps = {
		List
	};

	render() {
		const { children, List } = this.props;
		return (
			<List {...this.props}>
				{React.Children.map(children, (child: ReactElement<TMenuChildProps>) => {
					const props: TMenuChildProps = {
						onSelect: this.props.onItemSelect
					};
					return React.cloneElement(child, props);
				})}
			</List>
		);
	}
}

export type TMenuProps = ObjectClean<PartialKeys<TFullMenuProps, 'theme' | 'List'>>;
export const Menu = withTheme(MENU)(RawMenu);

///////////////////////////

type TFullMenuItemProps = TFullListItemProps & {
	theme: {
		item_active?: string,
		item__content?: string,
	},
	ListItem: ComponentType<TListItemProps>,
	value: ReactText,
	isActive?: boolean,
	onSelect?: (value: ReactText, text?: ReactText) => void, //this is injected by Menu/MenuItemGroup
	text?: string,
	children?: ReactText
};

@PURE
class RawMenuItem extends Component<TFullMenuItemProps> {
	static defaultProps = {
		ListItem
	};

	render() {
		const { isActive, ListItem } = this.props;
		let { theme } = this.props;
		if (isActive) {
			theme = {
				...theme,
				item: classNames(theme.item, theme.item_active)
			};
		}
		return (
			<ListItem onClick={this.onClick} {...this.props} theme={theme}>
				<div className={theme.item__content}>
					{this.props.children}
				</div>
			</ListItem>
		);
	}

	onClick = () => {
		this.props.onSelect && this.props.onSelect(this.props.value, this.props.text || this.props.children);
	}
}

export type TMenuItemProps = ObjectClean<PartialKeys<TFullMenuItemProps, 'theme' | 'ListItem'>>;
export const MenuItem = withTheme(MENU)(RawMenuItem);

///////////////////////////

export type TFullMenuItemGroupProps = TFullListItemGroupProps & {
	theme: {
		itemGroup__header__content?: string
	},
	ListItemGroup: ComponentType<TListItemGroupProps>,
	List: ComponentType<TListProps>,
	onSelect?: (value: ReactText, text?: ReactText) => void, //this is injected by Menu/MenuItemGroup
	isCollapsed: boolean
};

type TMenuItemGroupState = {
	isCollapsed: boolean
};

@PURE
class RawMenuItemGroup extends React.Component<TFullMenuItemGroupProps, TMenuItemGroupState> {
	static defaultProps = {
		ListItemGroup,
		List: Menu,
		isCollapsed: true //menu is always collapsed
	};

	state = {
		isCollapsed: true
	};

	componentWillMount() {
		this.setState({
			isCollapsed: this.props.isCollapsed
		});
	}

	componentWillReceiveProps(props: TFullMenuItemGroupProps) {
		this.setState({
			isCollapsed: props.isCollapsed
		});
	}

	render() {
		const { children, theme, ListItemGroup } = this.props;

		let header;
		if (this.props.header) {
			header = (
				<div className={theme.itemGroup__header__content}>
					{this.props.header}
				</div>
			);
		}

		return (
			<ListItemGroup onClick={this.onClick}
			               {...this.props}
			               header={header}
			               isCollapsed={this.state.isCollapsed}>
				<Pure check={children}>
					{() => React.cloneElement(React.Children.only(children), {
						onItemSelect: this.props.onSelect
					})}
				</Pure>
			</ListItemGroup>
		);
	}

	onClick = () => {
		this.setState({
			isCollapsed: !this.state.isCollapsed
		});
	}
}

export const MenuItemGroup = withTheme(MENU)(RawMenuItemGroup);