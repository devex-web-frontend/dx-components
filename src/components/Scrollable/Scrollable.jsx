import React from 'react';
import ReactDOM from 'react-dom';
import {Scrollable as ScrollableControl} from 'scrollable/src/Scrollable';

export default class Scrollable extends React.Component {
	static propTypes = {
		children: React.PropTypes.element,
		onScroll: React.PropTypes.func,
		scrollTop: React.PropTypes.number,
		scrollLeft: React.PropTypes.number
	}

	_scrollable;
	_target;

	componentDidMount() {
		this._scrollable = new ScrollableControl(ReactDOM.findDOMNode(this));
		this._target = this._scrollable.result.detail.eventTarget;
		if (this.props.onScroll) {
			this._target.addEventListener('scroll', this.onScroll);
		}
		this.updateScroll();
	}

	componentWillUpdate(nextProps) {
		if (nextProps.onScroll && !this.props.onScroll) {
			this._target.addEventListener('scroll', this.onScroll);
		} else if (!nextProps.onScroll && this.props.onScroll) {
			this._target.removeEventListener('scroll', this.onScroll);
		}
	}

	componentDidUpdate(prevProps) {
		this.updateScroll();
	}

	componentWillUnmount() {
		this._target.removeEventListener('scroll', this.onScroll);
		this._scrollable.close();
	}

	render() {
		return React.Children.only(this.props.children);
	}

	updateScroll() {
		if (typeof this.props.scrollLeft !== 'undefined') {
			this._target.scrollLeft = this.props.scrollLeft;
		}
		if (typeof this.props.scrollTop !== 'undefined') {
			this._target.scrollTop = this.props.scrollTop;
		}
	}

	onScroll = e => {
		const {scrollLeft, scrollTop} = e.target;
		this.props.onScroll && this.props.onScroll(scrollLeft, scrollTop);
	}
}