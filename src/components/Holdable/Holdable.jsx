import React from 'react';

export default class Holdable extends React.Component {
	static propTypes = {
		children: React.PropTypes.element,
		delay: React.PropTypes.number,
		interval: React.PropTypes.number,
		onHold: React.PropTypes.func
	}

	_timeoutId = null;
	_intervalId = null;

	static defaultProps = {
		interval: 50,
		delay: 300
	};

	clearTimers() {
		if (this._timeoutId) {
			clearTimeout(this._timeoutId);
			this._timeoutId = null;
		}

		if (this._intervalId) {
			clearInterval(this._intervalId);
			this._intervalId = null;
		}
	}

	render() {
		const {children} = this.props;
		const {onMouseDown, onMouseUp, onMouseLeave} = children.props;

		return React.cloneElement(React.Children.only(children), {
			onMouseUp: e => {
				this.onMouseUp(e);
				onMouseUp && onMouseUp(e);
			},
			onMouseDown: e => {
				this.onMouseDown(e);
				onMouseDown && onMouseDown(e);
			},
			onMouseLeave: e => {
				this.onMouseLeave(e);
				onMouseLeave && onMouseLeave(e);
			}
		});
	}

	onMouseDown = e => {
		const {interval, delay, onHold} = this.props;

		this.clearTimers();
		this._timeoutId = setTimeout(() => {
			this._intervalId = setInterval(() => {
				onHold && onHold();
			}, interval);
		}, delay);
	}

	onMouseUp = e => {
		this.clearTimers();
	}

	onMouseLeave = e => {
		this.clearTimers();
	}
}