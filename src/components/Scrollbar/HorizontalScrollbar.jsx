import React from 'react';
import Srollbar, {SCROLLBAR_TYPE, BUTTON_SCROLL_STEP} from './Scrollbar.jsx';

import {
	EVENT_SCROLABLE,
	SCROLLABLE_CONTEXT_EMITTER,
} from '../Scrollable/Scrollable.const';

import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';

export const HORIZONTAL_SCROLLBAR = Symbol('HorizontalScrollbar');

@PURE
@themr(HORIZONTAL_SCROLLBAR)
export default class HorizontalScrollbar extends Srollbar {

	static propTypes = {
		...Srollbar.PropTypes,
		scrollLeft: React.PropTypes.number
	}

	_ratio;
	_previousDragCoordinate;

	/**
	 * @returns {Number}
	 * @protected
	 */
	_getMinBarSize() {
		return parseFloat(window.getComputedStyle(this._bar).getPropertyValue('min-width'));
	}

	/**
	 * Hide native scroll
	 * @private
	 */
	_hideNativaScrollContainer() {
		const {container} = this.props;
		const {height} = this.context.size;
		container.style.marginBottom = `-${height}px`;
		container.style.height = `calc(100% + ${height}px)`;
	}

	componentDidMount() {
		super.componentDidMount();
		this._minBarSize = this._getMinBarSize();
		this._hideNativaScrollContainer();
		this._update();

		if (this.props.scrollLeft) {
			this._scrollTo(this.props.scrollLeft);
		}
	}

	componentWillReceiveProps(newProps) {
		if (this.props.scrollLeft !== newProps.scrollLeft) {
			this._scrollTo(newProps.scrollLeft);
		}
	}

	_update() {
		this._toggle();
		this._ratio = this._getRatio();
		this._updateBar();
	}

	_toggle() {
		const {container} = this.props;
		const bounds = container.getBoundingClientRect();
		const visibleWidth = Math.round(bounds.width);
		const scrollWidth = container.scrollWidth;
		const isVisible = scrollWidth > visibleWidth;
		if (isVisible !== this.state.isVisible) {
			this.setState({
				isVisible
			});

			const emitter = this.context[SCROLLABLE_CONTEXT_EMITTER];
			emitter.emit(EVENT_SCROLABLE.SCROLLBAR_UPDATE, SCROLLBAR_TYPE.HORIZONTAL, isVisible);
		}
	}

	_updateBar() {
		const {container} = this.props;
		const visibleWidth = container.clientWidth;
		const barWidth = Math.ceil(visibleWidth * this._ratio.size);
		this._bar.style.width = `${barWidth}px`;

		//position
		const scrollLeft = container.scrollLeft;
		const barPositionLeft = Math.floor(scrollLeft * this._ratio.position);
		this._bar.style.left = `${barPositionLeft}px`;
	}

	_getRatio() {
		const {scrollWidth: scrollSize, clientWidth: containerSize} = this._container;
		const {offsetWidth: trackSize} = this._track;
		const sizeRatio = trackSize / scrollSize;
		const possibleBarSize = containerSize * sizeRatio;
		const barSize = (possibleBarSize < this._minBarSize) ? this._minBarSize : possibleBarSize;
		const hiddenContentAreaSize = scrollSize - containerSize;
		const hiddenTrackAreaSize = trackSize - barSize;
		const positionRatio = hiddenTrackAreaSize / hiddenContentAreaSize;

		return {
			size: sizeRatio,
			position: positionRatio
		};
	}

	_scrollTo = (position) => {
		this._container.scrollLeft = position;
	}

	_checkScrollbarAtStart() {
		const {scrollLeft} = this._container;
		return scrollLeft <= 0;
	}

	_checkScrollbarAtEnd() {
		const {scrollLeft, scrollWidth, offsetWidth} = this._container;
		return (offsetWidth + scrollLeft) >= scrollWidth;
	}

	////////////////////////
	// DOM EVENT HANDLERS //
	////////////////////////

	/**
	 * @param {WheelEvent} event
	 * @protected
	 */
	onTrackMouseWheel = (event) => {
		this._container.scrollLeft += (event.deltaX * 10 || event['detail'] * 10 || event['wheelDelta'] * -1);
	}

	/**
	 * @param {Event} event
	 * @protected
	 */
	onButtonForwardClick = (event) => {
		this._container.scrollLeft += BUTTON_SCROLL_STEP;
	}

	/**
	 * @param {Event} event
	 * @protected
	 */
	onButtonBackwardClick = (event) => {
		this._container.scrollLeft -= BUTTON_SCROLL_STEP;
	}

	/**
	 * @param {Event} event
	 * @protected
	 */
	onButtonToStartClick = (event) => {
		this._container.scrollLeft = 0;
	}

	/**
	 * @param {Event} event
	 * @protected
	 */
	onButtonToEndClick = (event) => {
		this._container.scrollLeft = this._container.scrollWidth;
	}

	/**
	 * @param {MouseEvent} event
	 * @protected
	 */
	onTrackClick = (event) => {
		const trackPosition = this._track.getBoundingClientRect().left +
			window.pageXOffset -
			document.documentElement.clientLeft;

		this._container.scrollLeft = Math.floor((event.clientX - trackPosition) / this._ratio.position);
	}

	/**
	 * @param {MouseEvent} event
	 * @protected
	 */
	onBarDragStart = (event) => {
		this._previousDragCoordinate = event.clientX;
	}

	/**
	 * @param {MouseEvent} event
	 * @protected
	 */
	onBarDrag = (event) => {
		const delta = this._previousDragCoordinate - event.clientX;
		this._previousDragCoordinate = event.clientX;
		this._container.scrollLeft -= delta / this._ratio.position;
	}

}