import React from 'react';
import ReactDOM from 'react-dom';

export default class BoundsUpdateDetector extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		onUpdate: React.PropTypes.func
	}

	componentDidMount() {
		this._size = this.getSize();
	}

	getSize() {
		const element = ReactDOM.findDOMNode(this);
		return {
			width: element.offsetWidth,
			height: element.offsetHeight
		};
	}

	componentDidUpdate(prevProps, prevState) {
		const size = this.getSize();
		const {width, height} = this._size;
		if (height !== size.height || width !== size.width) {
			this._size = size;
			this.props.onUpdate && this.props.onUpdate(size);
		}
	}

	render() {
		return this.props.children;
	}
}