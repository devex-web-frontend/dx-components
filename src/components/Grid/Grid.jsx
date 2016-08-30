import React from 'react';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';
import {Table, TableBody, TableHead, TableCell, TableRow} from '../Table/Table';

export const GRID = Symbol('Grid');

@PURE
@themr(GRID)
export default class Grid extends React.Component {
	static propTypes = {
		...Table.propTypes,
		Table: React.PropTypes.func
	}

	static defaultProps = {
		Table
	}

	render() {
		const {Table, ...props} = this.props;

		return (
			<Table {...props}/>
		);
	}
}
export {
	Grid
};

@PURE
@themr(GRID)
export class GridBody extends React.Component {
	static propTypes = {
		...TableBody.propTypes,
		TableBody: React.PropTypes.func
	}

	static defaultProps = {
		TableBody
	}

	render() {
		const {TableBody, ...props} = this.props;

		return (
			<TableBody {...props}/>
		);
	}
}

@PURE
@themr(GRID)
export class GridHead extends React.Component {
	static propTypes = {
		...TableHead.propTypes,
		TableHead: React.PropTypes.func
	}

	static defaultProps = {
		TableHead
	}

	render() {
		const {TableHead, ...props} = this.props;

		return (
			<TableHead {...props}/>
		);
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