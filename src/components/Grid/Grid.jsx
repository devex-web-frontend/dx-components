import React from 'react';
import prefix from 'dx-util/src/dom/prefix';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';
import {Table, TableBody, TableHead, TableCell, TableRow} from '../Table/Table';
import Emitter from 'dx-util/src/emitter/Emitter';
import Scrollable from '../Scrollable/Scrollable';

export const GRID = Symbol('Grid');

const EVENT_GRID_BODY_SCROLL = '__EVENT_GRID_BODY_SCROLL__';
class GridScrollEmitter extends Emitter {
	notifyScrollUpdate(scrollLeft, scrollTop) {
		this._emit(EVENT_GRID_BODY_SCROLL, scrollLeft, scrollTop);
	}
}

const GRID_CONTEXT_EMITTER = '__GRID_CONTEXT_EMITTER__';
const CONTEXT_TYPES = {
	[GRID_CONTEXT_EMITTER]: React.PropTypes.instanceOf(GridScrollEmitter)
};

@PURE
@themr(GRID)
export default class Grid extends React.Component {
	static propTypes = {
		...Table.propTypes
	}

	static childContextTypes = CONTEXT_TYPES;

	_emitter = new GridScrollEmitter();

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
		this.context[GRID_CONTEXT_EMITTER].on(EVENT_GRID_BODY_SCROLL, this.onGridBodyScroll);
	}

	componentWillUnmount() {
		this.context[GRID_CONTEXT_EMITTER].off(EVENT_GRID_BODY_SCROLL, this.onGridBodyScroll);
	}

	render() {
		const {Table, theme, TableHead, ...props} = this.props;
		const {scrollLeft} = this.state;
		let style;
		if (typeof scrollLeft !== 'undefined') {
			style = prefix({
				transform: `translateX(-${scrollLeft}px)`
			});
		}

		return (
			<div style={style}>
				<Table theme={theme}>
					<TableHead theme={theme} {...props}/>
				</Table>
			</div>
		);
	}

	onGridBodyScroll = (scrollLeft, scrollTop) => {
		this.setState({
			scrollLeft
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

	render() {
		const {Table, TableBody, theme, ...props} = this.props;

		return (
			<Scrollable onScroll={this.onScroll}>
				<div className={theme.tableBody}>
					<Table theme={theme}>
						<TableBody theme={theme} {...props}/>
					</Table>
				</div>
			</Scrollable>
		);
	}

	onScroll = (scrollLeft, scrollTop) => {
		if (this._scrollLeft !== scrollLeft) {
			/**
			 * @type {GridScrollEmitter}
			 */
			const emitter = this.context[GRID_CONTEXT_EMITTER];
			if (emitter) {
				emitter.notifyScrollUpdate(scrollLeft, scrollTop);
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