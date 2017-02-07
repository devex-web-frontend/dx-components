import * as React from 'react';
export type TPopoverProps = {
	isOpened?: boolean,
	theme?: {}
	closeOnClickAway?: boolean,
	children?: React.ReactNode,
	anchor?: React.ReactNode,
	onRequestClose?: Function
};
declare const Popover: React.ComponentClass<TPopoverProps>;
export default Popover;