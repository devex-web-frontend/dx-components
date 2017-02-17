import * as React from 'react';
export type TPopoverProps = {
	isOpened?: boolean,
	theme?: {}
	closeOnClickAway?: boolean,
	children?: React.ReactNode,
	anchor?: React.ReactNode,
	onRequestClose?: Function,
	placement?: string,
	align?: string,
	onMouseDown?: React.EventHandler<React.MouseEvent<Element>>
};
declare const Popover: React.ComponentClass<TPopoverProps>;
export default Popover;

export declare namespace ALIGN {
	export const LEFT: string;
	export const CENTER: string;
	export const RIGHT: string;
	export const TOP: string;
	export const MIDDLE: string;
	export const BOTTOM: string;
}

export declare namespace PLACEMENT {
	export const TOP: string;
	export const BOTTOM: string;
	export const LEFT: string;
	export const RIGHT: string;
}