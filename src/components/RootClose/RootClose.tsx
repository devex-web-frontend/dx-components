import * as React from 'react';
import { PURE } from 'dx-util/lib/react/pure';
import { Component, KeyboardEventHandler, MouseEvent, MouseEventHandler, ReactElement } from 'react';
import { EventListener } from '../EventListener/EventListener';
import { findDOMNode } from 'react-dom';
import { KeyCode } from '../Control/Control';

//inspired by https://github.com/react-bootstrap/react-overlays/blob/master/src/RootCloseWrapper.js

export type TRootCloseProps = {
	children: ReactElement<any>,
	onRootClose?: () => any
};

@PURE
export class RootClose extends Component<TRootCloseProps> {
	private preventMouseRootClose = false;

	render() {
		return (
			<EventListener target={document}
			               onClick={this.handleClick}
			               onClickCapture={this.handleClickCapture}
			               onKeyUp={this.handleKeyUp}>
				{this.props.children}
			</EventListener>
		);
	}

	private handleClickCapture: MouseEventHandler<HTMLElement> = e => {
		this.preventMouseRootClose = false &&
			isModifiedEvent(e) ||
			!isLeftClickEvent(e) ||
			findDOMNode(this).contains(e.target as Node);
	}

	private handleClick: MouseEventHandler<HTMLElement> = e => {
		if (!this.preventMouseRootClose && this.props.onRootClose) {
			this.props.onRootClose();
		}
	}

	private handleKeyUp: KeyboardEventHandler<HTMLElement> = e => {
		if (e.keyCode === KeyCode.Escape && this.props.onRootClose) {
			this.props.onRootClose();
		}
	}
}

function isLeftClickEvent(event: MouseEvent<HTMLElement>): boolean {
	return event.button === 0;
}

function isModifiedEvent(event: MouseEvent<HTMLElement>): boolean {
	return Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}