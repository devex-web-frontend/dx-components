import React from 'react';
import Srollbar, {SCROLLBAR_TYPE, BUTTON_SCROLL_STEP} from './Scrollbar.jsx';
import {
	EVENT_SCROLABLE,
	SCROLLABLE_CONTEXT_EMITTER,
} from '../Scrollable/Scrollable.const';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';

export const VERTICAL_SCROLLBAR = Symbol('VerticalScrollbar');

@PURE
@themr(VERTICAL_SCROLLBAR)
export default class VerticalScrollbar extends Srollbar {

	static propTypes = {
		...Srollbar.PropTypes,
		scrollTop: React.PropTypes.number
	}

	_ratio;
	_previousDragCoordinate;

	/**
	 * @returns {Number}
	 * @protected
	 */
	_getMinBarSize() {
		return parseFloat(window.getComputedStyle(this._bar).getPropertyValue('min-height'));
	}

	/**
	 * Hide native scroll
	 * @private
	 */
	_hideNativaScrollContainer() {
		const {width} = this.context.size;
		this._container.style.marginRight = `-${width}px`;
		this._container.style.width = `calc(100% + ${width}px)`;
	}

	componentDidMount() {
		super.componentDidMount();
		this._minBarSize = this._getMinBarSize();
		this._hideNativaScrollContainer();
		this._update();

		if (this.props.scrollTop) {
			this._scrollTo(this.props.scrollTop);
		}
	}

	componentWillReceiveProps(newProps) {
		if (this.props.scrollTop !== newProps.scrollTop) {
			this._scrollTo(newProps.scrollTop);
		}
	}

	_update() {
		this._toggle();
		this._ratio = this._getRatio();
		this._updateBar();
	}

	_updateState() {

	}

	_toggle() {
		const bounds = this._container.getBoundingClientRect();
		const hegiht = Math.round(bounds.height);
		const scrollHeight = this._container.scrollHeight;
		const isVisible = scrollHeight > hegiht;

		if (isVisible !== this.state.isVisible) {
			this.setState({
				isVisible
			});

			const emitter = this.context[SCROLLABLE_CONTEXT_EMITTER];
			emitter.emit(EVENT_SCROLABLE.SCROLLBAR_UPDATE, SCROLLBAR_TYPE.VERTICAL, isVisible);
		}
	}

	_updateBar() {
		const visibleHeight = this._container.clientHeight;
		const barHeight = Math.ceil(visibleHeight * this._ratio.size);
		this._bar.style.height = `${barHeight}px`;

		//position
		const scrollTop = this._container.scrollTop;
		const barPositionTop = Math.floor(scrollTop * this._ratio.position);
		this._bar.style.top = `${barPositionTop}px`;
	}

	_getRatio() {
		const {scrollHeight: scrollSize, clientHeight: containerSize} = this._container;
		const {offsetHeight: trackSize} = this._track;
		const sizeRatio = trackSize / scrollSize;
		const possibleBarSize = containerSize * sizeRatio;
		const barSize = possibleBarSize < this._minBarSize ? this._minBarSize : possibleBarSize;
		const hiddenContentAreaSize = scrollSize - containerSize;
		const hiddenTrackAreaSize = trackSize - barSize;
		const posRatio = hiddenTrackAreaSize / hiddenContentAreaSize;

		return {
			size: sizeRatio,
			position: posRatio
		};
	}

	_scrollTo = (position) => {
		this._container.scrollTop = position;
	}

	_checkScrollbarAtStart() {
		const {scrollTop} = this._container;
		return scrollTop <= 0;
	}

	_checkScrollbarAtEnd() {
		const {scrollTop, scrollHeight, offsetHeight} = this._container;
		return (offsetHeight + scrollTop) > scrollHeight;
	}

	////////////////////////
	// DOM EVENT HANDLERS //
	////////////////////////

	/**
	 * @param {WheelEvent} event
	 * @protected
	 */
	onTrackMouseWheel = (event) => {
		this._container.scrollTop += (event.deltaY * 10 || event['detail'] * 10 || event['wheelDelta'] * -1);
	}

	/**
	 * @param {Event} event
	 * @protected
	 */
	onButtonForwardClick = (event) => {
		this._container.scrollTop += BUTTON_SCROLL_STEP;
	}

	/**
	 * @param {Event} event
	 * @protected
	 */
	onButtonBackwardClick = (event) => {
		this._container.scrollTop -= BUTTON_SCROLL_STEP;
	}

	/**
	 * @param {Event} event
	 * @protected
	 */
	onButtonToStartClick = (event) => {
		this._container.scrollTop = 0;
	}

	/**
	 * @param {Event} event
	 * @protected
	 */
	onButtonToEndClick = (event) => {
		this._container.scrollTop = this._container.scrollHeight;
	}

	/**
	 * @param {MouseEvent} event
	 * @protected
	 */
	onTrackClick = (event) => {
		const trackPosition = this._track.getBoundingClientRect().top +
			window.pageYOffset -
			document.documentElement.clientTop;

		this._container.scrollTop = Math.floor((event.clientY - trackPosition) / this._ratio.position);
	}

	/**
	 * @param {MouseEvent} event
	 * @protected
	 */
	onBarDragStart = (event) => {
		this._previousDragCoordinate = event.clientY;
	}

	/**
	 * @param {MouseEvent} event
	 * @protected
	 */
	onBarDrag = (event) => {
		const delta = this._previousDragCoordinate - event.clientY;
		this._previousDragCoordinate = event.clientY;
		this._container.scrollTop -= delta / this._ratio.position;
	}
}