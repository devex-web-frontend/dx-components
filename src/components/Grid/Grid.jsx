import React from 'react';
import prefix from 'dx-util/src/dom/prefix';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';
import {Table, TableBody, TableHead, TableCell, TableRow} from '../Table/Table';
import Emitter from 'dx-util/src/emitter/Emitter';
import Scrollable from '../Scrollable/Scrollable';
import classnames from 'classnames';

export const GRID = Symbol('Grid');

const EVENT_GRID_BODY_SCROLL = '__EVENT_GRID_BODY_SCROLL__';
const EVENT_GRID_BODY_SCROLLBAR_APPEAR = '__EVENT_GRID_BODY_SCROLLBAR_APPEAR__';
class GridInternalEmitter extends Emitter {
	notifyScrollUpdate(...args) {
		this._emit(EVENT_GRID_BODY_SCROLL, ...args);
	}

	notifyScrollbarAppear(...args) {
		this._emit(EVENT_GRID_BODY_SCROLLBAR_APPEAR, ...args);
	}
}

const GRID_CONTEXT_EMITTER = '__GRID_CONTEXT_EMITTER__';
const CONTEXT_TYPES = {
	[GRID_CONTEXT_EMITTER]: React.PropTypes.instanceOf(GridInternalEmitter)
};

@PURE
@themr(GRID)
export default class Grid extends React.Component {
	static propTypes = {
		...Table.propTypes
	}

	static childContextTypes = CONTEXT_TYPES;

	_emitter = new GridInternalEmitter();

	getChildContext() {
		return {
			[GRID_CONTEXT_EMITTER]: this._emitter
		};
	}

	render() {
		const {theme, children} = this.props;
		return (
			<div className={theme.container}>
				{children}
			</div>
		);
	}
}
export {
	Grid
};

@PURE
@themr(GRID)
export class GridHead extends React.Component {
	static propTypes = {
		...TableHead.propTypes,
		Table: React.PropTypes.func,
		TableHead: React.PropTypes.func
	}

	static defaultProps = {
		Table,
		TableHead
	}

	static contextTypes = CONTEXT_TYPES;

	state = {};

	componentDidMount() {
		const emitter = this.context[GRID_CONTEXT_EMITTER];
		if (emitter) {
			emitter.on(EVENT_GRID_BODY_SCROLL, this.onGridBodyScroll);
			emitter.on(EVENT_GRID_BODY_SCROLLBAR_APPEAR, this.onGridBodyScrollbarAppear);
		}
	}

	componentWillUnmount() {
		const emitter = this.context[GRID_CONTEXT_EMITTER];
		if (emitter) {
			emitter.off(EVENT_GRID_BODY_SCROLL, this.onGridBodyScroll);
			emitter.off(EVENT_GRID_BODY_SCROLLBAR_APPEAR, this.onGridBodyScrollbarAppear);
		}
	}

	render() {
		const {Table, theme, TableHead, ...props} = this.props;
		const {scrollLeft, withHorizontalScrollbar, withVerticalScrollbar} = this.state;
		let style;
		if (typeof scrollLeft !== 'undefined') {
			style = prefix({
				transform: `translateX(-${scrollLeft}px)`
			});
		}

		const className = classnames(
			theme.gridHead,
			{
				[theme.gridHead_paddedForScrollbar]: (
					withHorizontalScrollbar && !withVerticalScrollbar ||
					!withHorizontalScrollbar && withVerticalScrollbar
				)
			}
		);

		return (
			<div className={className}>
				<div className={theme.gridHead__content} style={style}>
					<Table theme={theme}>
						<TableHead theme={theme} {...props}/>
					</Table>
				</div>
			</div>
		);
	}

	onGridBodyScroll = (scrollLeft, scrollTop) => {
		this.setState({
			scrollLeft
		});
	}

	onGridBodyScrollbarAppear = (withHorizontalScrollbar, withVerticalScrollbar) => {
		this.setState({
			withHorizontalScrollbar,
			withVerticalScrollbar
		});
	}
}

@PURE
@themr(GRID)
export class GridBody extends React.Component {
	static propTypes = {
		...TableBody.propTypes,
		Table: React.PropTypes.func,
		TableBody: React.PropTypes.func
	}

	static defaultProps = {
		Table,
		TableBody
	}

	static contextTypes = CONTEXT_TYPES;

	_scrollLeft;
	_withVerticalScrollbar;
	_withHorizontalScrollbar;

	render() {
		const {Table, TableBody, theme, ...props} = this.props;

		return (
			<Scrollable onScroll={this.onScroll} onUpdate={this.onUpdate}>
				<div className={theme.gridBody}>
					<Table theme={theme}>
						<TableBody theme={theme} {...props}/>
					</Table>
				</div>
			</Scrollable>
		);
	}

	onScroll = (scrollLeft, scrollTop) => {
		if (this._scrollLeft !== scrollLeft) {
			this._scrollLeft = scrollLeft;
			/**
			 * @type {GridInternalEmitter}
			 */
			const emitter = this.context[GRID_CONTEXT_EMITTER];
			if (emitter) {
				emitter.notifyScrollUpdate(scrollLeft, scrollTop);
			}
		}
	}

	onUpdate = (withHorizontalScrollbar, withVerticalScrollbar) => {
		if (this._withHorizontalScrollbar !== withHorizontalScrollbar ||
			this._withVerticalScrollbar !== withVerticalScrollbar) {
			this._withVerticalScrollbar = withVerticalScrollbar;
			this._withHorizontalScrollbar = withHorizontalScrollbar;
			/**
			 * @type {GridInternalEmitter}
			 */
			const emitter = this.context[GRID_CONTEXT_EMITTER];
			if (emitter) {
				emitter.notifyScrollbarAppear(withHorizontalScrollbar, withVerticalScrollbar);
			}
		}
	}
}

@PURE
@themr(GRID)
export class GridRow extends React.Component {
	static propTypes = {
		...TableRow.propTypes,
		TableRow: React.PropTypes.func
	}

	static defaultProps = {
		TableRow
	}

	render() {
		const {TableRow, ...props} = this.props;
		return (
			<TableRow {...props}/>
		);
	}
}

@PURE
@themr(GRID)
export class GridCell extends React.Component {
	static propTypes = {
		...TableCell.propTypes,
		TableCell: React.PropTypes.func
	}

	static defaultProps = {
		TableCell
	}

	render() {
		const {TableCell, ...props} = this.props;
		return (
			<TableCell {...props}/>
		);
	}
}