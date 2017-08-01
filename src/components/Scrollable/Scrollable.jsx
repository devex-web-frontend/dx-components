import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';

import {
	CONTEXT_TYPES,
	EVENT_SCROLABLE,
	SCROLLABLE_CONTEXT_EMITTER,
	ScrollableInternalEmitter
} from './Scrollable.const';

import { SCROLLBAR_TYPE } from '../Scrollbar/Scrollbar';
import { ResizeDetector } from '../ResizeDetector/ResizeDetector.tsx';
import HorizontalScrollbar from '../Scrollbar/HorizontalScrollbar';
import VerticalScrollbar from '../Scrollbar/VerticalScrollbar';

import getScrollbarSize from '../Scrollbar/Scrollbar.util.js';
import * as PropTypes from 'prop-types';

export const SCROLLABLE = Symbol('Scrollable');

@themr(SCROLLABLE)
export default class Scrollable extends React.Component {

	static propTypes = {
		children: PropTypes.element,
		ResizeDetector: PropTypes.func,
		HorizontalScrollbar: PropTypes.func,
		VerticalScrollbar: PropTypes.func,
		theme: PropTypes.shape({
			scrollable: PropTypes.string,
			withHorizontalScrollbar: PropTypes.string,
			withVerticalScrollbar: PropTypes.string,
			scrollbar: PropTypes.string,
			container: PropTypes.string,
			wrapper: PropTypes.string,
			content: PropTypes.string,
			resizeDetector: PropTypes.string,
			horizontal_scrollbar__bar: PropTypes.string,
			vertical_scrollbar__bar: PropTypes.string,
		}),
		onUpdate: PropTypes.func,
		onScroll: PropTypes.func,
		scrollTop: PropTypes.number,
		scrollLeft: PropTypes.number
	}

	static defaultProps = {
		ResizeDetector,
		VerticalScrollbar,
		HorizontalScrollbar
	}

	static childContextTypes = CONTEXT_TYPES

	_withHorizontalScrollbar = false;
	_withVerticalScrollbar = false;
	_container;
	_scrollable;
	_emitter;

	state = {
		container: (void 0), //eslint-disable-line no-void
		scrollable: (void 0), //eslint-disable-line no-void
	}

	getChildContext() {
		const { theme } = this.props;
		return {
			size: getScrollbarSize(theme.container),
			[SCROLLABLE_CONTEXT_EMITTER]: this._emitter
		};
	}

	componentDidMount() {
		this.setState({
			container: this._container
		});

		this._emitter.on(EVENT_SCROLABLE.SCROLLBAR_UPDATE, this.onScrollbarUpdate);
		this._emitter.on(EVENT_SCROLABLE.SCROLL, this.onScroll);
	}

	componentWillUnmount() {
		this._emitter.off(EVENT_SCROLABLE.SCROLLBAR_UPDATE, this.onScrollbarUpdate);
		this._emitter.off(EVENT_SCROLABLE.SCROLL, this.onScroll);
	}

	componentWillMount() {
		this._emitter = new ScrollableInternalEmitter();
	}

	onScroll = (event) => {
		const { scrollLeft, scrollTop } = event.target;
		const { onScroll } = this.props;
		onScroll && onScroll(scrollLeft, scrollTop);
	}

	onScrollbarUpdate = (type, isVisible) => {
		const { onUpdate } = this.props;
		switch (type) {
			case SCROLLBAR_TYPE.VERTICAL: {
				this._withVerticalScrollbar = isVisible;
				break;
			}
			case SCROLLBAR_TYPE.HORIZONTAL: {
				this._withHorizontalScrollbar = isVisible;
				break;
			}
		}
		this.forceUpdate();
		onUpdate && onUpdate(this._withHorizontalScrollbar, this._withVerticalScrollbar);
	}

	render() {
		const {
			theme,
			ResizeDetector,
			VerticalScrollbar,
			HorizontalScrollbar
		} = this.props;

		const children = React.Children.only(this.props.children);

		const { container } = this.state;

		const className = classnames(theme.scrollable, {
			[theme.withHorizontalScrollbar]: this._withHorizontalScrollbar,
			[theme.withVerticalScrollbar]: this._withVerticalScrollbar
		}, children.props.className || '');

		const containerClassName = classnames(theme.scrollbar, {
			withBothScrollabars: this._withHorizontalScrollbar && this._withVerticalScrollbar
		});

		const resizeDetectorProps = {
			theme: {
				container: theme.resizeDetector
			},
			onResize: this.onResize
		};

		return (
			<div className={className} ref={el => this._scrollable = el}>
				<div className={theme.wrapper}>
					<div className={theme.container} ref={el => this._container = el}>
						<div className={theme.content}>
							{React.cloneElement(children, {
								className: null
							})}
							<ResizeDetector {...resizeDetectorProps} />
						</div>
					</div>
					{container && [
						<HorizontalScrollbar ref={el => this._horizontalScrollbar = el}
							key="horizontalScrollbar"
							container={container}
							scrollLeft={this.props.scrollLeft}
							theme={{
								bar: theme.horizontal_scrollbar__bar,
								container: containerClassName
							}} />,
						<VerticalScrollbar ref={el => this._verticalScrollbar = el}
							key="verticalScrollbar"
							container={container}
							scrollTop={this.props.scrollTop}
							theme={{
								bar: theme.vertical_scrollbar__bar,
								container: containerClassName
							}} />
					]}
				</div>
				<ResizeDetector {...resizeDetectorProps} />
			</div>
		);
	}

	onResize = (event) => {
		this._emitter.emit(EVENT_SCROLABLE.RESIZE);
	}
}