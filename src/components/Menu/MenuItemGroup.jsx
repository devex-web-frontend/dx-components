import React from 'react';
import {themr} from 'react-css-themr';
import ListItemGroup, {PROP_TYPES, DEFAULT_PROPS} from '../List/ListItemGroup.jsx';
import Menu, {MENU} from './Menu.jsx';
import {PURE} from 'dx-util/src/react/pure';

@PURE()
@themr(MENU)
export default class MenuItemGroup extends React.Component {
	static propTypes = {
		...PROP_TYPES,
		onSelect: React.PropTypes.func //this is injected by Menu/MenuItemGroup
	}

	static defaultProps = {
		...DEFAULT_PROPS,
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
		const {children, theme} = this.props;

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
			               ListComponent={Menu}
			               {...this.props}
			               header={header}
			               isCollapsed={this.state.isCollapsed}>
				{React.cloneElement(React.Children.only(children), {
					onItemSelect: this.props.onSelect
				})}
			</ListItemGroup>
		);
	}

	onClick = e => {
		this.setState({
			isCollapsed: !this.state.isCollapsed
		});
	}
}