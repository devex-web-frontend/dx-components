import React from 'react';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';
import classnames from 'classnames';

export const LINK = Symbol('Link');

@PURE
@themr(LINK)
export default class Link extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		href: React.PropTypes.string,
		target: React.PropTypes.string,
		rel: React.PropTypes.string,
		isDisabled: React.PropTypes.bool,
		processEmptyHash: React.PropTypes.bool,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string,
			container_isDisabled: React.PropTypes.string
		})
	}

	render() {
		const {isDisabled, rel, href, target, children, theme} = this.props;

		const className = classnames(
			theme.container,
			{
				[theme.container_isDisabled]: isDisabled
			}
		);

		return (
			<a href={href}
			   rel={rel}
			   target={target}
			   onClick={this.onClick}
			   className={className}>
				{children}
			</a>
		);
	}

	onClick = e => {
		if (this.props.isDisabled || !this.props.processEmptyHash && this.props.href === '#') {
			e.preventDefault();
		}
	}
}