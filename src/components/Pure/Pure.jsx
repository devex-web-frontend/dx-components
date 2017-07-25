import React from 'react';
import {shouldComponentUpdate} from 'dx-util/lib/react/pure';

export default class Pure extends React.Component {
	static propTypes = {
		children: React.PropTypes.func.isRequired
	}

	shouldComponentUpdate(newProps, newState) {
		const propsCopy = Object.assign({}, this.props);
		const newPropsCopy = Object.assign({}, newProps);
		delete propsCopy['children'];
		delete newPropsCopy['children'];
		return shouldComponentUpdate(propsCopy, this.state, newPropsCopy, newState);
	}

	render() {
		return this.props.children();
	}
}