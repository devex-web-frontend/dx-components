import React from 'react';
import {themr} from 'react-css-themr';
import {PURE} from 'dx-util/src/react/pure';
import classnames from 'classnames';

export const TABLE = Symbol('Table');
const CONTEXT_IS_IN_HEAD_KEY = '__TABLE_CONTEXT_IS_IN_HEAD_KEY__';
const CONTEXT_TYPES = {
	[CONTEXT_IS_IN_HEAD_KEY]: React.PropTypes.bool
};

@PURE
@themr(TABLE)
export default class Table extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string
		})
	}

	render() {
		const {theme, children} = this.props;

		return (
			<table className={theme.container}>
				{children}
			</table>
		);
	}
}
export {
	Table
};

@PURE
@themr(TABLE)
export class TableHead extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		theme: React.PropTypes.shape({
			head: React.PropTypes.string
		})
	}

	static childContextTypes = CONTEXT_TYPES;

	getChildContext() {
		return {
			[CONTEXT_IS_IN_HEAD_KEY]: true
		};
	}

	render() {
		const {children, theme} = this.props;

		return (
			<thead className={theme.head}>
				{children}
			</thead>
		);
	}
}

@PURE
@themr(TABLE)
export class TableBody extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		theme: React.PropTypes.shape({
			body: React.PropTypes.string
		})
	}

	render() {
		const {children, theme} = this.props;

		return (
			<tbody className={theme.body}>
				{children}
			</tbody>
		);
	}
}

@PURE
@themr(TABLE)
export class TableRow extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		theme: React.PropTypes.shape({
			row: React.PropTypes.string
		})
	}

	render() {
		const {children, theme} = this.props;

		return (
			<tr className={theme.row}>
				{children}
			</tr>
		);
	}
}

@PURE
@themr(TABLE)
export class TableCell extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		theme: React.PropTypes.shape({
			cell: React.PropTypes.string,
			cell_isInHead: React.PropTypes.string
		}),
		colSpan: React.PropTypes.number,
		rowSpan: React.PropTypes.number
	}

	static contextTypes = CONTEXT_TYPES;

	render() {
		const {children, theme, colSpan, rowSpan} = this.props;
		const isInHead = this.context[CONTEXT_IS_IN_HEAD_KEY];

		const className = classnames(
			theme.cell,
			{
				[theme.cell_isInHead]: isInHead
			}
		);

		//noinspection JSUnusedLocalSymbols
		const Tag = isInHead ? 'th' : 'td';

		return (
			<Tag className={className} colSpan={colSpan} rowSpan={rowSpan}>
				{children}
			</Tag>
		);
	}
}