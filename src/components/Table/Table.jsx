import React from 'react';
import {themr} from 'react-css-themr';
import {PURE} from 'dx-util/src/react/pure';
import classnames from 'classnames';

export const TABLE = Symbol('Table');
const TABLE_IS_IN_HEAD_KEY = '__TABLE_IS_IN_HEAD_KEY__';

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

	render() {
		const {children, theme} = this.props;

		return (
			<thead className={theme.head}>
				{React.cloneElement(React.Children.only(children), {
					[TABLE_IS_IN_HEAD_KEY]: true
				})}
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
		}),
		[TABLE_IS_IN_HEAD_KEY]: React.PropTypes.bool
	}

	render() {
		const {children, theme} = this.props;
		const isInHead = this.props[TABLE_IS_IN_HEAD_KEY];

		return (
			<tr className={theme.row}>
				{!isInHead && children}
				{isInHead && React.Children.map(children, child => (
					React.cloneElement(child, {
						[TABLE_IS_IN_HEAD_KEY]: isInHead
					})
				))}
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
		rowSpan: React.PropTypes.number,
		style: React.PropTypes.object,
		[TABLE_IS_IN_HEAD_KEY]: React.PropTypes.bool
	}

	render() {
		const {children, theme, colSpan, rowSpan, style} = this.props;
		const isInHead = this.props[TABLE_IS_IN_HEAD_KEY];

		const className = classnames(
			theme.cell,
			{
				[theme.cell_isInHead]: isInHead
			}
		);

		//noinspection JSUnusedLocalSymbols
		const Tag = isInHead ? 'th' : 'td';

		return (
			<Tag className={className} colSpan={colSpan} rowSpan={rowSpan} style={style}>
				{children}
			</Tag>
		);
	}
}