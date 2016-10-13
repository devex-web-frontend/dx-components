import React from 'react';
import classnames from 'classnames';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';

export const EXPANDABLE = Symbol('Expandable');

export const EXPANDABLE_THEME = {
	container: React.PropTypes.string,
	container_isExpanded: React.PropTypes.string,
	handler: React.PropTypes.string,
	content: React.PropTypes.string
};

@themr(EXPANDABLE)
@PURE
export default class Expandable extends React.Component {

	static propTypes = {
		children: React.PropTypes.node,
		Handler: React.PropTypes.func,
		isExpanded: React.PropTypes.bool,
		theme: React.PropTypes.shape(EXPANDABLE_THEME)
	}

	static defaultProps = {
		isExpanded: false
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
		this.setState({
			isExpanded: !this.state.isExpanded
		});
	}
}