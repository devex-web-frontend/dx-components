import React from 'react';

export default class Bar extends React.Component {

	static propTypes = {
		onBarDragStart: React.PropTypes.func,
		onBarDrag: React.PropTypes.func,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string
		})
	}

	render() {
		const {theme} = this.props;
		return (
			<div onMouseDown={this.onBarMouseDown} onClick={this.onBarClick} className={theme.container}/>
		);
	}

	onBarClick(event) {
		event.stopPropagation();
	}

	onBarMouseDown = (event) => {
		const {onBarDragStart} = this.props;

		onBarDragStart && onBarDragStart(event);

		document.addEventListener('mousemove', this._onDocumentMouseMove);
		document.addEventListener('mouseup', this._onDocumentMouseUp);
		document.addEventListener('selectstart', this._onDocumentSelectStart);
	}

	_onDocumentMouseUp = (event) => {
		const {onBarDrag} = this.props;

		document.removeEventListener('selectstart', this._onDocumentSelectStart);
		document.removeEventListener('mouseup', this._onDocumentMouseUp);
		document.removeEventListener('mousemove', this._onDocumentMouseMove);

		onBarDrag && onBarDrag(event);
	}

	_onDocumentMouseMove = (event) => {
		const {onBarDrag} = this.props;
		onBarDrag && onBarDrag(event);
	}

	_onDocumentSelectStart(event) {
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
}