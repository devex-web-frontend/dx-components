import React from 'react';
import ExpandableHandler, {EXPANDABLE_HANDLER_THEME} from './ExpandableHandler';
import classnames from 'classnames';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';

export const EXPANDABLE = Symbol('Expandable');

export const EXPANDABLE_THEME = {
	container: React.PropTypes.string,
	container_isExpanded: React.PropTypes.string,
	handler: React.PropTypes.shape(EXPANDABLE_HANDLER_THEME),
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
		onToggle: React.PropTypes.func
	}

	static defaultProps = {
		Handler: ExpandableHandler,
		isExpanded: false
	}

	componentWillReceiveProps(newProps) {
		const {isExpanded} = this.state;
		const {isExpanded: newIsExpanded} = newProps;
		if (isExpanded !== newIsExpanded) {
			this.setState({
				isExpanded: newIsExpanded
			});
		}
	}

	constructor(...args) {
		super(...args);
		const {isExpanded} = this.props;

		this.state = {
			isExpanded
		};
	}

	render() {
		const {theme, Handler, children} = this.props;
		const {isExpanded} = this.state;

		const className = classnames(theme.container, {
			[theme.container_isExpanded]: isExpanded
		});

		return (
			<div className={className}>
				<div className={theme.handler} onClick={this.onHandlerClick}>
					<Handler isExpanded={isExpanded} />
				</div>
				<div className={theme.content}>
					{children}
				</div>
			</div>
		);
	}

	onHandlerClick = () => {
		const {onToggle} = this.props;
		const {isExpanded} = this.state;

		this.setState({
			isExpanded: !isExpanded
		});

		onToggle && onToggle(!isExpanded);
	}
}