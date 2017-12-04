import React from 'react';
import {themr} from 'react-css-themr';
import {PURE} from 'dx-util/lib/react/pure';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';

export const TABLE = Symbol('Table');
export const TABLE_IS_IN_HEAD_KEY = '__TABLE_IS_IN_HEAD_KEY__';

@PURE
@themr(TABLE)
export default class Table extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		theme: PropTypes.shape({
			container: PropTypes.string
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
		children: PropTypes.node,
		theme: PropTypes.shape({
			head: PropTypes.string
		})
	}

	render() {
		const {children, theme} = this.props;

		return (
			<thead className={theme.head}>
				{React.Children.map(children, child => React.cloneElement(child, {
					[TABLE_IS_IN_HEAD_KEY]: true
				}))}
			</thead>
		);
	}
}

export const TABLE_BODY_THEME = {
	body: PropTypes.string
};

@PURE
@themr(TABLE)
export class TableBody extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		theme: PropTypes.shape(TABLE_BODY_THEME)
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
		children: PropTypes.node,
		theme: PropTypes.shape({
			row: PropTypes.string
		}),
		onClick: PropTypes.func,
		//not for direct usage
		//injected by TableHead
		[TABLE_IS_IN_HEAD_KEY]: PropTypes.bool
	}

	render() {
		const { children, theme, onClick, onMouseOver, onMouseOut } = this.props;
		const isInHead = this.props[TABLE_IS_IN_HEAD_KEY];

		return (
			<tr className={theme.row}
				onClick={onClick}
				onMouseOver={onMouseOver}
				onMouseOut={onMouseOut}>
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
		children: PropTypes.node,
		theme: PropTypes.shape({
			cell: PropTypes.string,
			cell_isInHead: PropTypes.string
		}),
		style: PropTypes.object,
		//not for direct usage
		//injected by TableHead
		[TABLE_IS_IN_HEAD_KEY]: PropTypes.bool,
		colSpan: PropTypes.number,
		rowSpan: PropTypes.number
	}

	render() {
		const {children, theme, style, colSpan, rowSpan} = this.props;
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
			<Tag className={className}
				 style={style}
				 colSpan={colSpan}
				 rowSpan={rowSpan}>
				{children}
			</Tag>
		);
	}
}