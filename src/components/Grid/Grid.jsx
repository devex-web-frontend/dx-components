import React from 'react';
import ReactDOM from 'react-dom';
import prefix from 'dx-util/src/dom/prefix';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';
import Pure from '../Pure/Pure';
import {TABLE_IS_IN_HEAD_KEY, Table, TableBody, TableHead, TableCell, TableRow} from '../Table/Table';
import Emitter from 'dx-util/src/emitter/Emitter';
import Scrollable from '../Scrollable/Scrollable';
import classnames from 'classnames';

export const GRID = Symbol('Grid');

const EVENT_GRID = {
	BODY_SCROLL: 'EVENT_GRID:BODY_SCROLL',
	BODY_SCROLLBAR_APPEAR: 'EVENT_GRID:BODU_SCROLLBAR_APPER',
	BODY_CELL_MOUNT: 'EVENT_GRID:BODY_CELL_MOUNT',
	BODY_CELL_UPDATE: 'EVENT_GRID:BODY_CELL_UPDATE',
	BODY_MOUNT: 'EVENT_GRID:BODY_MOUNT',
	GRID_MOUNT: 'EVENT_GRID:GRID_MOUNT',
	GRID_UPDATE: 'EVENT_GRID:GRID_UPDATE'
};

class GridInternalEmitter extends Emitter {
	emit(event, ...args) {
		this._emit(event, ...args);
	}
}

const GRID_COLUMN_INDEX_KEY = '__GRID_COLUMN_INDEX_KEY__';
const GRID_ROW_INDEX_KEY = '__GRID_ROW_INDEX_KEY__';
const GRID_COLUMN_WIDTH_KEY = '__GRID_COLUMN_WIDTH_KEY__';

const GRID_CONTEXT_EMITTER = '__GRID_CONTEXT_EMITTER__';
const CONTEXT_TYPES = {
	[GRID_CONTEXT_EMITTER]: React.PropTypes.instanceOf(GridInternalEmitter).isRequired
};

@PURE
@themr(GRID)
export default class Grid extends React.Component {
	static propTypes = {
		...Table.propTypes
	}

	static childContextTypes = CONTEXT_TYPES;

	_emitter;

	_rows = {};
	_maxColumnWidths = {};

	getChildContext() {
		return {
			[GRID_CONTEXT_EMITTER]: this._emitter
		};
	}

	componentDidMount() {
		//now we have widths of all rendered columns - send them to GridHead to adjust width
		this._emitter.emit(EVENT_GRID.GRID_MOUNT, this._maxColumnWidths, this._rows);
		this._emitter.off(EVENT_GRID.BODY_CELL_MOUNT, this.onBodyCellMount);
		this._emitter.on(EVENT_GRID.BODY_CELL_MOUNT, () => {
			throw new Error('Grid does not support dynamic row/cell mounts');
		});
		//start listening to cell updates
		this._emitter.on(EVENT_GRID.BODY_CELL_UPDATE, this.onBodyCellUpdate);
	}

	componentWillMount() {
		this._emitter = new GridInternalEmitter();
		this._emitter.on(EVENT_GRID.BODY_CELL_MOUNT, this.onBodyCellMount);
	}

	componentWillUnmount() {
		this._emitter.off(EVENT_GRID.BODY_CELL_MOUNT);
	}

	render() {
		const {theme, children} = this.props;
		return (
			<div className={theme.container}>
				{children}
			</div>
		);
	}

	/**
	 * @param {Number} rowIndex
	 * @param {Number} columnIndex
	 * @param {Number} width
	 */
	onBodyCellMount = (rowIndex, columnIndex, width) => {
		//set or update row storage
		if (!this._rows[rowIndex]) {
			this._rows[rowIndex] = {
				columns: {}
			};
		}
		this._rows[rowIndex].columns[columnIndex] = width;
		//detect max width
		const maxColumnWidthByIndex = this._maxColumnWidths[columnIndex];
		if (!maxColumnWidthByIndex || maxColumnWidthByIndex && maxColumnWidthByIndex < width) {
			this._maxColumnWidths[columnIndex] = width;
		}
	}

	onBodyCellUpdate = (rowIndex, columnIndex, newWidth) => {
		//update row storage
		const row = this._rows[rowIndex];
		row.columns[columnIndex] = newWidth;
		//update max width
		this._maxColumnWidths[columnIndex] = Math.max(
			...Object.keys(this._rows).map(key => this._rows[key].columns[columnIndex])
		);
		//notify head
		this._emitter.emit(EVENT_GRID.GRID_UPDATE, this._maxColumnWidths, this._rows);
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
		emitter.on(EVENT_GRID.BODY_SCROLL, this.onGridBodyScroll);
		emitter.on(EVENT_GRID.BODY_SCROLLBAR_APPEAR, this.onGridBodyScrollbarAppear);
	}

	componentWillUnmount() {
		const emitter = this.context[GRID_CONTEXT_EMITTER];
		emitter.off(EVENT_GRID.BODY_SCROLL, this.onGridBodyScroll);
		emitter.off(EVENT_GRID.BODY_SCROLLBAR_APPEAR, this.onGridBodyScrollbarAppear);
	}

	render() {
		const {Table, theme, TableHead, ...props} = this.props;
		const {scrollLeft, withVerticalScrollbar} = this.state;
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
					withVerticalScrollbar
				)
			}
		);

		//todo support multiple rows in head

		return (
			<div className={className}>
				<div className={theme.gridHead__content} style={style}>
					<Pure {...this.props} check={this.state.columns}>
						{() => (
							<Table theme={theme}>
								<TableHead theme={theme} {...props}/>
							</Table>
						)}
					</Pure>
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

	onGridMount = (columns, rows) => {
		this.setState({
			columns: {
				...columns
			}
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

	componentDidMount() {
		this.context[GRID_CONTEXT_EMITTER].emit(EVENT_GRID.BODY_MOUNT);
	}

	render() {
		const {Table, TableBody, theme, ...props} = this.props;

		return (
			<Scrollable onScroll={this.onScroll} onUpdate={this.onUpdate}>
				<div className={theme.gridBody}>
					<Table theme={theme}>
						<TableBody theme={theme} {...props}>
							{React.Children.map(props.children, (child, i) => (
								React.cloneElement(child, {
									[GRID_ROW_INDEX_KEY]: i
								})
							))}
						</TableBody>
					</Table>
				</div>
			</Scrollable>
		);
	}

	onScroll = (scrollLeft, scrollTop) => {
		if (this._scrollLeft !== scrollLeft) {
			this._scrollLeft = scrollLeft;
			this.context[GRID_CONTEXT_EMITTER].emit(EVENT_GRID.BODY_SCROLL, scrollLeft, scrollTop);
		}
	}

	onUpdate = (withHorizontalScrollbar, withVerticalScrollbar) => {
		if (this._withHorizontalScrollbar !== withHorizontalScrollbar ||
			this._withVerticalScrollbar !== withVerticalScrollbar) {
			this._withVerticalScrollbar = withVerticalScrollbar;
			this._withHorizontalScrollbar = withHorizontalScrollbar;
			this.context[GRID_CONTEXT_EMITTER].emit(
				EVENT_GRID.BODY_SCROLLBAR_APPEAR,
				withHorizontalScrollbar,
				withVerticalScrollbar
			);
		}
	}
}

@PURE
@themr(GRID)
export class GridRow extends React.Component {
	static propTypes = {
		...TableRow.propTypes,
		TableRow: React.PropTypes.func,
		//injected by GridBody (will be also by GridHead with implementation on multiple rows in head)
		[GRID_ROW_INDEX_KEY]: React.PropTypes.number
	}

	static defaultProps = {
		TableRow
	}

	static contextTypes = CONTEXT_TYPES;

	state = {};

	componentWillMount() {
		const emitter = this.context[GRID_CONTEXT_EMITTER];
		if (this.props[TABLE_IS_IN_HEAD_KEY]) {
			emitter.on(EVENT_GRID.GRID_MOUNT, this.onGridMount);
			emitter.on(EVENT_GRID.GRID_UPDATE, this.onGridUpdate);
		}
	}

	render() {
		const {TableRow, ...props} = this.props;
		const rowIndex = this.props[GRID_ROW_INDEX_KEY];
		return (
			<TableRow {...props}>
				{React.Children.map(this.props.children, (child, i) => {
					const newProps = {
						[GRID_ROW_INDEX_KEY]: rowIndex,
						[GRID_COLUMN_INDEX_KEY]: i
					};
					if (this.state.columns) {
						newProps[GRID_COLUMN_WIDTH_KEY] = this.state.columns[i];
					}
					return React.cloneElement(child, newProps);
				})}
			</TableRow>
		);
	}

	onGridMount = columns => {
		//this is only called with TABLE_IS_IN_HEAD_KEY set
		//unsubscribe
		this.context[GRID_CONTEXT_EMITTER].off(EVENT_GRID.GRID_MOUNT, this.onGridMount);
		this.setState({
			columns: {
				...columns
			}
		});
	}

	onGridUpdate = (columns, rows) => {
		this.setState({
			columns: {
				...columns
			}
		});
	}
}

@PURE
@themr(GRID)
export class GridCell extends React.Component {
	static propTypes = {
		...TableCell.propTypes,
		//injected by GridRow
		[GRID_COLUMN_INDEX_KEY]: React.PropTypes.number,
		//injected by GridRow
		[GRID_ROW_INDEX_KEY]: React.PropTypes.number,
		//injected by GridHead
		[GRID_COLUMN_WIDTH_KEY]: React.PropTypes.number,
		TableCell: React.PropTypes.func
	}

	static defaultProps = {
		TableCell
	}

	static contextTypes = CONTEXT_TYPES;

	_content;
	_width;

	componentDidMount() {
		if (!this.props[TABLE_IS_IN_HEAD_KEY]) {
			//todo support head content
			this._width = ReactDOM.findDOMNode(this._content).clientWidth;
			const emitter = this.context[GRID_CONTEXT_EMITTER];
			emitter.emit(
				EVENT_GRID.BODY_CELL_MOUNT,
				this.props[GRID_ROW_INDEX_KEY],
				this.props[GRID_COLUMN_INDEX_KEY],
				this._width
			);
		}
	}

	componentDidUpdate() {
		//todo support head
		if (!this.props[TABLE_IS_IN_HEAD_KEY]) {
			const newWidth = ReactDOM.findDOMNode(this._content).clientWidth;
			if (newWidth !== this._width) {
				this._width = newWidth;
				const emitter = this.context[GRID_CONTEXT_EMITTER];
				emitter.emit(
					EVENT_GRID.BODY_CELL_UPDATE,
					this.props[GRID_ROW_INDEX_KEY],
					this.props[GRID_COLUMN_INDEX_KEY],
					newWidth
				);
			}
		}
	}

	render() {
		let {TableCell, ...props} = this.props;
		const columnWidth = props[GRID_COLUMN_WIDTH_KEY];
		delete props[GRID_COLUMN_INDEX_KEY];
		delete props[GRID_COLUMN_WIDTH_KEY];
		delete props[GRID_ROW_INDEX_KEY];
		let style;
		if (typeof columnWidth !== 'undefined') {
			style = {
				width: `${columnWidth}px`
			};
		}
		return (
			<TableCell {...props}>
				<span className={props.theme.gridCell__content}
				      style={style}
				      ref={el => this._content = el}>
					{props.children}
				</span>
			</TableCell>
		);
	}
}