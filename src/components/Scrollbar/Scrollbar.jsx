import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Bar from './Bar.jsx';

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
			track: React.PropTypes.string,
			bar: React.PropTypes.string
		})
	};

	static contextTypes = CONTEXT_TYPES;

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
		this._container.addEventListener('scroll', this._onContainerScroll);
	}

	componentWillUnmount() {
		const emitter = this.context[SCROLLABLE_CONTEXT_EMITTER];
		emitter.off(EVENT_SCROLABLE.RESIZE, this.onResize);
		this._container.removeEventListener('scroll', this._onContainerScroll);
	}

	render() {
		const {theme} = this.props;

		const {isVisible} = this.state;

		const className = classnames(theme.container, {
			[theme.containerIsVisible]: isVisible
		});

		const barTheme = {
			container: theme.bar
		};

		return (
			<div className={className} ref={el => this._scrollbar = el}>
				<div className={theme.track} onWheel={this.onTrackMouseWheel} onClick={this.onTrackClick}
				     ref={el => this._track = el}>
					<Bar theme={barTheme} ref={el => this._bar = ReactDOM.findDOMNode(el)}
					     onBarDragStart={this.onBarDragStart}
					     onBarDrag={this.onBarDrag}/>
				</div>
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