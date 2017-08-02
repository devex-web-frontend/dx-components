import React from 'react';
import {themr} from 'react-css-themr';
import {List, PROP_TYPES, DEFAULT_PROPS} from '../List/List.tsx';
export {LIST_THEME_SHAPE_OBJECT as MENU_THEME_SHAPE_OBJECT} from '../List/List.tsx';

export const MENU = Symbol('Menu');

@themr(MENU)
export default class Menu extends React.Component {
	static propTypes = {
		...PROP_TYPES,
		ListComponent: React.PropTypes.func,
		onItemSelect: React.PropTypes.func
	}

	static defaultProps = {
		...DEFAULT_PROPS,
		ListComponent: List
	}

	render() {
		const {children, ListComponent} = this.props;

		return (
			<ListComponent {...this.props}>
				{React.Children.map(children, child => {
					return React.cloneElement(child, {
						onSelect: this.props.onItemSelect
					});
				})}
			</ListComponent>
		);
	}
}
