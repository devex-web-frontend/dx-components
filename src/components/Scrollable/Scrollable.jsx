import React from 'react';
import ResizeDetector from '../ResizeDetector/ResizeDetector';
import {themr} from 'react-css-themr';
import {PURE} from 'dx-util/src/react/pure';
import classnames from 'classnames';

export const SCROLLABLE = Symbol('Scrollable');

@PURE
@themr(SCROLLABLE)
export default class Scrollable extends React.Component {
	static propTypes = {
		ResizeDetector: React.PropTypes.func,
		children: React.PropTypes.element,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string,
			wrapper: React.PropTypes.string,
			content: React.PropTypes.string,
			scrollbar: React.PropTypes.string,
			scrollbar_vertical: React.PropTypes.string,
			scrollbar_horizontal: React.PropTypes.string
		})
	}

	static defaultProps = {
		ResizeDetector
	}

	render() {
		const {ResizeDetector, theme} = this.props;
		const children = React.Children.only(this.props.children);

		const className = classnames(
			theme.container,
			children.props.className || ''
		);

		const verticalScrollbarClassName = classnames(
			theme.scrollbar,
			theme.scrollbar_vertical
		);

		const horizontalScrollbarClassName = classnames(
			theme.scrollbar,
			theme.scrollbar_horizontal
		);

		return (
			<div className={className}>
				<div className={theme.wrapper}>
					<div className={theme.content}>
						{React.cloneElement(children, {
							className: null
						})}
					</div>
					<div className={verticalScrollbarClassName}/>
					<div className={horizontalScrollbarClassName}/>
				</div>
				<ResizeDetector onResize={this.onResize}/>
			</div>
		);
	}

	onResize = e => {
		console.log(e);
	}
}