import React from 'react';
import ReactDOM from 'react-dom';
import Portal from 'react-overlays/lib/Portal';
import RootClose from 'react-overlays/lib/RootCloseWrapper';
import prefix from 'dx-util/src/dom/prefix';
import EventListener from 'react-event-listener';
import classnames from 'classnames';
import {themr} from 'react-css-themr';

import {PURE} from 'dx-util/src/react/pure.js';
import UpdateDetector from '../BoundsUpdateDetector/BoundsUpdateDetector.jsx';
import {THROTTLE} from 'dx-util/src/function/throttle.js';

/**
 * @enum {String}
 */
export const PLACEMENT = {
	TOP: 'PLACEMENT.TOP',
	BOTTOM: 'PLACEMENT.BOTTOM',
	LEFT: 'PLACEMENT.LEFT',
	RIGHT: 'PLACEMENT.RIGHT',
};

/**
 * @enum {String}
 */
export const ALIGN = {
	LEFT: 'ALIGN.LEFT',
	CENTER: 'ALIGN.CENTER',
	RIGHT: 'ALIGN.RIGHT',
	TOP: 'ALIGN.TOP',
	MIDDLE: 'ALIGN.MIDDLE',
	BOTTOM: 'ALIGN.BOTTOM',
};

const PLACEMENT_MODIFIER_MAP = {
	[PLACEMENT.TOP]: 'placementTop',
	[PLACEMENT.BOTTOM]: 'placementBottom',
	[PLACEMENT.LEFT]: 'placementLeft',
	[PLACEMENT.RIGHT]: 'placementRight'
};

export const POPOVER_THEME_SHAPE_OBJECT = {
	container: React.PropTypes.string,
	container_hasArrow: React.PropTypes.string,
	container_placementTop: React.PropTypes.string,
	container_placementBottom: React.PropTypes.string,
	container_placementLeft: React.PropTypes.string,
	container_placementRight: React.PropTypes.string,
	content: React.PropTypes.string,
	arrow: React.PropTypes.string
};

export const POPOVER = Symbol('Popover');

@PURE
@themr(POPOVER)
export default class Popover extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		isOpened: React.PropTypes.bool,
		closeOnClickAway: React.PropTypes.bool,
		anchor: React.PropTypes.object,

		//placement for popover relatively to anchor
		placement: React.PropTypes.oneOf(Object.values(PLACEMENT)),

		//align for popover relatively to anchor and current placement
		align(props) {
			switch (props.placement) {
				case PLACEMENT.TOP: //fallthrough
				case PLACEMENT.BOTTOM:
					//horizontal align for vertical placement
					if (![ALIGN.LEFT, ALIGN.CENTER, ALIGN.RIGHT].includes(props.align)) {
						throw new Error(
							`For placement ${props.placement} supported aligns are: 
							ALIGN.LEFT ALIGN.CENTER, ALIGN.RIGHT`
						);
					}
					break;
				case PLACEMENT.LEFT: //fallthrough
				case PLACEMENT.RIGHT:
					//vertical align for horizontal placement
					if (![ALIGN.TOP, ALIGN.MIDDLE, ALIGN.BOTTOM].includes(props.align)) {
						throw new Error(
							`For placement ${props.placement} supported aligns are:
							ALIGN.TOP, ALIGN.MIDDLE, ALIGN.BOTTOM`
						);
					}
			}
		},

		container: Portal.propTypes.container,

		onRequestClose: React.PropTypes.func,

		hasArrow: React.PropTypes.bool,

		theme: React.PropTypes.shape(POPOVER_THEME_SHAPE_OBJECT)
	};

	static defaultProps = {
		align: ALIGN.LEFT,
		placement: PLACEMENT.BOTTOM
	};

	state = {};

	_needsUpdate = false;
	_anchor;
	_popover;

	componentDidMount() {
		if (this.props.isOpened) {
			if (this.props.anchor) {
				this._anchor = ReactDOM.findDOMNode(this.props.anchor);
			}
			this._popoverSize = this.getPopoverSize();
			this.updatePosition();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isOpened && nextProps.anchor) {
			this._needsUpdate = true;
			this._anchor = ReactDOM.findDOMNode(nextProps.anchor);
		}
	}

	componentDidUpdate(prevProps) {
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
			isOpened,
			onRequestClose,
			anchor
		} = this.props;

		if (!isOpened || !anchor) {
			return null;
		}

		const {top, left, arrowOffset, finalPlacement, finalAlign} = this.state;

		const isMeasured = !!finalAlign && !!finalPlacement;

		let style;
		let popoverClassName = classnames(theme.container);
		if (isMeasured) {
			style = prefix({
				transform: `translate(${left || 0}px, ${top || 0}px)`
			});
			popoverClassName = classnames(
				popoverClassName,
				{
					[theme.container_hasArrow]: hasArrow
				},
				[
					PLACEMENT_MODIFIER_MAP[finalPlacement]
				].map(mod => theme[`container_${mod}`])
			);
		}

		let child = (
			<UpdateDetector onUpdate={this.onSizeUpdate}>
				<div ref={el => this._popover = el}
					 style={style}
					 className={popoverClassName}>
					<div className={theme.content}>
						{isMeasured && hasArrow && (
							<div className={theme.arrow}
								 style={getArrowStyle(finalPlacement, finalAlign, arrowOffset)}/>
						)}
						{this.props.children}
					</div>
				</div>
			</UpdateDetector>
		);
		if (closeOnClickAway) {
			child = (
				<RootClose onRootClose={onRequestClose}>
					{child}
				</RootClose>
			);
		}

		return (
			<EventListener capture={false}
						   onResize={this.onResize}
						   onScroll={this.onScroll}
						   target="window">
				<Portal container={container}>
					{child}
				</Portal>
			</EventListener>
		);
	}

	getPopoverSize() {
		const popover = ReactDOM.findDOMNode(this._popover);
		return {
			height: popover.offsetHeight,
			width: popover.offsetWidth
		};
	}

	updatePosition() {
		const anchorRect = this._anchor.getBoundingClientRect();
		const {placement, align, hasArrow} = this.props;

		let arrowOffset;
		let finalPlacement;
		let finalAlign;
		const topResult = movePopoverVertically(
			placement,
			align,
			anchorRect.top,
			anchorRect.bottom,
			this._popoverSize.height,
			true
		);
		const leftResult = movePopoverHorizontally(
			placement,
			align,
			anchorRect.left,
			anchorRect.right,
			this._popoverSize.width,
			true
		);

		//additional
		if (placement === PLACEMENT.TOP || placement === PLACEMENT.BOTTOM) {
			finalPlacement = topResult.placement;
			finalAlign = leftResult.align;
			if (hasArrow) {
				//horizontal arrow offset
				arrowOffset = Math.round((anchorRect.right - anchorRect.left) / 2);
			}
		} else if (placement === PLACEMENT.LEFT || placement === PLACEMENT.RIGHT) {
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

	onSizeUpdate = (newSize) => {
		this._popoverSize = newSize;
		this.updatePosition();
	}

	@THROTTLE(100)
	onResize = () => {
		this.updatePosition();
	};

	@THROTTLE(100)
	onScroll = () => {
		this.updatePosition();
	}
}

/**
 * @param {PLACEMENT} placement
 * @param {ALIGN} align
 * @param {number} offset
 * @returns {{}}
 */
function getArrowStyle(placement, align, offset) {
	switch (placement) {
		case PLACEMENT.TOP: //fallthrough
		case PLACEMENT.BOTTOM: {
			switch (align) {
				case ALIGN.LEFT: {
					return prefix({
						left: offset,
						transform: 'translateX(-50%)'
					});
				}
				case ALIGN.CENTER: {
					return prefix({
						left: '50%',
						transform: 'translateX(-50%)'
					});
				}
				case ALIGN.RIGHT: {
					return prefix({
						right: offset,
						transform: 'translateX(50%)'
					});
				}
			}
			break;
		}
		case PLACEMENT.LEFT: //fallthrough
		case PLACEMENT.RIGHT: {
			switch (align) {
				case ALIGN.TOP: {
					return prefix({
						top: offset,
						transform: 'translateY(-50%)'
					});
				}
				case ALIGN.MIDDLE: {
					return prefix({
						top: '50%',
						transform: 'translateY(-50%)'
					});
				}
				case ALIGN.BOTTOM: {
					return prefix({
						bottom: offset,
						transform: 'translateY(50%)'
					});
				}
			}
		}
	}
}

/**
 * @param {PLACEMENT} placement
 * @param {ALIGN} align
 * @param {Number} anchorTop
 * @param {Number} anchorBottom
 * @param {Number} popoverHeight
 * @param {Boolean} [checkBounds=false]
 * @recursive
 * @returns {{top: Number, placement: PLACEMENT, align: ALIGN}}
 */
function movePopoverVertically(placement,
							   align,
							   anchorTop,
							   anchorBottom,
							   popoverHeight,
							   checkBounds = false) {
	switch (placement) {
		case PLACEMENT.TOP: {
			const top = anchorTop - popoverHeight;
			if (checkBounds && top < 0) {
				return movePopoverVertically(
					PLACEMENT.BOTTOM, align, anchorTop, anchorBottom, popoverHeight
				);
			}
			return {
				top,
				placement,
				align
			};
		}
		case PLACEMENT.BOTTOM: {
			const top = anchorBottom;
			if (checkBounds && top + popoverHeight > window.innerHeight) {
				return movePopoverVertically(
					PLACEMENT.TOP, align, anchorTop, anchorBottom, popoverHeight
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
		case ALIGN.TOP: {
			const top = anchorTop;
			if (checkBounds && top + popoverHeight > window.innerHeight) {
				const resultForMiddle = movePopoverVertically(
					placement, ALIGN.MIDDLE, anchorTop, anchorBottom, popoverHeight
				);
				if (resultForMiddle.top + popoverHeight > window.innerHeight) {
					return movePopoverVertically(
						placement, ALIGN.BOTTOM, anchorTop, anchorBottom, popoverHeight
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
		case ALIGN.MIDDLE: {
			const top = anchorTop + (anchorBottom - anchorTop) / 2 - popoverHeight / 2;
			if (checkBounds) {
				if (top < 0) {
					return movePopoverVertically(
						placement, ALIGN.TOP, anchorTop, anchorBottom, popoverHeight
					);
				} else if (top + popoverHeight > window.innerHeight) {
					return movePopoverVertically(
						placement, ALIGN.BOTTOM, anchorTop, anchorBottom, popoverHeight
					);
				}
			}
			return {
				top,
				placement,
				align
			};
		}
		case ALIGN.BOTTOM: {
			const top = anchorBottom - popoverHeight;
			if (checkBounds && top < 0) {
				const resultForMiddle = movePopoverVertically(
					placement, ALIGN.MIDDLE, anchorTop, anchorBottom, popoverHeight
				);
				if (resultForMiddle.top < 0) {
					return movePopoverVertically(
						placement, ALIGN.TOP, anchorTop, anchorBottom, popoverHeight
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
}

/**
 * @param {PLACEMENT} placement
 * @param {ALIGN} align
 * @param {Number} anchorLeft
 * @param {Number} anchorRight
 * @param {Number} popoverWidth
 * @param {Boolean} [checkBounds=false]
 * @recursive
 * @returns {{left: Number, placement: PLACEMENT, align: ALIGN}}
 */
function movePopoverHorizontally(placement,
								 align,
								 anchorLeft,
								 anchorRight,
								 popoverWidth,
								 checkBounds = false) {
	switch (placement) {
		case PLACEMENT.LEFT: {
			const left = anchorLeft - popoverWidth;
			if (checkBounds && left < 0) {
				return movePopoverHorizontally(
					PLACEMENT.RIGHT, align, anchorLeft, anchorRight, popoverWidth
				);
			}
			return {
				left,
				placement,
				align
			};
		}
		case PLACEMENT.RIGHT: {
			const left = anchorRight;
			if (checkBounds && left + popoverWidth > window.innerWidth) {
				return movePopoverHorizontally(
					PLACEMENT.LEFT, align, anchorLeft, anchorRight, popoverWidth
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
		case ALIGN.LEFT: {
			const left = anchorLeft;
			if (checkBounds && left + popoverWidth > window.innerWidth) {
				const resultForCenter = movePopoverHorizontally(
					placement, ALIGN.CENTER, anchorLeft, anchorRight, popoverWidth
				);
				if (resultForCenter.left + popoverWidth > window.innerWidth) {
					return movePopoverHorizontally(
						placement, ALIGN.RIGHT, anchorLeft, anchorRight, popoverWidth
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
		case ALIGN.CENTER: {
			const left = anchorLeft + (anchorRight - anchorLeft) / 2 - popoverWidth / 2;
			if (checkBounds) {
				if (left < 0) {
					return movePopoverHorizontally(
						placement, ALIGN.LEFT, anchorLeft, anchorRight, popoverWidth
					);
				} else if (left + popoverWidth > window.innerWidth) {
					return movePopoverHorizontally(
						placement, ALIGN.RIGHT, anchorLeft, anchorRight, popoverWidth
					);
				}
			}
			return {
				left,
				placement,
				align
			};
		}
		case ALIGN.RIGHT: {
			const left = anchorRight - popoverWidth;
			if (checkBounds && left < 0) {
				const resultForCenter = movePopoverHorizontally(
					placement, ALIGN.CENTER, anchorLeft, anchorRight, popoverWidth
				);
				if (resultForCenter.left < 0) {
					return movePopoverHorizontally(
						placement, ALIGN.LEFT, anchorLeft, anchorRight, popoverWidth
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
}