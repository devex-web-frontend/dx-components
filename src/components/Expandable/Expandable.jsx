import React from 'react';
import * as PropTypes from 'prop-types';

import ExpandableHandler, {EXPANDABLE_HANDLER_THEME} from './ExpandableHandler';
import classnames from 'classnames';
import {PURE} from 'dx-util/lib/react/pure';
import {themr} from 'react-css-themr';

export const EXPANDABLE = Symbol('Expandable');

export const EXPANDABLE_THEME = {
	container: PropTypes.string,
	container_isExpanded: PropTypes.string,
	Handler: PropTypes.shape(EXPANDABLE_HANDLER_THEME),
	content: PropTypes.string
};

@themr(EXPANDABLE)
@PURE
export default class Expandable extends React.Component {

	static propTypes = {
		children: PropTypes.node,
		Handler: PropTypes.func,
		isExpanded: PropTypes.bool,
		theme: PropTypes.shape(EXPANDABLE_THEME),
		onChange: PropTypes.func
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