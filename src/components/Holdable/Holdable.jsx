import React from 'react';
export default class Holdable extends React.Component {

	static propTypes = {
		children: React.PropTypes.element,
		delay: React.PropTypes.number,
		isDisabled: React.PropTypes.bool,
		interval: React.PropTypes.number,
		onHold: React.PropTypes.func
	}

	_timeout
	_interval;

	static defaultProps = {
		interval: 50,
		delay: 300
	};

	componentWillReceiveProps(newProps) {
		if (newProps.isDisabled) {
			this.stop();
		}
	}

	onMouseDown = () => {
		const {interval, delay, onHold} = this.props;
		this._timeout = setTimeout(() => {
			this._interval = setInterval(() => {
				onHold && onHold();
			}, interval);
		}, delay);
	}

	stop() {
		clearTimeout(this._timeout);
		clearInterval(this._interval);
	}

	onMouseUp = () => {
		this.stop();
	}

	render() {
		const {children: element, isDisabled} = this.props;
		const {onMouseDown, onMouseUp, ...props} = element.props;
		const newProps = {
			props,
			isDisabled,
			onMouseDown: () => {
				this.onMouseDown();
				onMouseDown && onMouseDown();
			},
			onMouseUp: () => {
				this.onMouseUp();
				onMouseUp && onMouseUp();
			}
		};

		return (
			React.cloneElement(element, newProps)
		);
	}
}