import * as React from 'react';
import { Component, ReactElement } from 'react';
import { PURE } from 'dx-util/lib/react/pure';
import { shallowEqual } from 'dx-util/lib/object/fb';

type Handlers = {
	[onEvent: string]: Function
};

export type TEventListenerProps = {
	[onEvent: string]: Function | boolean | string | object | undefined,
	capture?: boolean,
	target: EventTarget | string,
	children: ReactElement<any>
};

const ON_MARKER = 'on';
const CAPTURE_MARKER = 'Capture';

@PURE
export class EventListener extends Component<TEventListenerProps> {
	componentDidMount() {
		this.addListeners();
	}

	componentWillUpdate(nextProps: TEventListenerProps) {
		if (shouldResetListeners(this.props, nextProps)) {
			this.removeListeners();
		}
	}

	componentDidUpdate(prevProps: TEventListenerProps) {
		if (shouldResetListeners(prevProps, this.props)) {
			this.addListeners();
		}
	}

	componentWillUnmount() {
		this.removeListeners();
	}

	render() {
		return this.props.children;
	}

	private addListeners() {
		const target = this.getTarget();
		const handlers = this.getHandlers();
		Object.keys(handlers).forEach(key => {
			const capture = key.endsWith(CAPTURE_MARKER);
			const handler = handlers[key];
			const eventName = getEventName(key, capture);
			target.addEventListener(eventName, handler as any, capture);
		});
	}

	private removeListeners() {
		const target = this.getTarget();
		const handlers = this.getHandlers();
		Object.keys(handlers).forEach(key => {
			const capture = key.endsWith(CAPTURE_MARKER);
			const handler = handlers[key];
			const eventName = getEventName(key, capture);
			target.removeEventListener(eventName, handler as any, capture);
		});
	}

	private getTarget(): EventTarget {
		const { target } = this.props;
		if (typeof target === 'string') {
			return window[target];
		}
		return target;
	}

	private getHandlers(): Handlers {
		// noinspection JSUnusedLocalSymbols
		const { target, children, ...props } = this.props;
		const propKeys = Object.keys(props);
		const eventKeys = propKeys.filter(key => key.startsWith('on'));
		const handlers = eventKeys.reduce((acc, key) => {
			acc[key] = props[key];
			return acc;
		}, {});
		return handlers;
	}
}

function getEventName(rawEventName: string, capture?: boolean): string {
	const trimmedLeft = rawEventName.startsWith(ON_MARKER) ? rawEventName.substring(ON_MARKER.length) : rawEventName;
	const trimmed = capture ? trimmedLeft.substring(0, trimmedLeft.length - CAPTURE_MARKER.length) : trimmedLeft;
	return trimmed.toLowerCase();
}

function shouldResetListeners(prevProps: TEventListenerProps, nextProps: TEventListenerProps): boolean {
	const {children: prevChildren, ...oldProps} = prevProps;
	const {children: nextChildren, ...newProps} = nextProps;
	return !shallowEqual(oldProps, newProps);
}