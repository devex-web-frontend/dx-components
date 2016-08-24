import React from 'react';
import {themr} from 'react-css-themr';
import classnames from 'classnames';
import {PURE} from 'dx-util/src/react/pure';

import {LIST} from './List.jsx';
export const PROP_TYPES = {
	children: React.PropTypes.node,
	level: React.PropTypes.number,
	theme: React.PropTypes.shape({
		item: React.PropTypes.string
	}),
	onClick: React.PropTypes.func
};

export const DEFAULT_PROPS = {
	level: 0
};

@PURE
@themr(LIST)
export default class ListItem extends React.Component {
	static propTypes = PROP_TYPES;

	static defaultProps = DEFAULT_PROPS;

	render() {
		const {theme, level, onClick, children} = this.props;
		const className = classnames(theme.item, theme[`item_level_${level}`]);

		return (
			<li className={className} onClick={onClick}>
				{children}
			</li>
		);
	}
}