import React from 'react';

import ExpandableHandler, {EXPANDABLE_HANDLER_THEME} from './ExpandableHandler';
import classnames from 'classnames';
import {PURE} from 'dx-util/lib/react/pure';
import {themr} from 'react-css-themr';

export const EXPANDABLE = Symbol('Expandable');

export const EXPANDABLE_THEME = {
	container: React.PropTypes.string,
	container_isExpanded: React.PropTypes.string,
	Handler: React.PropTypes.shape(EXPANDABLE_HANDLER_THEME),
	content: React.PropTypes.string
};

@themr(EXPANDABLE)
@PURE
export default class Expandable extends React.Component {

	static propTypes = {
		children: React.PropTypes.node,
		Handler: React.PropTypes.func,
		isExpanded: React.PropTypes.bool,
		theme: React.PropTypes.shape(EXPANDABLE_THEME),
		onChange: React.PropTypes.func
	}

	static defaultProps = {
		Handler: ExpandableHandler,
		isExpanded: false
	}

	render() {
		const {theme, Handler, isExpanded, children} = this.props;

		const className = classnames(theme.container, {
			[theme.container_isExpanded]: isExpanded
		});

		return (
			<div className={className}>
				<div className={theme.handler} onClick={this.onHandlerClick}>
					<Handler isExpanded={isExpanded} theme={theme.Handler} />
				</div>
				<div className={theme.content}>
					{children}
				</div>
			</div>
		);
	}

	onHandlerClick = () => {
		const {onChange, isExpanded} = this.props;

		onChange && onChange(!isExpanded);
	}
}