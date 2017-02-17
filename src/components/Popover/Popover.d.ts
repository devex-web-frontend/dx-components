import * as React from 'react';
export type TPopoverProps = {
	isOpened?: boolean,
	theme?: {}
	closeOnClickAway?: boolean,
	children?: React.ReactNode,
	anchor?: React.ReactNode,
	onRequestClose?: Function,
	onMouseDown?: React.EventHandler<React.MouseEvent<Element>>
};
declare const Popover: React.ComponentClass<TPopoverProps>;
export default Popover;