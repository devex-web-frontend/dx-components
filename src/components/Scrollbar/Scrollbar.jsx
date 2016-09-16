import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Bar from './Bar.jsx';
import Holdable from '../Holdable/Holdable.jsx';
import Button from '../Button/Button.jsx';

import {
	CONTEXT_TYPES,
	EVENT_SCROLABLE,
	SCROLLABLE_CONTEXT_EMITTER,
} from '../Scrollable/Scrollable.const';

export const SCROLLBAR = Symbol('Scrollbar');
export const SCROLLBAR_TYPE = {
	HORIZONTAL: 'horizontal',
	VERTICAL: 'vertical'
};

export const BUTTON_SCROLL_STEP = 20;

export default class Scrollbar extends React.Component {

	_scrollbar;
	_container;
	_track;
	_bar;

	static propTypes = {
		container(props) {
			const {container} = props;
			const type = typeof container;
			if (type === 'undefined') {
				throw new Error('Container should be specified');
			}
		},
		theme: React.PropTypes.shape({
			container: React.PropTypes.string,
			containerIsVisible: React.PropTypes.string,
			button: React.PropTypes.string,
			track: React.PropTypes.string,
			bar: React.PropTypes.string,
			buttonToStart: React.PropTypes.string,
			buttonBackward: React.PropTypes.string,
			buttonForward: React.PropTypes.string,
			buttonToEnd: React.PropTypes.string,
		}),
		ButtonToStart: React.PropTypes.func,
		ButtonStepBackward: React.PropTypes.func,
		ButtonStepForward: React.PropTypes.func,
		ButtonToEnd: React.PropTypes.func,
	};

	static contextTypes = CONTEXT_TYPES;

	static defaultProps = {
		ButtonToStart: Button,
		ButtonStepBackward: Button,
		ButtonStepForward: Button,
		ButtonToEnd: Button
	}

	state = {
		isVisible: false
	}

	constructor(...args) {
		super(...args);
		const {container} = this.props;
		this._container = container;
	}

	componentDidMount() {
		const emitter = this.context[SCROLLABLE_CONTEXT_EMITTER];
		emitter.on(EVENT_SCROLABLE.RESIZE, this.onResize);
		this._updateState();
		this._container.addEventListener('scroll', this._onContainerScroll);
	}

	componentWillUnmount() {
		const emitter = this.context[SCROLLABLE_CONTEXT_EMITTER];
		emitter.off(EVENT_SCROLABLE.RESIZE, this.onResize);
		this._container.removeEventListener('scroll', this._onContainerScroll);
	}

	render() {
		const {
			theme,
			ButtonToStart,
			ButtonStepBackward,
			ButtonStepForward,
			ButtonToEnd
		} = this.props;

		const {
			isVisible,
			isScrollbarAtStart,
			isScrollbarAtEnd
		} = this.state;

		const buttonTheme = (mixinContainer) => ({
			container: classnames(theme.button, mixinContainer)
		});

		const className = classnames(theme.container, {
			[theme.containerIsVisible]: isVisible
		});

		const barTheme = {
			container: theme.bar
		};

		return (
			<div className={className} ref={el => this._scrollbar = el}>
				<ButtonToStart theme={buttonTheme(theme.buttonToStart)}
				               onClick={this.onButtonToStartClick}
				               isDisabled={isScrollbarAtStart}/>
				<Holdable onHold={this.onButtonBackwardClick} isDisabled={isScrollbarAtStart}>
					<ButtonStepBackward theme={buttonTheme(theme.buttonBackward)} onClick={this.onButtonBackwardClick}/>
				</Holdable>
				<div className={theme.track} onWheel={this.onTrackMouseWheel} onClick={this.onTrackClick}
				     ref={el => this._track = el}>
					<Bar theme={barTheme} ref={el => this._bar = ReactDOM.findDOMNode(el)}
					     onBarDragStart={this.onBarDragStart}
					     onBarDrag={this.onBarDrag}/>
				</div>
				<Holdable onHold={this.onButtonForwardClick} isDisabled={isScrollbarAtEnd}>
					<ButtonStepForward theme={buttonTheme(theme.buttonForward)} onClick={this.onButtonForwardClick}/>
				</Holdable>
				<ButtonToEnd theme={buttonTheme(theme.buttonToEnd)}
				             onClick={this.onButtonToEndClick}
				             isDisabled={isScrollbarAtEnd}/>
			</div>
		);
	}

	/**
	 * @param {Event} event
	 * @private
	 */
	_onContainerScroll = (event) => {
		this._updateBar();
		this._updateState();
		const emitter = this.context[SCROLLABLE_CONTEXT_EMITTER];
		emitter.emit(EVENT_SCROLABLE.SCROLL, event);
	}

	_updateState = () => {
		const isScrollbarAtStart = this._checkScrollbarAtStart();
		const isScrollbarAtEnd = this._checkScrollbarAtEnd();

		this.setState({
			isScrollbarAtStart,
			isScrollbarAtEnd
		});
	}

	onResize = () => {
		this._update();
	}

	////////////////////////
	// DOM EVENT HANDLERS //
	////////////////////////

	/**
	 * @abstract
	 * @param {WheelEvent} event
	 * @protected
	 */
	onTrackMouseWheel(event) {
	}

	/**
	 * @abstract
	 * @param {Event} event
	 * @protected
	 */
	onButtonForwardClick(event) {
	}

	/**
	 * @abstract
	 * @param {Event} event
	 * @protected
	 */
	onButtonBackwardClick(event) {
	}

	/**
	 * @abstract
	 * @param {Event} event
	 * @protected
	 */
	onButtonToStartClick(event) {

	}

	/**
	 * @param {Event} event
	 * @protected
	 */
	onButtonToEndClick(event) {

	}

	/**
	 * @abstract
	 * @param {MouseEvent} event
	 * @protected
	 */
	onTrackClick(event) {
	}

	/**
	 * @abstract
	 * @param {MouseEvent} event
	 * @protected
	 */
	onBarDragStart(event) {
	}

	/**
	 * @abstract
	 * @param {MouseEvent} event
	 * @protected
	 */
	onBarDrag(event) {
	}

}