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

	state = {
		isVisible: false,
		isScrollInStart: false,
		isScrollInEnd: false
	}

	static propTypes = {
		//container: React.PropTypes.any,
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
		ButtonComponent: React.PropTypes.func
	};

	static contextTypes = CONTEXT_TYPES;

	static defaultProps = {
		ButtonComponent: Button
	}

	constructor(...args) {
		super(...args);
		const {container} = this.props;
		this._container = container;
	}

	componentDidMount() {
		const emitter = this.context[SCROLLABLE_CONTEXT_EMITTER];
		emitter.on(EVENT_SCROLABLE.RESIZE, this.onResize);
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
			ButtonComponent: Button
		} = this.props;

		const {isVisible} = this.state;

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
				<Button theme={buttonTheme(theme.buttonToStart)} onClick={this.onButtonToStartClick}/>
				<Holdable onHold={this.onButtonBackwardClick}>
					<Button theme={buttonTheme(theme.buttonBackward)} onClick={this.onButtonBackwardClick}/>
				</Holdable>
				<div className={theme.track} onWheel={this.onTrackMouseWheel} onClick={this.onTrackClick}
				     ref={el => this._track = el}>
					<Bar theme={barTheme} ref={el => this._bar = ReactDOM.findDOMNode(el)}
					     onBarDragStart={this.onBarDragStart}
					     onBarDrag={this.onBarDrag}/>
				</div>
				<Holdable onHold={this.onButtonForwardClick}>
					<Button theme={buttonTheme(theme.buttonForward)} onClick={this.onButtonForwardClick}/>
				</Holdable>
				<Button theme={buttonTheme(theme.buttonToEnd)} onClick={this.onButtonToEndClick}/>
			</div>
		);
	}

	/**
	 * @param {Event} event
	 * @private
	 */
	_onContainerScroll = (event) => {
		this._updateBar();

		const emitter = this.context[SCROLLABLE_CONTEXT_EMITTER];
		emitter.emit(EVENT_SCROLABLE.SCROLL, event);
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
	 * @abstract
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
	onTrackClick(event){
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