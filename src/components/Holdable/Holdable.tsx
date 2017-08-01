import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ReactElement, EventHandler, MouseEvent, ComponentClass } from 'react';
import { ObjectClean } from 'typelevel-ts/lib';
import { PartialKeys } from 'dx-util/lib/object/object';

type THoldableChildProps = {
	onMouseDown: EventHandler<MouseEvent<Element>>,
	onMouseUp: EventHandler<MouseEvent<Element>>,
	onMouseLeave: EventHandler<MouseEvent<Element>>
};

export type TFullHoldableProps = {
	children: ReactElement<THoldableChildProps>,
	onHold: Function,
	delay: number,
	interval: number
};

class RawHoldable extends React.Component<TFullHoldableProps> {
	static propTypes = {
		children: PropTypes.element,
		delay: PropTypes.number,
		interval: PropTypes.number,
		onHold: PropTypes.func
	};

	private _timeoutId: any;
	private _intervalId: any;

	static defaultProps = {
		interval: 50,
		delay: 300
	};

	clearTimers() {
		clearTimeout(this._timeoutId);
		clearInterval(this._intervalId);
	}

	render() {
		const { children } = this.props;
		const { onMouseDown, onMouseUp, onMouseLeave } = children.props;

		return React.cloneElement(React.Children.only(children), {
			onMouseUp: (e: MouseEvent<Element>) => {
				this.onMouseUp();
				onMouseUp && onMouseUp(e);
			},
			onMouseDown: (e: MouseEvent<Element>) => {
				this.onMouseDown(e);
				onMouseDown && onMouseDown(e);
			},
			onMouseLeave: (e: MouseEvent<Element>) => {
				this.onMouseLeave();
				onMouseLeave && onMouseLeave(e);
			}
		});
	}

	onMouseDown = (e: MouseEvent<Element>) => {
		const { interval, delay, onHold } = this.props;

		this.clearTimers();
		this._timeoutId = setTimeout(() => {
			this._intervalId = setInterval(() => {
				onHold && onHold();
			}, interval);
		}, delay);
	}

	onMouseUp = () => {
		this.clearTimers();
	}

	onMouseLeave = () => {
		this.clearTimers();
	}
}

export type THoldableProps = ObjectClean<PartialKeys<TFullHoldableProps, 'delay' | 'interval'>>;
export const Holdable: ComponentClass<THoldableProps> = RawHoldable;