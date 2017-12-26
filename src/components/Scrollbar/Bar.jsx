import React from 'react';
import { PURE } from 'dx-util/lib/react/pure';
import { EventListener } from '../EventListener/EventListener.tsx';
import * as PropTypes from 'prop-types';

@PURE
export default class Bar extends React.Component {

	static propTypes = {
		onBarDragStart: PropTypes.func,
		onBarDrag: PropTypes.func,
		theme: PropTypes.shape({
			container: PropTypes.string
		})
	}

	state = {
		isDragging: false
	}

	render() {
		const { isDragging } = this.state;

		let eventListenerProps = {
			target: 'window',
			capture: true,
		};

		if (isDragging) {
			eventListenerProps = {
				...eventListenerProps,
				onMouseUp: this.onDocumentMouseUp,
				onMouseMove: this.onDocumentMouseMove,
				onSelectStart: this.onDocumentSelectStart,
				onDragEnd: this.onDragEnd

			};
		}

		const barProps = {
			onMouseDown: this.onBarMouseDown,
			onClick: this.onBarClick,
			className: this.props.theme.container
		};

		return (
			<EventListener {...eventListenerProps}>
				<div {...barProps} />
			</EventListener>
		);
	}

	onBarClick(event) {
		event.stopPropagation();
	}

	onDocumentSelectStart(event) {
		event.preventDefault();
		event.stopPropagation();
		return false;
	}

	onDocumentMouseMove = (event) => {
		const { onBarDrag } = this.props;
		onBarDrag && onBarDrag(event);
	}

	onDragEnd = (event) => {
		this._stopDrag(event);
	}

	onDocumentMouseUp = (event) => {
		this._stopDrag(event);
	}

	_stopDrag = (event) => {
		const { onBarDrag } = this.props;

		this.setState({
			isDragging: false
		});

		onBarDrag && onBarDrag(event);
	}

	onBarMouseDown = (event) => {
		const { onBarDragStart } = this.props;

		onBarDragStart && onBarDragStart(event);

		this.setState({
			isDragging: true
		});
	}
}