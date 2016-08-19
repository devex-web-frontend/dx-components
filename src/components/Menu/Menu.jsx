import React from 'react';
import {themr} from 'react-css-themr';
import List, {PROP_TYPES, DEFAULT_PROPS} from '../List/List.jsx';
export {LIST_THEME_SHAPE_OBJECT as MENU_THEME_SHAPE_OBJECT} from '../List/List.jsx';

export const MENU = Symbol('Menu');

@themr(MENU)
export default class Menu extends React.Component {
	static propTypes = {
		...PROP_TYPES,
		onItemSelect: React.PropTypes.func
	}

	static defaultProps = {
		...DEFAULT_PROPS
	}

	render() {
		const {children} = this.props;

		return (
			<List {...this.props}>
				{React.Children.map(children, child => {
					return React.cloneElement(child, {
						onSelect: this.props.onItemSelect
					});
				})}
			</List>
		);
	}
}
