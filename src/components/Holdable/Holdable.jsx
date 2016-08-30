import React from 'react';
import EventListener from 'react-event-listener';

export default class Holdable extends React.Component {

	static propTypes = {
		children: React.PropTypes.element,
		delay: React.PropTypes.number,
		isDisabled: React.PropTypes.bool,
		interval: React.PropTypes.number,
		onHold: React.PropTypes.func
	}

	_timeoutId;
	_intervalId;

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
		this._timeoutId = setTimeout(() => {
			this._intervalId = setInterval(() => {
				onHold && onHold();
			}, interval);

			this.forceUpdate();
		}, delay);
	}

	stop() {
		if (this._timeoutId) {
			clearTimeout(this._timeoutId);
			delete this['_timeoutId'];
		}

		if (this._intervalId) {
			clearInterval(this._intervalId);
			delete this['_intervalId'];
		}
	}

	onMouseUp = () => {
		this.stop();
	}

	renderUpdatedChild(element, props) {
		const newElement = React.cloneElement(element, props);
		if (this._intervalId) {
			return (
				<EventListener capture={true}
				               onMouseUp={this.onMouseUp}
				               target="window">
					{newElement}
				</EventListener>
			);
		} else {
			return newElement;
		}
	}

	render() {
		const {children: element, isDisabled} = this.props;

		const {onMouseDown, onMouseUp, ...props} = element.props;
		const newProps = {
			props,
			ref: (el) => this._element = el,
			isDisabled,
			onMouseUp: () => {
				this.onMouseUp();
				onMouseUp && onMouseUp();
			},
			onMouseDown: () => {
				this.onMouseDown();
				onMouseDown && onMouseDown();
			}
		};

		return this.renderUpdatedChild(element, newProps);
	}
}