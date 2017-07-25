import React from 'react';
import {themr} from 'react-css-themr';
import {PURE} from 'dx-util/lib/react/pure';
import classnames from 'classnames';

export const TABLE = Symbol('Table');
export const TABLE_IS_IN_HEAD_KEY = '__TABLE_IS_IN_HEAD_KEY__';

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
				{React.Children.map(children, child => React.cloneElement(child, {
					[TABLE_IS_IN_HEAD_KEY]: true
				}))}
			</thead>
		);
	}
}

export const TABLE_BODY_THEME = {
	body: React.PropTypes.string
};

@PURE
@themr(TABLE)
export class TableBody extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		theme: React.PropTypes.shape(TABLE_BODY_THEME)
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
		//not for direct usage
		//injected by TableHead
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
		style: React.PropTypes.object,
		//not for direct usage
		//injected by TableHead
		[TABLE_IS_IN_HEAD_KEY]: React.PropTypes.bool,
		colSpan: React.PropTypes.number,
		rowSpan: React.PropTypes.number
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