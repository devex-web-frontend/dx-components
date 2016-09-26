import React from 'react';
import MenuItem, {MENU_ITEM_THEME_SHAPE} from '../Menu/MenuItem';
import Highlight, {HIGHLIGHT_THEME_SHAPE} from '../Highlight/Highlight';

export const AUTOCOMPLETE_MENU_ITEM_THEME_SHAPE = {
	...MENU_ITEM_THEME_SHAPE,
	Highlight: React.PropTypes.shape(HIGHLIGHT_THEME_SHAPE)
};

const AutocompleteMenuItem = props => {
	const {search, ...menuItemProps} = props;

	return (
		<MenuItem {...menuItemProps} text={props.value}>
			<Highlight search={search} theme={props.theme.Highlight}>
				{props.value}
			</Highlight>
		</MenuItem>
	);
};

AutocompleteMenuItem.propTypes = {
	...MenuItem.propTypes,
	search: React.PropTypes.string,
	theme: React.PropTypes.shape(AUTOCOMPLETE_MENU_ITEM_THEME_SHAPE)
};
AutocompleteMenuItem.defaultProps = {
	...MenuItem.defaultProps,
	search: ''
};

export default AutocompleteMenuItem;