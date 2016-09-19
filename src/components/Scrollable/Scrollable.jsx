import React from 'react';
import ReactDOM from 'react-dom';
import {Scrollable as ScrollableControl, EVENT_SCROLLABLE} from 'scrollable/src/Scrollable';
import {CN_WITHHORIZONTALSCROLLBAR, CN_WITHVERTICALSCROLLBAR} from 'scrollable/src/Scrollable.constants';

export const SCROLLABLE = Symbol('Scrollable');

export default class Scrollable extends React.Component {
	static propTypes = {
		children: React.PropTypes.element,
		onScroll: React.PropTypes.func,
		onUpdate: React.PropTypes.func,
		scrollTop: React.PropTypes.number,
		scrollLeft: React.PropTypes.number
	}

	_scrollable;
	_result;

	componentDidMount() {
		this._scrollable = new ScrollableControl(ReactDOM.findDOMNode(this));
		this._scrollable.on(EVENT_SCROLLABLE.UPDATE, this.onScrollbaleUpdate);
		this._result = this._scrollable.result.detail;
		this._result.eventTarget = this._scrollable.result.detail.eventTarget;
		if (this.props.onScroll) {
			this._result.eventTarget.addEventListener('scroll', this.onScroll);
		}
		this.updateScroll();
	}

	componentWillUpdate(nextProps) {
		if (nextProps.onScroll && !this.props.onScroll) {
			this._result.eventTarget.addEventListener('scroll', this.onScroll);
		} else if (!nextProps.onScroll && this.props.onScroll) {
			this._result.eventTarget.removeEventListener('scroll', this.onScroll);
		}
	}

	componentDidUpdate(prevProps) {
		this.updateScroll();
	}

	componentWillUnmount() {
		this._result.eventTarget.removeEventListener('scroll', this.onScroll);
		this._scrollable.on(EVENT_SCROLLABLE.UPDATE, this.onScrollbaleUpdate);
		this._scrollable.close();
		delete this['_result'];
		delete this['_scrollable'];
	}

	render() {
		return React.Children.only(this.props.children);
	}

	updateScroll() {
		if (typeof this.props.scrollLeft !== 'undefined') {
			this._result.eventTarget.scrollLeft = this.props.scrollLeft;
		}
		if (typeof this.props.scrollTop !== 'undefined') {
			this._result.eventTarget.scrollTop = this.props.scrollTop;
		}
	}

	onScroll = e => {
		const {scrollLeft, scrollTop} = e.target;
		this.props.onScroll && this.props.onScroll(scrollLeft, scrollTop);
	}

	onScrollbaleUpdate = () => {
		if (this.props.onUpdate) {
			const withVerticalScrollbar = this._result.block.classList.contains(CN_WITHVERTICALSCROLLBAR);
			const withHorizontalScrollbar = this._result.block.classList.contains(CN_WITHHORIZONTALSCROLLBAR);
			this.props.onUpdate(withHorizontalScrollbar, withVerticalScrollbar);
		}
	}
}