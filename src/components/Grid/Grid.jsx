import React from 'react';
import ReactDOM from 'react-dom';
import prefix from 'dx-util/src/dom/prefix';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';
import Pure from '../Pure/Pure';
import {TABLE_IS_IN_HEAD_KEY, Table, TableBody, TABLE_BODY_THEME, TableHead, TableCell, TableRow} from '../Table/Table';
import Emitter from 'dx-util/src/emitter/Emitter';
import Scrollable from '../Scrollable/Scrollable';
import classnames from 'classnames';

export const GRID = Symbol('Grid');

const EVENT_GRID = {
	BODY_SCROLL: 'EVENT_GRID:BODY_SCROLL',
	BODY_SCROLLBAR_APPEAR: 'EVENT_GRID:BODU_SCROLLBAR_APPER',
	CELL_MOUNT: 'EVENT_GRID:CELL_MOUNT',
	CELL_UPDATE: 'EVENT_GRID:CELL_UPDATE',
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

	_rows = {
		head: {},
		body: {}
	};
	_maxColumnWidths = {};

	getChildContext() {
		return {
			[GRID_CONTEXT_EMITTER]: this._emitter
		};
	}

	componentDidMount() {
		this._emitter.emit(EVENT_GRID.GRID_MOUNT, this._maxColumnWidths);
		this._emitter.off(EVENT_GRID.CELL_MOUNT, this.onCellMount);
		this._emitter.on(EVENT_GRID.CELL_MOUNT, () => {
			throw new Error('Grid does not support dynamic row/cell mounts');
		});
		//start listening to cell updates
		this._emitter.on(EVENT_GRID.CELL_UPDATE, this.onCellUpdate);
	}

	componentWillMount() {
		this._emitter = new GridInternalEmitter();
		this._emitter.on(EVENT_GRID.CELL_MOUNT, this.onCellMount);
	}

	componentWillUnmount() {
		this._emitter.off(EVENT_GRID.CELL_MOUNT);
		this._emitter.off(EVENT_GRID.CELL_UPDATE);
	}

	componentDidUpdate() {
		//this is called after all cells updated
		//notify head
		this._emitter.emit(EVENT_GRID.GRID_UPDATE, this._maxColumnWidths);
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
	 * @param {Boolean} isInHead
	 */
	onCellMount = (rowIndex, columnIndex, width, isInHead) => {
		const rowStorage = isInHead ? this._rows.head : this._rows.body;
		//set or update row storage
		if (!rowStorage[rowIndex]) {
			rowStorage[rowIndex] = {
				columns: {}
			};
		}
		rowStorage[rowIndex].columns[columnIndex] = width;
		//detect max width
		const maxColumnWidthByIndex = this._maxColumnWidths[columnIndex];
		if (!maxColumnWidthByIndex || maxColumnWidthByIndex && maxColumnWidthByIndex < width) {
			this._maxColumnWidths[columnIndex] = width;
		}
	}

	/**
	 * @param {Number} rowIndex
	 * @param {Number} columnIndex
	 * @param {Number} newWidth
	 * @param {Boolean} isInHead
	 */
	onCellUpdate = (rowIndex, columnIndex, newWidth, isInHead) => {
		//update row storage
		const rowStorage = isInHead ? this._rows.head : this._rows.body;
		rowStorage[rowIndex].columns[columnIndex] = newWidth;
		//update max width
		this._maxColumnWidths[columnIndex] = Math.max(
			...Object.keys(this._rows.head).map(key => this._rows.head[key].columns[columnIndex]),
			...Object.keys(this._rows.body).map(key => this._rows.body[key].columns[columnIndex])
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
					<Pure {...this.props} check={this.state.columns} check2={props.children}>
						{() => (
							<Table theme={theme}>
								<TableHead theme={theme} {...props}>
									{React.Children.only(props.children)}
								</TableHead>
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

	onGridMount = (columns) => {
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
		theme: React.PropTypes.shape({
			...TABLE_BODY_THEME,
			horizontal_scrollbar__bar: React.PropTypes.string,
			vertical_scrollbar__bar: React.PropTypes.string,
		}),
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

		const scrollableTheme = {
			horizontal_scrollbar__bar: theme.horizontal_scrollbar__bar,
			vertical_scrollbar__bar: theme.vertical_scrollbar__bar
		};

		return (
			<Scrollable onScroll={this.onScroll} onUpdate={this.onUpdate} theme={scrollableTheme}>
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
		emitter.on(EVENT_GRID.GRID_MOUNT, this.onGridMount);
		emitter.on(EVENT_GRID.GRID_UPDATE, this.onGridUpdate);
	}

	componentWillUnmount() {
		const emitter = this.context[GRID_CONTEXT_EMITTER];
		emitter.on(EVENT_GRID.GRID_MOUNT, this.onGridMount);
		emitter.on(EVENT_GRID.GRID_UPDATE, this.onGridUpdate);
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
		this.setState({
			columns: {
				...columns
			}
		});
	}

	onGridUpdate = (columns) => {
		this.setState({
			columns: {
				...columns
			}
		});
	}
}

/**
 * @enum
 */
export const GRID_CELL_ALIGN = {
	LEFT: 'GRID_CELL_ALIGN:LEFT',
	CENTER: 'GRID_CELL_ALIGN:CENTER',
	RIGHT: 'GRID_CELL_ALIGN:RIGHT',
};

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
		TableCell: React.PropTypes.func,
		align: React.PropTypes.oneOf(Object.values(GRID_CELL_ALIGN))
	}

	static defaultProps = {
		TableCell,
		align: GRID_CELL_ALIGN.CENTER
	}

	static contextTypes = CONTEXT_TYPES;

	_content;
	_width;

	componentDidMount() {
		this._width = ReactDOM.findDOMNode(this._content).clientWidth;
		const emitter = this.context[GRID_CONTEXT_EMITTER];
		emitter.emit(
			EVENT_GRID.CELL_MOUNT,
			this.props[GRID_ROW_INDEX_KEY],
			this.props[GRID_COLUMN_INDEX_KEY],
			this._width,
			this.props[TABLE_IS_IN_HEAD_KEY]
		);
	}

	componentDidUpdate() {
		const newWidth = ReactDOM.findDOMNode(this._content).clientWidth;
		if (newWidth !== this._width) {
			this._width = newWidth;
			const emitter = this.context[GRID_CONTEXT_EMITTER];
			emitter.emit(
				EVENT_GRID.CELL_UPDATE,
				this.props[GRID_ROW_INDEX_KEY],
				this.props[GRID_COLUMN_INDEX_KEY],
				newWidth,
				this.props[TABLE_IS_IN_HEAD_KEY]
			);
		}
	}

	render() {
		let {TableCell, align, ...props} = this.props;
		const columnWidth = props[GRID_COLUMN_WIDTH_KEY];
		delete props[GRID_COLUMN_INDEX_KEY];
		delete props[GRID_COLUMN_WIDTH_KEY];
		delete props[GRID_ROW_INDEX_KEY];

		//todo support colspan/rowspans, for now it's difficult to sync width with header
		delete props['colSpan'];
		delete props['rowSpan'];

		let style;
		if (typeof columnWidth !== 'undefined') {
			style = {
				width: `${columnWidth}px`
			};
		}

		const contentClassName = classnames(
			props.theme.gridCell__content,
			{
				[props.theme.gridCell__content_left]: align === GRID_CELL_ALIGN.LEFT,
				[props.theme.gridCell__content_center]: align === GRID_CELL_ALIGN.CENTER,
				[props.theme.gridCell__content_right]: align === GRID_CELL_ALIGN.RIGHT
			}
		);

		const tableCellTheme = {
			...props.theme,
			cell: classnames(
				props.theme.cell,
				{
					[props.theme.cell_left]: align === GRID_CELL_ALIGN.LEFT,
					[props.theme.cell_center]: align === GRID_CELL_ALIGN.CENTER,
					[props.theme.cell_right]: align === GRID_CELL_ALIGN.RIGHT
				}
			)
		};

		return (
			<TableCell {...props} theme={tableCellTheme}>
				<span style={style}
				      className={props.theme.gridCell__placeholder}>
					<span className={contentClassName}
					      ref={el => this._content = el}>
						{props.children}
					</span>
				</span>
			</TableCell>
		);
	}
}