import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Portal from 'react-overlays/lib/Portal';
import prefix from 'dx-util/lib/dom/prefix';
import * as classnames from 'classnames';

import { PURE } from 'dx-util/lib/react/pure';
import { BoundsUpdateDetector } from '../BoundsUpdateDetector/BoundsUpdateDetector';
import { THROTTLE } from 'dx-util/lib/function/throttle';

import { withTheme } from '../../util/react/withTheme';
import { ComponentClass, MouseEventHandler, ReactNode } from 'react';
import { ObjectClean } from 'typelevel-ts';
import { PartialKeys } from 'dx-util/lib/object/object';
import { ReactRef } from '../../util/react/typings';
import { EventListener } from '../EventListener/EventListener';
import { RootClose } from '../RootClose/RootClose';

type TSize = {
	width: number,
	height: number
};

export const POPOVER = Symbol('Popover');

export enum PopoverPlacement {
	Top = 'Top',
	Bottom = 'Bottom',
	Left = 'Left',
	Right = 'Right'
}

export enum PopoverAlign {
	Top = 'Top',
	Bottom = 'Bottom',
	Left = 'Left',
	Right = 'Right',
	Middle = 'Middle',
	Center = 'Center'
}

export type TFullPopoverProps = {
	children: ReactNode,
	isOpened?: boolean,
	closeOnClickAway?: boolean,
	anchor?: ReactRef,
	onMouseDown?: MouseEventHandler<Element>,
	placement: PopoverPlacement,
	align: PopoverAlign,
	container?: Element | null,
	onRequestClose?: () => any,
	hasArrow?: boolean,
	theme: {
		container?: string,
		container_hasArrow?: string,
		container_placementTop?: string,
		container_placementBottom?: string,
		container_placementLeft?: string,
		container_placementRight?: string,
		content?: string,
		arrow?: string
	},
	style?: object
};

type TPopoverState = {
	finalPlacement?: PopoverPlacement,
	finalAlign?: PopoverAlign,
	top?: number,
	left?: number,
	arrowOffset?: number
};

@PURE
class RawPopover extends React.Component<TFullPopoverProps, TPopoverState> {
	static defaultProps = {
		align: PopoverAlign.Left,
		placement: PopoverPlacement.Bottom
	};

	state: TPopoverState = {};

	private _needsUpdate = false;
	private _anchor?: Element;
	private _popover: Element;
	private _popoverSize: TSize;

	componentDidMount() {
		if (this.props.isOpened) {
			if (this.props.anchor) {
				this._anchor = ReactDOM.findDOMNode(this.props.anchor);
			}
			this._popoverSize = this.getPopoverSize();
			this.updatePosition();
		}
	}

	componentWillReceiveProps(nextProps: TFullPopoverProps) {
		if (nextProps.isOpened && nextProps.anchor) {
			this._needsUpdate = true;
			this._anchor = ReactDOM.findDOMNode(nextProps.anchor);
		}
	}

	componentDidUpdate(prevProps: TFullPopoverProps) {
		//@PURE check is passed here - update anyway
		if (this._needsUpdate) {
			/** set in {@link componentWillReceiveProps} */
			this._needsUpdate = false;
			this._popoverSize = this.getPopoverSize();
			this.updatePosition();
		}
	}

	render() {
		const {
			container,
			closeOnClickAway,
			theme,
			hasArrow,
			onMouseDown,
			isOpened,
			onRequestClose,
			anchor
		} = this.props;

		if (!isOpened || !anchor) {
			return null;
		}

		const { top, left, arrowOffset, finalPlacement, finalAlign } = this.state;

		const isMeasured = !!finalAlign && !!finalPlacement;

		let style;
		let popoverClassName = classnames(theme.container);
		if (isMeasured && finalPlacement) {
			style = prefix({
				transform: `translate(${left || 0}px, ${top || 0}px)`
			});
			popoverClassName = classnames(
				popoverClassName,
				{
					[theme.container_hasArrow as string]: hasArrow
				},
				getPlacementClassName(finalPlacement)
			);
		}
		style = {
			...style,
			...this.props.style
		};

		let child = (
			<BoundsUpdateDetector onUpdate={this.onSizeUpdate}>
				<div ref={(el: any) => this._popover = el}
				     style={style}
				     onMouseDown={onMouseDown}
				     className={popoverClassName}>
					<div className={theme.content}>
						{isMeasured && finalPlacement && finalAlign && hasArrow && (
							<div className={theme.arrow}
							     style={getArrowStyle(finalPlacement, finalAlign, arrowOffset)}/>
						)}
						{this.props.children}
					</div>
				</div>
			</BoundsUpdateDetector>
		);
		if (closeOnClickAway) {
			child = <RootClose onRootClose={onRequestClose}>{child}</RootClose>;
		}

		if (container) {
			child = <EventListener target={container} onScroll={this.onScroll}>{child}</EventListener>;
		}

		return (
			<EventListener onResize={this.onResize} target="window">
				<Portal container={container}>
					{child}
				</Portal>
			</EventListener>
		);
	}

	getPopoverSize(): TSize {
		const popover: HTMLElement = ReactDOM.findDOMNode(this._popover);
		return {
			height: popover.offsetHeight,
			width: popover.offsetWidth
		};
	}

	updatePosition() {
		if (!this._anchor) {
			return;
		}

		const anchorRect = this._anchor.getBoundingClientRect();
		const { placement, align, hasArrow } = this.props;

		let arrowOffset;
		let finalPlacement;
		let finalAlign;
		const topResult: TVerticalPosition = movePopoverVertically(
			placement,
			align,
			anchorRect.top,
			anchorRect.bottom,
			this._popoverSize.height,
			true
		)!;
		const leftResult: THorizontalPosition = movePopoverHorizontally(
			placement,
			align,
			anchorRect.left,
			anchorRect.right,
			this._popoverSize.width,
			true
		)!;

		//additional
		if (placement === PopoverPlacement.Top || placement === PopoverPlacement.Bottom) {
			finalPlacement = topResult.placement;
			finalAlign = leftResult.align;
			if (hasArrow) {
				//horizontal arrow offset
				arrowOffset = Math.round((anchorRect.right - anchorRect.left) / 2);
			}
		} else if (placement === PopoverPlacement.Left || placement === PopoverPlacement.Right) {
			finalPlacement = leftResult.placement;
			finalAlign = topResult.align;
			if (hasArrow) {
				//vertical arrow offset
				arrowOffset = Math.round((anchorRect.bottom - anchorRect.top) / 2);
			}
		}

		this.setState({
			top: Math.round(topResult.top) + window.pageYOffset,
			left: Math.round(leftResult.left) + window.pageXOffset,
			finalPlacement,
			finalAlign,
			arrowOffset
		});
	}

	onSizeUpdate = (newSize: TSize) => {
		this._popoverSize = newSize;
		this.updatePosition();
	}

	onResize = () => {
		this.handleResize();
	};

	@THROTTLE(100)
	handleResize() {
		this.updatePosition();
	}

	onScroll = () => {
		this.handleScroll();
	}

	@THROTTLE(100)
	handleScroll() {
		this.props.onRequestClose && this.props.onRequestClose();
	}
}

export type TPopoverProps = ObjectClean<PartialKeys<TFullPopoverProps, 'theme' | 'align' | 'placement'>>;
export const Popover: ComponentClass<TPopoverProps> = withTheme(POPOVER)(RawPopover);

function getArrowStyle(placement: PopoverPlacement,
                       align: PopoverAlign,
                       offset?: number): {} | undefined {
	switch (placement) {
		case PopoverPlacement.Top: //fallthrough
		case PopoverPlacement.Bottom: {
			switch (align) {
				case PopoverAlign.Left: {
					return prefix({
						left: offset,
						transform: 'translateX(-50%)'
					});
				}
				case PopoverAlign.Center: {
					return prefix({
						left: '50%',
						transform: 'translateX(-50%)'
					});
				}
				case PopoverAlign.Right: {
					return prefix({
						right: offset,
						transform: 'translateX(50%)'
					});
				}
			}
			break;
		}
		case PopoverPlacement.Left: //fallthrough
		case PopoverPlacement.Right: {
			switch (align) {
				case PopoverAlign.Top: {
					return prefix({
						top: offset,
						transform: 'translateY(-50%)'
					});
				}
				case PopoverAlign.Middle: {
					return prefix({
						top: '50%',
						transform: 'translateY(-50%)'
					});
				}
				case PopoverAlign.Bottom: {
					return prefix({
						bottom: offset,
						transform: 'translateY(50%)'
					});
				}
			}
		}
	}

	return undefined;
}

type TVerticalPosition = {
	top: number,
	placement: PopoverPlacement,
	align: PopoverAlign
};

function movePopoverVertically(placement: PopoverPlacement,
                               align: PopoverAlign,
                               anchorTop: number,
                               anchorBottom: number,
                               popoverHeight: number,
                               checkBounds = false): TVerticalPosition | undefined {
	switch (placement) {
		case PopoverPlacement.Top: {
			const top = anchorTop - popoverHeight;
			if (checkBounds && top < 0) {
				return movePopoverVertically(
					PopoverPlacement.Bottom, align, anchorTop, anchorBottom, popoverHeight
				);
			}
			return {
				top,
				placement,
				align
			};
		}
		case PopoverPlacement.Bottom: {
			const top = anchorBottom;
			if (checkBounds && top + popoverHeight > window.innerHeight) {
				return movePopoverVertically(
					PopoverPlacement.Top, align, anchorTop, anchorBottom, popoverHeight
				);
			}
			return {
				top,
				placement,
				align
			};
		}
	}

	switch (align) {
		case PopoverAlign.Top: {
			const top = anchorTop;
			if (checkBounds && top + popoverHeight > window.innerHeight) {
				const resultForMiddle = movePopoverVertically(
					placement, PopoverAlign.Middle, anchorTop, anchorBottom, popoverHeight
				);
				if (resultForMiddle && resultForMiddle.top + popoverHeight > window.innerHeight) {
					return movePopoverVertically(
						placement, PopoverAlign.Bottom, anchorTop, anchorBottom, popoverHeight
					);
				}
				return resultForMiddle;
			}
			return {
				top,
				placement,
				align
			};
		}
		case PopoverAlign.Middle: {
			const top = anchorTop + (anchorBottom - anchorTop) / 2 - popoverHeight / 2;
			if (checkBounds) {
				if (top < 0) {
					return movePopoverVertically(
						placement, PopoverAlign.Top, anchorTop, anchorBottom, popoverHeight
					);
				} else if (top + popoverHeight > window.innerHeight) {
					return movePopoverVertically(
						placement, PopoverAlign.Bottom, anchorTop, anchorBottom, popoverHeight
					);
				}
			}
			return {
				top,
				placement,
				align
			};
		}
		case PopoverAlign.Bottom: {
			const top = anchorBottom - popoverHeight;
			if (checkBounds && top < 0) {
				const resultForMiddle = movePopoverVertically(
					placement, PopoverAlign.Middle, anchorTop, anchorBottom, popoverHeight
				);
				if (resultForMiddle && resultForMiddle.top < 0) {
					return movePopoverVertically(
						placement, PopoverAlign.Top, anchorTop, anchorBottom, popoverHeight
					);
				}
				return resultForMiddle;
			}
			return {
				top,
				placement,
				align
			};
		}
	}

	return undefined;
}

type THorizontalPosition = {
	left: number,
	placement: PopoverPlacement,
	align: PopoverAlign
};

function movePopoverHorizontally(placement: PopoverPlacement,
                                 align: PopoverAlign,
                                 anchorLeft: number,
                                 anchorRight: number,
                                 popoverWidth: number,
                                 checkBounds = false): THorizontalPosition | undefined {
	switch (placement) {
		case PopoverPlacement.Left: {
			const left = anchorLeft - popoverWidth;
			if (checkBounds && left < 0) {
				return movePopoverHorizontally(
					PopoverPlacement.Right, align, anchorLeft, anchorRight, popoverWidth
				);
			}
			return {
				left,
				placement,
				align
			};
		}
		case PopoverPlacement.Right: {
			const left = anchorRight;
			if (checkBounds && left + popoverWidth > window.innerWidth) {
				return movePopoverHorizontally(
					PopoverPlacement.Left, align, anchorLeft, anchorRight, popoverWidth
				);
			}
			return {
				left,
				placement,
				align
			};
		}
	}

	switch (align) {
		case PopoverAlign.Left: {
			const left = anchorLeft;
			if (checkBounds && left + popoverWidth > window.innerWidth) {
				const resultForCenter = movePopoverHorizontally(
					placement, PopoverAlign.Center, anchorLeft, anchorRight, popoverWidth
				);
				if (resultForCenter && resultForCenter.left + popoverWidth > window.innerWidth) {
					return movePopoverHorizontally(
						placement, PopoverAlign.Right, anchorLeft, anchorRight, popoverWidth
					);
				}
				return resultForCenter;
			}
			return {
				left,
				placement,
				align
			};
		}
		case PopoverAlign.Center: {
			const left = anchorLeft + (anchorRight - anchorLeft) / 2 - popoverWidth / 2;
			if (checkBounds) {
				if (left < 0) {
					return movePopoverHorizontally(
						placement, PopoverAlign.Left, anchorLeft, anchorRight, popoverWidth
					);
				} else if (left + popoverWidth > window.innerWidth) {
					return movePopoverHorizontally(
						placement, PopoverAlign.Right, anchorLeft, anchorRight, popoverWidth
					);
				}
			}
			return {
				left,
				placement,
				align
			};
		}
		case PopoverAlign.Right: {
			const left = anchorRight - popoverWidth;
			if (checkBounds && left < 0) {
				const resultForCenter = movePopoverHorizontally(
					placement, PopoverAlign.Center, anchorLeft, anchorRight, popoverWidth
				);
				if (resultForCenter && resultForCenter.left < 0) {
					return movePopoverHorizontally(
						placement, PopoverAlign.Left, anchorLeft, anchorRight, popoverWidth
					);
				}
				return resultForCenter;
			}
			return {
				left,
				placement,
				align
			};
		}
	}

	return undefined;
}

function getPlacementClassName(placement: PopoverPlacement): keyof TFullPopoverProps['theme'] {
	switch (placement) {
		case PopoverPlacement.Bottom: {
			return 'container_placementBottom';
		}
		case PopoverPlacement.Top: {
			return 'container_placementTop';
		}
		case PopoverPlacement.Left: {
			return 'container_placementLeft';
		}
		case PopoverPlacement.Right: {
			return 'container_placementRight';
		}
	}
}