import React from 'react';
import {themr} from 'react-css-themr';
import classnames from 'classnames';

export const LIST = Symbol('List');

export const PROP_TYPES = {
	children: React.PropTypes.node,
	theme: React.PropTypes.shape({
		container: React.PropTypes.string
	}),
	level: React.PropTypes.number
};

export const DEFAULT_PROPS = {
	level: 0
};

@themr(LIST)
export default class List extends React.Component {
	static propTypes = PROP_TYPES;

	static defaultProps = DEFAULT_PROPS;

	render() {
		const {theme, level, children} = this.props;
		const className = classnames(theme.container, theme[`container_level_${level}`]);

		return (
			<ul className={className}>
				{React.Children.map(children, child => {
					return React.cloneElement(child, {
						level
					});
				})}
			</ul>
		);
	}
}