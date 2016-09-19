import React from 'react';
import {themr} from 'react-css-themr';
import classnames from 'classnames';

export const LIST = Symbol('List');
export const LIST_THEME_SHAPE_OBJECT = {
	container: React.PropTypes.string,
	itemGroup: React.PropTypes.string,
	itemGroup_header: React.PropTypes.string,
	itemGroup_collapsed: React.PropTypes.string
	//we don't define levels here
};

export const PROP_TYPES = {
	children: React.PropTypes.node,
	theme: React.PropTypes.shape(LIST_THEME_SHAPE_OBJECT),
	level: React.PropTypes.number
};

export const DEFAULT_PROPS = {};

export const CONTEXT_LEVEL_KEY = '__LIST_CONTEXT_LEVEL_KEY__';
export const CONTEXT_TYPES = {
	[CONTEXT_LEVEL_KEY]: React.PropTypes.number
};

@themr(LIST)
export default class List extends React.Component {
	static propTypes = PROP_TYPES;

	static defaultProps = DEFAULT_PROPS;

	static contextTypes = CONTEXT_TYPES;

	render() {
		const level = this.context[CONTEXT_LEVEL_KEY] || 0;
		const {theme, children} = this.props;
		const className = classnames(theme.container, theme[`container_level_${level}`]);

		return (
			<ul className={className}>
				{children}
			</ul>
		);
	}
}