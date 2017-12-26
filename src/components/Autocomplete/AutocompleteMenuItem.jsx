import React from 'react';
import { MenuItem } from '../Menu/Menu.tsx';
import { Highlight } from '../Highlight/Highlight.tsx';
import * as PropTypes from 'prop-types';

export const AUTOCOMPLETE_MENU_ITEM_THEME_SHAPE = {
	// ...MENU_ITEM_THEME_SHAPE
};

const AutocompleteMenuItem = props => {
	const { search, Highlight, ...menuItemProps } = props;

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
	search: PropTypes.string,
	theme: PropTypes.shape(AUTOCOMPLETE_MENU_ITEM_THEME_SHAPE),
	Highlight: PropTypes.func
};
AutocompleteMenuItem.defaultProps = {
	...MenuItem.defaultProps,
	search: '',
	theme: {
		Highlight: {}
	},
	Highlight
};

export default AutocompleteMenuItem;