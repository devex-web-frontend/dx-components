import React from 'react';
import ReactDOM from 'react-dom';
import {Scrollable as ScrollableControl} from 'scrollable/src/Scrollable';

export default class Scrollable extends React.Component {
	static propTypes = {
		children: React.PropTypes.element
	}

	_scrollable;

	componentDidMount() {
		this._scrollable = new ScrollableControl(ReactDOM.findDOMNode(this));
	}

	componentWillUnmount() {
		this._scrollable.close();
	}

	render() {
		return React.Children.only(this.props.children);
	}
}